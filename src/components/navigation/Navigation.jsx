import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo/logo.png";
import logoWhite from "../../assets/logo/logoWhite.png";
import styles from "../navigation/navigation.module.css";

export default function Navigation() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
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

  const transparent = isHome && !scrolled;

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <nav
        className={
          transparent ? `${styles.navbar} ${styles.transparent}` : styles.navbar
        }
      >
        <Link to="/" className={styles["navbar-logo"]}>
          <img src={transparent ? logoWhite : logo} alt="Nordic Table" />
        </Link>

        <div className={styles["navbar-links"]}>
          <Link to="/">Forside</Link>

          <Link to="/menu">Menukort</Link>

          <Link to="/booking">Bestil bord</Link>

          {user ? (
            <>
              {user.role === "admin" && (
                <Link to="/backoffice">Backoffice</Link>
              )}

              <button
                onClick={handleLogout}
                className={styles["navbar-logout"]}
              >
                Log ud
              </button>
            </>
          ) : (
            <Link to="/login">Log ind</Link>
          )}
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

            {user ? (
              <>
                {user.role === "admin" && (
                  <Link to="/backoffice" onClick={() => setMenuOpen(false)}>
                    Backoffice
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className={styles["mobile-menu-logout"]}
                >
                  Log ud
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Log ind
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
