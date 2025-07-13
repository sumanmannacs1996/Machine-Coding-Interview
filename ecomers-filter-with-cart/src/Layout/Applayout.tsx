import Header from "../Components/Header";
import Footer from "../Components/Footer";
import styles from "./Applayout.module.css";
import { Outlet } from "react-router-dom";

function Applayout() {
  return (
    <div className={styles.appWrapper}>
      <header className={styles.appHeader}>
        <Header />
      </header>
      <main className={styles.appMain}>
        <Outlet />
      </main>
      <footer className={styles.appFooter}>
        <Footer />
      </footer>
    </div>
  );
}

export default Applayout;
