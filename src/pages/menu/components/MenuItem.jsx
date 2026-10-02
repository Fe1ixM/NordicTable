import styles from "../components/menuitem.module.css";

export default function MenuItem({ title, description, price }) {
  return (
    <div className={styles.menuItem}>
      <div className={styles.menuItemHeader}>
        <h3 className={styles.menuItemTitle}>{title}</h3>
        <span className={styles.menuItemPrice}>{price} kr.</span>
      </div>
      <p className={styles.menuItemDescription}>{description}</p>
    </div>
  );
}
