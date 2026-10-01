import { Link } from "react-router-dom";
import { useCRUD } from "../../hooks/useCRUD";
import styles from "../dishes/dishes.module.css";

const CATEGORY_LABELS = {
  starter: "Forret",
  main: "Hovedret",
  dessert: "Dessert",
};

export default function SignatureDishes() {
  const { items: dishes, loading } = useCRUD("dish", "dishes");

  const signatureDishes = dishes.filter((dish) => dish.isSignature);

  const newestSignatureDishes = signatureDishes
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  if (loading || newestSignatureDishes.length === 0) {
    return null;
  }

  return (
    <section className={styles.signatureSection}>
      <div className={styles.signatureContainer}>
        <p className={styles.signatureLabel}>Udvalgte retter</p>

        <h2 className={styles.signatureHeading}>Vores signaturretter</h2>

        <p className={styles.signatureDescription}>
          Hver af vores signaturretter er omhyggeligt sammensat af sæsonens
          bedste nordiske råvarer.
        </p>

        <div className={styles.signatureGrid}>
          {newestSignatureDishes.map((dish) => (
            <div key={dish._id} className={styles.signatureCard}>
              <div className={styles.signatureImageWrapper}>
                <img
                  src={`${dish.image}`}
                  alt={dish.title}
                  className={styles.signatureImage}
                  loading="lazy"
                />

                <span className={styles.signatureBadge}>Signatur</span>
              </div>

              <p className={styles.signatureCategory}>
                {CATEGORY_LABELS[dish.category] || dish.category}
              </p>

              <h3 className={styles.signatureTitle}>{dish.title}</h3>

              <p className={styles.signatureDishDescription}>
                {dish.description}
              </p>

              <p className={styles.signaturePrice}>{dish.price} kr.</p>
            </div>
          ))}
        </div>

        <Link to="/menu" className={styles.signatureButton}>
          Se hele menuen
        </Link>
      </div>
    </section>
  );
}
