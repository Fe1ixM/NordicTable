import { useState } from "react";
import { useCRUD } from "../../../hooks/useCRUD";
import styles from "./management.module.css";

function getLocalDateTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return { date: "", time: "" };
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  const valueForInput = local.toISOString().slice(0, 16);
  return {
    date: valueForInput.slice(0, 10),
    time: valueForInput.slice(11, 16),
  };
}

function formatDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Ukendt tidspunkt"
    : new Intl.DateTimeFormat("da-DK", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
}

export default function BookingManager() {
  const {
    items: bookings,
    loading,
    fetchError,
    update,
    remove,
    refresh,
  } = useCRUD("booking", "bookings");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    numberOfGuests: "",
  });
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const startEditing = (booking) => {
    const { date, time } = getLocalDateTime(booking.startAt);
    setEditingId(booking._id);
    setForm({
      name: booking.name || "",
      email: booking.email || "",
      date,
      time,
      numberOfGuests: booking.numberOfGuests ?? "",
    });
    setNotice("");
    setError("");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setForm({ name: "", email: "", date: "", time: "", numberOfGuests: "" });
  };

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setNotice("");
    setError("");
    const result = await update({
      id: editingId,
      name: form.name,
      email: form.email,
      startAt: new Date(`${form.date}T${form.time}`).toISOString(),
      numberOfGuests: Number(form.numberOfGuests),
    });
    if (result?.success) {
      setNotice("Reservationen er opdateret.");
      cancelEditing();
    } else {
      setError(result?.error || "Reservationen kunne ikke opdateres.");
    }
    setSaving(false);
  };

  const handleDelete = async (booking) => {
    setNotice("");
    setError("");
    const result = await remove(booking._id);
    if (result?.success) {
      setNotice("Reservationen er slettet.");
      if (editingId === booking._id) cancelEditing();
    } else if (result?.error) {
      setError(result.error);
    }
  };

  const sortedBookings = [...bookings].sort(
    (a, b) => new Date(a.startAt) - new Date(b.startAt),
  );

  return (
    <div
      className={`${styles.managerLayout} ${!editingId ? styles.singleColumn : ""}`}
    >
      {editingId && (
        <section
          className={styles.panel}
          aria-labelledby="booking-form-heading"
        >
          <div className={styles.panelHeading}>
            <div>
              <p className={styles.eyebrow}>Reservation</p>
              <h2 id="booking-form-heading">Rediger reservation</h2>
            </div>
            <button
              type="button"
              className={styles.textButton}
              onClick={cancelEditing}
            >
              Annuller
            </button>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.twoColumns}>
              <label className={styles.field}>
                <span>Navn</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className={styles.field}>
                <span>E-mail</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className={styles.twoColumns}>
              <label className={styles.field}>
                <span>Dato</span>
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className={styles.field}>
                <span>Tid</span>
                <input
                  name="time"
                  type="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <label className={styles.field}>
              <span>Antal gæster</span>
              <input
                name="numberOfGuests"
                type="number"
                min="1"
                max="12"
                value={form.numberOfGuests}
                onChange={handleChange}
                required
              />
            </label>
            <button
              className={styles.primaryButton}
              type="submit"
              disabled={saving}
            >
              {saving ? "Gemmer…" : "Gem ændringer"}
            </button>
          </form>
        </section>
      )}

      <section className={styles.panel} aria-labelledby="booking-list-heading">
        <div className={styles.panelHeading}>
          <div>
            <p className={styles.eyebrow}>Gæster</p>
            <h2 id="booking-list-heading">Reservationer ({bookings.length})</h2>
          </div>
          <button type="button" className={styles.textButton} onClick={refresh}>
            Opdater liste
          </button>
        </div>
        {notice && (
          <p className={styles.successMessage} role="status">
            {notice}
          </p>
        )}
        {error && (
          <p className={styles.errorMessage} role="alert">
            {error}
          </p>
        )}
        {fetchError && (
          <p className={styles.errorMessage} role="alert">
            {fetchError}
          </p>
        )}
        {loading ? (
          <p className={styles.emptyState}>Indlæser reservationer…</p>
        ) : fetchError ? null : sortedBookings.length === 0 ? (
          <p className={styles.emptyState}>Der er ingen reservationer endnu.</p>
        ) : (
          <div className={styles.itemList}>
            {sortedBookings.map((booking) => (
              <article className={styles.bookingCard} key={booking._id}>
                <div className={styles.itemDetails}>
                  <div className={styles.itemTitleRow}>
                    <h3>{booking.name || "Gæst"}</h3>
                    <strong>{formatDate(booking.startAt)}</strong>
                  </div>
                  <p className={styles.itemMeta}>
                    {booking.email} · {booking.numberOfGuests} gæster
                  </p>
                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={styles.textButton}
                      onClick={() => startEditing(booking)}
                    >
                      Rediger
                    </button>
                    <button
                      type="button"
                      className={styles.dangerButton}
                      onClick={() => handleDelete(booking)}
                    >
                      Slet
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
