import { Link } from "react-router-dom";
import heroBackground from "../../../assets/headers/headerbg.png";
import styles from "../heroHeader/heroheader.module.css";

export default function HeroHeader() {
  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      <div className={styles.heroOverlay} />

      <div className={styles.heroContent}>
        <div className={styles.heroSubtitle}>
          <span className={styles.heroSubtitleLine} />
          <p className={styles.heroSubtitleText}> Velkomst </p>
        </div>

        <h1 className={styles.heroHeading}>
          Smag det <br /> nordiske
        </h1>
        <p className={styles.heroDescription}>
          Nordic Table er et sted, hvor sæsonens bedste råvarer forvandles til
          uforglemmelige oplevelser. Ro, kvalitet og hygge i hvert eneste
          måltid.
        </p>
        <div className={styles.heroButtons}>
          <Link to="/booking" className={styles.heroPrimaryButton}>
            Book bord
          </Link>
          <Link to="/menu" className={styles.heroSecondaryButton}>
            Se menuen
          </Link>
        </div>
      </div>

      <button
        onClick={scrollDown}
        className={styles.scrollButton}
        aria-label="Scroll ned"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={styles.scrollIcon}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </section>
  );
}
