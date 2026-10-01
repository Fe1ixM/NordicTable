import { Link } from "react-router-dom";
import styles from "../404/404.module.css";

export default function PageNotFound() {
  return (
    <section className={styles.errorSection}>
      <h1 className={styles.errorSectionHeading}>404</h1>
      <h2 className={styles.errorSectionSubheading}>Siden blev ikke fundet</h2>
      <Link to="/" className={styles.errorSectionButton}>
        Tilbage til forsiden
      </Link>
    </section>
  );
}
