import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo/logo.png";
import whiteLogo from "../../assets/logo/logoWhite.png";
import styles from "../navigation/navigation.module.css";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }

    const onScroll = () => setScrolled(window.scrollY > 50);

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const transparentNavbar = isHome && !scrolled;

  return (
    <>
      <nav
        className={
          transparentNavbar
            ? `${styles.navbar} ${styles.transparent}`
            : styles.navbar
        }
      >
        <Link to="/" className={styles["navbar-logo"]}>
          <img src={transparentNavbar ? whiteLogo : logo} alt="Logo" />
        </Link>

        <div className={styles["navbar-links"]}>
          <Link to="/">Forside</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/booking">Book bord</Link>
          <Link to="/login">Log ind</Link>
        </div>

        <button
          className={styles["navbar-menu-button"]}
          onClick={() => setMenuOpen(true)}
          aria-label="Åbn menu"
        >
          ☰
        </button>
      </nav>

      {menuOpen && (
        <div className={styles["mobile-menu"]}>
          <button
            className={styles["mobile-menu-close"]}
            onClick={() => setMenuOpen(false)}
            aria-label="Luk menu"
          >
            ✕
          </button>

          <div className={styles["mobile-menu-links"]}>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Forside
            </Link>

            <Link to="/menu" onClick={() => setMenuOpen(false)}>
              Menu
            </Link>

            <Link to="/booking" onClick={() => setMenuOpen(false)}>
              Book bord
            </Link>

            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Log ind
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
