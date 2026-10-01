import { useState, useEffect } from "react";
import restaurantImg from "../../assets/images/restaurant.png";
import styles from "../about/about.module.css";

export default function AboutSection() {
  const [dishCount, setDishCount] = useState(0);

  async function fetchDishCount() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/dishes`);

      if (!response.ok) {
        return;
      }

      const result = await response.json();

      const dishes = Array.isArray(result) ? result : result.data || [];

      setDishCount(dishes.length);
    } catch {
      setDishCount(0);
    }
  }

  useEffect(() => {
    fetchDishCount();
  }, []);

  const stats = [
    {
      value: String(dishCount),
      label: "Retter på menuen",
    },
    {
      value: "6",
      label: "Års erfaring",
    },
    {
      value: "100",
      label: "% Nordiske råvarer",
    },
  ];

  return (
    <section className={styles.aboutSection}>
      <div className={styles.aboutContainer}>
        <div className={styles.aboutContent}>
          <div className={styles.aboutImage}>
            <img
              src={restaurantImg}
              alt="Nordic Table restaurant"
              loading="lazy"
            />
          </div>

          <div className={styles.aboutText}>
            <p className={styles.aboutLabel}>Om os</p>

            <h2 className={styles.aboutHeading}>
              En restaurant båret af
              <br />
              nærhed og nærvær
            </h2>

            <span className={styles.aboutAccent} />

            <p className={styles.aboutParagraph}>
              Nordic Table er grundlagt med en klar overbevisning: god mad
              behøver ikke at være kompliceret. Vi laver mad af det, naturen
              giver os – det nordiske køkkens uforlignelige råvarer.
            </p>

            <p className={styles.aboutParagraph}>
              Fra de friske fiskefarvande til skovens bær og urter – vores menu
              forandrer sig med årstidens rytme. Det giver gæsterne noget nyt at
              opdage, og det giver os glæden ved at lave mad med det bedste, vi
              kan få fat i.
            </p>

            <div className={styles.aboutStats}>
              {stats.map((s) => (
                <div key={s.label} className={styles.aboutStat}>
                  <p className={styles.aboutStatValue}>{s.value}</p>

                  <p className={styles.aboutStatLabel}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
