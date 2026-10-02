import { useState } from "react";
import { useCRUD } from "../../../hooks/useCRUD";
import styles from "./management.module.css";

const EMPTY_DISH = {
  title: "",
  description: "",
  price: "",
  image: "",
  category: "starter",
  isSignature: false,
};

const CATEGORY_LABELS = {
  starter: "Forret",
  main: "Hovedret",
  dessert: "Dessert",
};

export default function DishManager() {
  const {
    items: dishes,
    loading,
    fetchError,
    create,
    update,
    remove,
    refresh,
  } = useCRUD("dish", "dishes");
  const [form, setForm] = useState(EMPTY_DISH);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const startEditing = (dish) => {
    setEditingId(dish._id);
    setForm({
      title: dish.title || "",
      description: dish.description || "",
      price: dish.price ?? "",
      image: dish.image || "",
      category: dish.category || "starter",
      isSignature: Boolean(dish.isSignature),
    });
    setNotice("");
    setError("");
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(EMPTY_DISH);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setNotice("");
    setError("");

    const data = { ...form, price: Number(form.price) };
    const result = editingId
      ? await update({ ...data, id: editingId })
      : await create(data);

    if (result?.success) {
      setNotice(editingId ? "Retten er opdateret." : "Retten er oprettet.");
      resetForm();
    } else {
      setError(result?.error || "Handlingen kunne ikke gennemføres.");
    }
    setSaving(false);
  };

  const handleDelete = async (dish) => {
    setError("");
    const result = await remove(dish._id);
    if (result?.success) {
      setNotice(`“${dish.title}” er slettet.`);
      if (editingId === dish._id) resetForm();
    } else if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <div className={styles.managerLayout}>
      <section className={styles.panel} aria-labelledby="dish-form-heading">
        <div className={styles.panelHeading}>
          <div>
            <p className={styles.eyebrow}>
              {editingId ? "Redigering" : "Menukort"}
            </p>
            <h2 id="dish-form-heading">
              {editingId ? "Rediger ret" : "Tilføj ret"}
            </h2>
          </div>
          {editingId && (
            <button
              type="button"
              className={styles.textButton}
              onClick={resetForm}
            >
              Annuller
            </button>
          )}
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>Navn</span>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </label>
          <label className={styles.field}>
            <span>Beskrivelse</span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              required
            />
          </label>
          <div className={styles.twoColumns}>
            <label className={styles.field}>
              <span>Pris (kr.)</span>
              <input
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                required
              />
            </label>
            <label className={styles.field}>
              <span>Kategori</span>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="starter">Forret</option>
                <option value="main">Hovedret</option>
                <option value="dessert">Dessert</option>
              </select>
            </label>
          </div>
          <label className={styles.field}>
            <span>Billedadresse</span>
            <input
              name="image"
              type="url"
              value={form.image}
              onChange={handleChange}
              placeholder="https://…"
            />
          </label>
          <label className={styles.checkboxField}>
            <input
              name="isSignature"
              type="checkbox"
              checked={form.isSignature}
              onChange={handleChange}
            />
            <span>Vis som signaturret</span>
          </label>
          <button
            className={styles.primaryButton}
            type="submit"
            disabled={saving}
          >
            {saving ? "Gemmer…" : editingId ? "Gem ændringer" : "Opret ret"}
          </button>
        </form>
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
      </section>

      <section className={styles.panel} aria-labelledby="dish-list-heading">
        <div className={styles.panelHeading}>
          <div>
            <p className={styles.eyebrow}>Indhold</p>
            <h2 id="dish-list-heading">Retter ({dishes.length})</h2>
          </div>
          <button type="button" className={styles.textButton} onClick={refresh}>
            Opdater liste
          </button>
        </div>
        {fetchError && (
          <p className={styles.errorMessage} role="alert">
            {fetchError}
          </p>
        )}
        {loading ? (
          <p className={styles.emptyState}>Indlæser retter…</p>
        ) : fetchError ? null : dishes.length === 0 ? (
          <p className={styles.emptyState}>
            Ingen retter fundet. Opret den første ret med formularen.
          </p>
        ) : (
          <div className={styles.itemList}>
            {dishes.map((dish) => (
              <article className={styles.itemCard} key={dish._id}>
                {dish.image && (
                  <img className={styles.thumbnail} src={dish.image} alt="" />
                )}
                <div className={styles.itemDetails}>
                  <div className={styles.itemTitleRow}>
                    <h3>{dish.title}</h3>
                    <strong>{dish.price} kr.</strong>
                  </div>
                  <p className={styles.itemMeta}>
                    {CATEGORY_LABELS[dish.category] || dish.category}
                    {dish.isSignature ? " · Signaturret" : ""}
                  </p>
                  <p className={styles.itemDescription}>{dish.description}</p>
                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={styles.textButton}
                      onClick={() => startEditing(dish)}
                    >
                      Rediger
                    </button>
                    <button
                      type="button"
                      className={styles.dangerButton}
                      onClick={() => handleDelete(dish)}
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
