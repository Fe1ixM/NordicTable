import { useState } from "react";
import BackofficeNavigation from "./components/BackofficeNavigation";
import DishManager from "./components/DishManager";
import BookingManager from "./components/BookingManager";
import styles from "../backoffice/backoffice.module.css";

export default function Backoffice() {
  const [activeTab, setActiveTab] = useState("dishes");

  return (
    <>
      <BackofficeNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <section className={styles.backofficeContent}>
        <div className={styles.backofficeContainer}>
          <header className={styles.backofficeHeader}>
            <p>Nordic Table · Administration</p>
            <h1>
              {activeTab === "dishes"
                ? "Administrer retter"
                : "Administrer reservationer"}
            </h1>
            <span>
              {activeTab === "dishes"
                ? "Opret, rediger eller fjern retter fra menukortet."
                : "Se og opdater gæsternes reservationer."}
            </span>
          </header>
          {activeTab === "dishes" ? <DishManager /> : <BookingManager />}
        </div>
      </section>
    </>
  );
}
