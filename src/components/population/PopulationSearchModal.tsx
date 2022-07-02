import type { NextPage } from "next";
import { useEffect, useState } from "react";
import style from "./PopulationSearchModal.module.css";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  handleSearch: (checkedPrefCodes: Prefecture[]) => void;
};

// TODO api/prefectures/index.tsにも同じ型定義があるためリファクタ
type Response = {
  message: null;
  result: Prefecture[];
};

type Prefecture = {
  prefCode: number;
  prefName: string;
};

const PopulationSearchModal: NextPage<Props> = ({
  isOpen,
  closeModal,
  handleSearch,
}) => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [checkedPrefectureList, setCheckedPrefecture] = useState<Prefecture[]>(
    []
  );
  useEffect(() => {
    const fetchPrefectures = async () => {
      // TODO error handling
      const response = await fetch("/api/prefectures");
      const prefectures: Response = await response.json();
      setPrefectures(prefectures.result);
    };
    fetchPrefectures();
  }, []);

  /**
   * チェックされた都道府県データを配列に保存する
   * @param prefecture チェックされた都道府県データ
   */
  const handleChange = (prefecture: Prefecture) => {
    if (checkedPrefectureList.includes(prefecture)) {
      setCheckedPrefecture(
        checkedPrefectureList.filter(
          (checkedPrefecture) =>
            checkedPrefecture.prefCode !== prefecture.prefCode
        )
      );
    } else {
      setCheckedPrefecture([...checkedPrefectureList, prefecture]);
    }
  };

  /** 検索処理を実行 */
  const onSearch = async () => {
    handleSearch(checkedPrefectureList);
  };

  return (
    <>
      {isOpen && (
        <div className={style.overlay}>
          <div className={style.modalContainer}>
            <div className={style.modalHeader}>
              <h2 className={style.modalTitle}>検索条件</h2>
              <button className={style.closeButton} onClick={closeModal}>
                X
              </button>
            </div>
            <div className={style.modalContent}>
              <ul className={style.searchItemList}>
                {prefectures.map((prefecture) => (
                  <li className={style.searchItem} key={prefecture.prefCode}>
                    <label htmlFor={String(prefecture.prefCode)}>
                      <input
                        id={String(prefecture.prefCode)}
                        type="checkbox"
                        onChange={() => handleChange(prefecture)}
                      />
                      {prefecture.prefName}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className={style.modalFooter}>
              <button className={style.searchButton} onClick={onSearch}>
                検索
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopulationSearchModal;
