import { useState } from "react";
import { useCRUD } from "../../../hooks/useCRUD";
import styles from "../components/bookingsection.module.css";

const infoCards = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Bordstørrelse",
    text: "Vi tager imod selskaber fra 1 til 12 personer. Kontakt os direkte for større selskaber.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Åbningstider",
    text: "Tirsdag-torsdag kl. 17-22. Fredag-lørdag kl. 17-23. Søndag kl. 12-20. Mandag lukket.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Kontakt",
    text: "Ring på +45 12 34 56 78 eller skriv til info@nordictable.dk ved spørgsmål.",
  },
];

export default function BookingSection() {
  const { create } = useCRUD("booking", "bookings");

  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    numberOfGuests: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    const startAt = new Date(`${form.date}T${form.time}`);

    const result = await create({
      name: form.name,
      email: form.email,
      startAt,
      numberOfGuests: Number(form.numberOfGuests),
    });

    if (result.success) {
      setMessage({ type: "success", text: "Din reservation er modtaget!" });
      setForm({ name: "", email: "", date: "", time: "", numberOfGuests: "" });
    } else {
      setMessage({ type: "error", text: "Noget gik galt. Prøv igen." });
    }

    setSubmitting(false);
  };

  return (
    <section className={styles.bookingSection}>
      <div className={styles.bookingContainer}>
        <div className={styles.bookingInfo}>
          <p className={styles.bookingLabel}>Gæstfrihed</p>

          <h2 className={styles.bookingHeading}>Velkomst fra højre ben</h2>

          <p className={styles.bookingDescription}>
            Vi ønsker at give dig og dine gæster den bedst mulige oplevelse. Her
            er hvad du skal vide inden dit besøg.
          </p>

          <div className={styles.infoCards}>
            {infoCards.map((card) => (
              <div key={card.title} className={styles.infoCard}>
                <span className={styles.infoCardIcon}>{card.icon}</span>

                <div>
                  <h3 className={styles.infoCardTitle}>{card.title}</h3>

                  <p className={styles.infoCardText}>{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.bookingFormWrapper}>
          <div className={styles.bookingFormCard}>
            <h3 className={styles.bookingFormTitle}>Din reservation</h3>

            <form onSubmit={handleSubmit} className={styles.bookingForm}>
              <div className={styles.formField}>
                <label className={styles.formLabel}>Fulde navn *</label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jens Jensen"
                  required
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formField}>
                <label className={styles.formLabel}>Email *</label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jens@example.dk"
                  required
                  className={styles.formInput}
                />
              </div>

              <div className={styles.dateTimeFields}>
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Dato *</label>

                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formField}>
                  <label className={styles.formLabel}>Tidspunkt *</label>

                  <select
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    required
                    className={styles.formInput}
                  >
                    <option value="">Vælg tidspunkt</option>
                    <option value="17:00">17:00</option>
                    <option value="17:30">17:30</option>
                    <option value="18:00">18:00</option>
                    <option value="18:30">18:30</option>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                    <option value="20:30">20:30</option>
                    <option value="21:00">21:00</option>
                    <option value="21:30">21:30</option>
                    <option value="22:00">22:00</option>
                  </select>
                </div>
              </div>

              <div className={styles.formField}>
                <label className={styles.formLabel}>Antal gæster *</label>

                <select
                  name="numberOfGuests"
                  value={form.numberOfGuests}
                  onChange={handleChange}
                  required
                  className={styles.formInput}
                >
                  <option value="">Vælg antal gæster</option>

                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              {message && (
                <p
                  className={
                    message.type === "success"
                      ? styles.successMessage
                      : styles.errorMessage
                  }
                >
                  {message.text}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className={styles.bookingButton}
              >
                {submitting ? "Booker..." : "Book bord"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
