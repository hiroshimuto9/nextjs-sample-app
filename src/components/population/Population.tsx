import type { NextPage } from "next";
import { useState } from "react";
import style from "./Population.module.css";
import { Layout } from "@/components/layouts/Layout";
import PopulationSearchModal from "@/components/population/PopulationSearchModal";

// TODO api/prefectures/index.tsにも同じ型定義があるためリファクタ
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

const PopulationPage: NextPage = () => {
  const [modalStatus, setModalStatus] = useState(false);
  const [composition, setComposition] = useState<CompositionResult | null>(
    null
  );

  const openModal = () => {
    setModalStatus(true);
  };

  const closeModal = () => {
    setModalStatus(false);
  };

  /** 検索処理を実行 */
  const handleSearch = async (checkedPrefCodes: Prefecture["prefCode"][]) => {
    const [prefCode, ...addAreaPrefCodes] = [...checkedPrefCodes];
    const formattedAddArea = `${addAreaPrefCodes.join("_,")}_`;

    const response = await fetch(
      `/api/population/composition/perYear?cityCode=-&prefCode=${prefCode}&addArea=${formattedAddArea}`
    );
    const composition: CompositionResponse = await response.json();
    setComposition(composition.result);
  };

  return (
    <div>
      <Layout>
        <div className={style.searchArea}>
          <div className={style.searchInputWrap}>
            <input
              className={style.searchInput}
              type="search"
              name="search"
              placeholder="検索"
              onClick={openModal}
            />
          </div>
          <div className={style.searchBtnWrap}>
            <input
              className={style.searchBtn}
              type="submit"
              name="submit"
              value="検索"
            />
          </div>
        </div>
        <div className={style.mainCategoryContentsArea}>
          <h1 className={style.mainCategoryTitle}>人口構成</h1>
          <div className={style.subCategoryContentsArea}>
            <div className={style.subCategoryContentWrap}>
              <h2 className={style.subCategoryTitle}>人口構成</h2>
              <div className={style.subCategoryContent}>
                <p>人口構成のグラフエリア</p>
              </div>
            </div>
            <div className={style.subCategoryContentWrap}>
              <h2 className={style.subCategoryTitle}>人口ピラミッド</h2>
              <div className={style.subCategoryContent}>
                <p>人口ピラミッドのグラフエリア</p>
              </div>
            </div>
          </div>
        </div>
        <PopulationSearchModal
          isOpen={modalStatus}
          closeModal={closeModal}
          handleSearch={handleSearch}
        />
      </Layout>
    </div>
  );
};

export default PopulationPage;
