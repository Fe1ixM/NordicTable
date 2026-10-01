import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "../login/login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await login(email, password);
    if (result.success) {
      navigate("/backoffice");
    } else {
      setError("Forkert e-mail eller adgangskode");
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <Link to="/" className={styles.backLink}>
          <span className={styles.backArrow}>←</span> Tilbage til forsiden
        </Link>
        <h1 className={styles.loginHeading}> Log ind </h1>
        <p className={styles.loginDescription}>
          Adgang forbeholdt personale og administratorer
        </p>
        {error && <p className={styles.errorMessage}> {error} </p>}
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}> E-mail </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Jens Jensen"
              required
              className={styles.formInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}> Adgangskode </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
              className={styles.formInput}
            />
          </div>
          <button type="submit" className={styles.loginButton}>
            Log ind
          </button>
        </form>
      </div>
    </div>
  );
}
