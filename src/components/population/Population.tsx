import type { NextPage } from "next";
import style from "./Population.module.css";
import { Layout } from "@/components/layouts/Layout";

const PopulationPage: NextPage = () => {
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
      </Layout>
    </div>
  );
};

export default PopulationPage;
