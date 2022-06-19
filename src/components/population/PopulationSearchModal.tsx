import type { NextPage } from "next";
import { useEffect, useState } from "react";
import style from "./PopulationSearchModal.module.css";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
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

// TODO api/population/composition/perYear.tsにも同じ型定義があるためリファクタ
type CompositionResponse = {
  message: null;
  result: CompositionResult;
};

type CompositionResult = {
  boundaryYear: number;
  data: CompositionData[];
};

type CompositionData = {
  label: string;
  data: Composition[];
};

type Composition = {
  year: number;
  value: number;
};

const PopulationSearchModal: NextPage<Props> = ({ isOpen, closeModal }) => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [checkedPrefCodes, setPrefCodes] = useState<Prefecture["prefCode"][]>(
    []
  );
  const [composition, setComposition] = useState<CompositionResult | null>(
    null
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
   * チェックされた都道府県コードを配列に保存する
   * @param e チェックされた都道府県コード
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const prefCode = Number(e.target.value);
    if (checkedPrefCodes.includes(prefCode)) {
      setPrefCodes(
        checkedPrefCodes.filter(
          (checkedPrefCode) => checkedPrefCode !== prefCode
        )
      );
    } else {
      setPrefCodes([...checkedPrefCodes, prefCode]);
    }
  };

  /** 検索処理を実行 */
  const onSearch = async () => {
    const [prefCode, ...addAreaPrefCodes] = [...checkedPrefCodes];
    const formattedAddArea = `${addAreaPrefCodes.join("_,")}_`;

    const response = await fetch(
      `/api/population/composition/perYear?cityCode=-&prefCode=${prefCode}&addArea=${formattedAddArea}`
    );
    const composition: CompositionResponse = await response.json();
    setComposition(composition.result);
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
                        value={prefecture.prefCode}
                        onChange={handleChange}
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
