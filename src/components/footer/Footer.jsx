import { Link } from "react-router-dom";
import logoWhite from "../assets/logoWhite.webp";
import styles from "../footer/footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer-container"]}>
        <div className={styles["footer-top"]}>
          <div className={styles["footer-brand"]}>
            <img
              src={logoWhite}
              alt="Nordic Table"
              className={styles["footer-logo"]}
            />

            <p className={styles["footer-description"]}>
              Nordisk køkken med fokus på sæsonens råvarer, enkelhed og hygge.
              Velkommen til bordet.
            </p>

            <div className={styles["footer-socials"]}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={styles["footer-social-link"]}
              >
                <svg
                  className={styles["footer-social-icon"]}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={styles["footer-social-link"]}
              >
                <svg
                  className={styles["footer-social-icon"]}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.163.46.349 1.26.403 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.43a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.46.163-1.26.349-2.43.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.163-.46-.349-1.26-.403-2.43C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43A4.902 4.902 0 013.79 2.948a4.902 4.902 0 011.772-1.153c.46-.163 1.26-.301 2.43-.403C9.416 2.175 9.796 2.163 12 2.163zm0 1.838c-3.153 0-3.506.012-4.748.069-.985.045-1.52.208-1.876.346a3.062 3.062 0 00-1.14.742 3.062 3.062 0 00-.742 1.14c-.138.356-.301.891-.346 1.876-.057 1.242-.069 1.595-.069 4.748s.012 3.506.069 4.748c.045.985.208 1.52.346 1.876.164.422.404.81.742 1.14.33.338.718.578 1.14.742.356.138.891.301 1.876.346 1.242.057 1.595.069 4.748.069s3.506-.012 4.748-.069c.985-.045 1.52-.208 1.876-.346a3.062 3.062 0 001.14-.742 3.062 3.062 0 00.742-1.14c.138-.356.301-.891.346-1.876.057-1.242-.069-1.595-.069-4.748s.012-3.506.069-4.748c.045-.985.208-1.52.346-1.876a3.062 3.062 0 00-.742-1.14 3.062 3.062 0 00-1.14-.742c-.356-.138-.891-.301-1.876-.346C15.506 4.013 15.153 4.001 12 4.001zm0 3.15a4.85 4.85 0 110 9.7 4.85 4.85 0 010-9.7zm0 1.838a3.012 3.012 0 100 6.024 3.012 3.012 0 000-6.024zm5.338-2.154a1.131 1.131 0 110 2.262 1.131 1.131 0 010-2.262z" />
                </svg>
              </a>
            </div>
          </div>

          <div className={styles["footer-section"]}>
            <h4 className={styles["footer-heading"]}>Åbningstider</h4>

            <ul
              className={`${styles["footer-list"]} ${styles["footer-hours"]}`}
            >
              <li>
                <span>Mandag</span>
                <span>Lukket</span>
              </li>

              <li>
                <span>Tirsdag-torsdag</span>
                <span>17-22</span>
              </li>

              <li>
                <span>Fredag-lørdag</span>
                <span>17-23</span>
              </li>

              <li>
                <span>Søndag</span>
                <span>12-20</span>
              </li>
            </ul>
          </div>

          <div className={styles["footer-section"]}>
            <h4 className={styles["footer-heading"]}>Hurtige links</h4>

            <ul
              className={`${styles["footer-list"]} ${styles["footer-links"]}`}
            >
              <li>
                <Link to="/booking">Book bord</Link>
              </li>

              <li>
                <Link to="/backoffice">Personale</Link>
              </li>
            </ul>
          </div>

          <div className={styles["footer-section"]}>
            <h4 className={styles["footer-heading"]}>Kontakt os</h4>

            <ul
              className={`${styles["footer-list"]} ${styles["footer-contact"]}`}
            >
              <li>
                <svg
                  className={styles["footer-contact-icon"]}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                </svg>

                <span>Nørdgade 12, 9000 Aalborg</span>
              </li>

              <li>
                <svg
                  className={styles["footer-contact-icon"]}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z" />
                </svg>

                <span>+45 12 34 56 78</span>
              </li>

              <li>
                <svg
                  className={styles["footer-contact-icon"]}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>

                <span>info@nordictable.dk</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles["footer-bottom"]}>
          <span>&copy; 2026 Nordic Table. Alle rettigheder forbeholdes</span>

          <span>Designet og udviklet med omhu</span>
        </div>
      </div>
    </footer>
  );
}
