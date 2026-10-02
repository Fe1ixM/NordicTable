import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import logo from "../../../assets/logo/logoWhite.png";
import styles from "../components/backofficenavigation.module.css";

export default function BackofficeNavigation({ activeTab, setActiveTab }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const tabs = [
    { key: "dishes", label: "Retter" },
    { key: "bookings", label: "Reservationer" },
  ];

  return (
    <nav className={styles.backofficeNavbar}>
      <div className={styles.backofficeNavbarBrand}>
        <Link to="/" className={styles.backofficeNavbarLogo}>
          <img src={logo} alt="Nordic Table" />
        </Link>

        <Link to="/" className={styles.backofficeNavbarBackLink}>
          Back to main site
        </Link>
      </div>

      <div className={styles.backofficeNavbarLinks}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`${styles.backofficeNavbarTab} ${
              activeTab === tab.key ? styles.active : ""
            }`}
          >
            {tab.label}
          </button>
        ))}

        <button
          onClick={handleLogout}
          className={styles.backofficeNavbarLogout}
        >
          Log ud
        </button>
      </div>
    </nav>
  );
}
