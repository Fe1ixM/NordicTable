import { useCRUD } from "../../hooks/useCRUD";
import HeroHeader from "../../components/headers/heroHeader/HeroHeader";
import MenuCategory from "./components/MenuCategory";
import MenuItem from "./components/MenuItem";
import Footer from "../../components/footer/Footer";
import styles from "../menu/menupage.module.css";

const categories = [
  { key: "starter", label: "Forretter" },
  { key: "main", label: "Hovedretter" },
  { key: "dessert", label: "Desserter" },
];

export default function Menu() {
  const { items: dishes, loading } = useCRUD("dish", "dishes");

  return (
    <div className={styles.menuPage}>
      <HeroHeader
        subtitle="Vores Menu"
        title="Smagsoplevelser fra det nordiske køkken"
        description="Alt på vores menu er tilberedt af sæsonens friskeste råvarer. Vi arbejder tæt med lokale producenter for at sikre den bedste kvalitet."
      />

      <section className={styles.menuSection}>
        {loading ? (
          <p className={styles.loadingMessage}>Indlæser menu…</p>
        ) : (
          categories.map(({ key, label }) => {
            const dishesInCategory = dishes.filter(
              (dish) => dish.category === key,
            );

            if (dishesInCategory.length === 0) {
              return null;
            }

            return (
              <div key={key}>
                <MenuCategory
                  title={label}
                  image={dishesInCategory[0]?.image}
                />

                {dishesInCategory.map((dish) => (
                  <MenuItem
                    key={dish._id}
                    title={dish.title}
                    description={dish.description}
                    price={dish.price}
                  />
                ))}
              </div>
            );
          })
        )}
      </section>

      <Footer />
    </div>
  );
}
