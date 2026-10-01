import { Link } from "react-router-dom";
import restaurantBg from "../../assets/images/restaurant2.png";
import styles from "../reservation/reservation.module.css";

export default function ReservationSection() {
  return (
    <section
      className={styles.reservationSection}
      style={{ backgroundImage: `url(${restaurantBg})` }}
    >
      <div className={styles.reservationOverlay} />

      <div className={styles.reservationContent}>
        <p className={styles.reservationLabel}>Reservationer</p>

        <h2 className={styles.reservationHeading}>
          Book dit bord hos
          <br />
          Nordic Table
        </h2>

        <p className={styles.reservationDescription}>
          Vi åbner vores døre for dig og dine, og giver jer en aften I aldrig
          glemmer. Book dit bord i dag – det er nemt og hurtigt.
        </p>

        <Link to="/booking" className={styles.reservationButton}>
          Book bord nu
        </Link>
      </div>
    </section>
  );
}
