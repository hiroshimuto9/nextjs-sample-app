import type { NextPage } from "next";
import style from "./PopulationSearchModal.module.css";

type Props = {
  isOpen: boolean;
};

const PopulationSearchModal: NextPage<Props> = ({ isOpen }) => {
  return (
    <>
      {isOpen && (
        <div className={style.overlay}>
          <div className={style.modalContainer}>
            <h2 className={style.modalTitle}>検索条件</h2>
            <div className={style.modalContent}>
              <ul className={style.searchItemList}>
                <li className={style.searchItem}>
                  <label htmlFor="box1">
                    <input id="box1" type="checkbox" />
                    東京都
                  </label>
                </li>
                <li className={style.searchItem}>
                  <label htmlFor="box2">
                    <input id="box2" type="checkbox" />
                    神奈川県
                  </label>
                </li>
                <li className={style.searchItem}>
                  <label htmlFor="box3">
                    <input id="box3" type="checkbox" />
                    千葉県
                  </label>
                </li>
                <li className={style.searchItem}>
                  <label htmlFor="box4">
                    <input id="box4" type="checkbox" />
                    栃木県
                  </label>
                </li>
                <li className={style.searchItem}>
                  <label htmlFor="box5">
                    <input id="box5" type="checkbox" />
                    茨木県
                  </label>
                </li>
                <li className={style.searchItem}>
                  <label htmlFor="box6">
                    <input id="box6" type="checkbox" />
                    埼玉県
                  </label>
                </li>
                <li className={style.searchItem}>
                  <label htmlFor="box1">
                    <input id="box1" type="checkbox" />
                    東京都
                  </label>
                </li>
                <li className={style.searchItem}>
                  <label htmlFor="box2">
                    <input id="box2" type="checkbox" />
                    神奈川県
                  </label>
                </li>
                <li className={style.searchItem}>
                  <label htmlFor="box3">
                    <input id="box3" type="checkbox" />
                    千葉県
                  </label>
                </li>
                <li className={style.searchItem}>
                  <label htmlFor="box4">
                    <input id="box4" type="checkbox" />
                    栃木県
                  </label>
                </li>
                <li className={style.searchItem}>
                  <label htmlFor="box5">
                    <input id="box5" type="checkbox" />
                    茨木県
                  </label>
                </li>
                <li className={style.searchItem}>
                  <label htmlFor="box6">
                    <input id="box6" type="checkbox" />
                    埼玉県
                  </label>
                </li>
              </ul>
            </div>
            <div className={style.modalFooter}>
              <button className={style.searchButton}>検索</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopulationSearchModal;
