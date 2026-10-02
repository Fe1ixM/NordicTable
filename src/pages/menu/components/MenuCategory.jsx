import styles from "../components/menucategory.module.css";

export default function MenuCategory({ title, image }) {
  return (
    <div className={`${styles.sectionHeader} ${styles.firstSectionHeader}`}>
      <div className={styles.sectionHeaderContent}>
        {image && (
          <img src={image} alt={title} className={styles.sectionHeaderImage} />
        )}

        <h2 className={styles.sectionHeaderTitle}>{title}</h2>
      </div>

      <hr className={styles.sectionHeaderDivider} />
    </div>
  );
}
