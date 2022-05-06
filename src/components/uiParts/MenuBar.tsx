import styles from "@/components/uiParts/MenuBar.module.css";

export const MenuBar = () => {
  return (
    <div className={styles.menu}>
      <header className={styles.headerContent}>
        <p>ロゴ</p>
      </header>
      <nav className={styles.navigations}>
        <ul>
          <li>
            <a href="#">メニューA</a>
          </li>
          <li>
            <a href="#">メニューB</a>
          </li>
          <li>
            <a href="#">メニューC</a>
          </li>
          <li>
            <a href="#">メニューD</a>
          </li>
          <li>
            <a href="#">メニューE</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
