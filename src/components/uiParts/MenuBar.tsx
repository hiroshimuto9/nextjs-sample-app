import Link from "next/link";
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
            <Link href="/population">
              <a>人口マップ</a>
            </Link>
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
