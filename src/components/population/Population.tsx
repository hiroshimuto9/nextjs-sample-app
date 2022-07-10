import type { NextPage } from "next";
import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import style from "./Population.module.css";
import { Layout } from "@/components/layouts/Layout";
import PopulationSearchModal from "@/components/population/PopulationSearchModal";
import useGenerateChart from "@/hooks/useGenerateChart";

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
  label?: string;
  year: number;
  value: number;
};

type ChartData = {
  prefectureName: string;
  data: Composition[];
};

const PopulationPage: NextPage = () => {
  const [modalStatus, setModalStatus] = useState(false);
  const [totalPopulationList, setTotalPopulation] = useState<ChartData[]>([]);
  const [youngPopulationList, setYoungPopulation] = useState<ChartData[]>([]);
  const [workingAgePopulationList, setWorkingAgePopulation] = useState<
    ChartData[]
  >([]);
  const [agedPopulationList, setAgedPopulation] = useState<ChartData[]>([]);
  const { generateLineChart } = useGenerateChart();

  const openModal = () => {
    setModalStatus(true);
  };

  const closeModal = () => {
    setModalStatus(false);
  };

  /** 検索処理を実行 */
  const handleSearch = async (checkedPrefectureList: Prefecture[]) => {
    let allTotalPopulationList: ChartData[] = [];
    let allYoungPopulationList: ChartData[] = [];
    let allWorkingAgePopulationList: ChartData[] = [];
    let allAgedPopulationList: ChartData[] = [];

    for (const checkedPrefecture of checkedPrefectureList) {
      const requestUrl = `/api/population/composition/perYear?cityCode=-&prefCode=${checkedPrefecture.prefCode}`;
      const response = await fetch(requestUrl);
      const composition: CompositionResponse = await response.json();
      // 選択された都道府県の総人口を一時保存
      if (composition.result.data[0]) {
        const totalPopulationChartData: ChartData = {
          prefectureName: checkedPrefecture.prefName,
          data: composition.result.data[0].data,
        };
        allTotalPopulationList.push(totalPopulationChartData);
      }
      // 選択された都道府県の年少人口を一時保存
      if (composition.result.data[1]) {
        const youngPopulationChartData: ChartData = {
          prefectureName: checkedPrefecture.prefName,
          data: composition.result.data[1].data,
        };
        allYoungPopulationList.push(youngPopulationChartData);
      }
      // 選択された都道府県の生産年齢人口を一時保存
      if (composition.result.data[2]) {
        const workingAgePopulationChartData: ChartData = {
          prefectureName: checkedPrefecture.prefName,
          data: composition.result.data[2].data,
        };
        allWorkingAgePopulationList.push(workingAgePopulationChartData);
      }
      // 選択された都道府県の老年人口を一時保存
      if (composition.result.data[3]) {
        const agedPopulationChartData: ChartData = {
          prefectureName: checkedPrefecture.prefName,
          data: composition.result.data[3].data,
        };
        allAgedPopulationList.push(agedPopulationChartData);
      }
    }
    setTotalPopulation(allTotalPopulationList);
    console.log("totalPopulationList", totalPopulationList);
    setYoungPopulation(allYoungPopulationList);
    setWorkingAgePopulation(allWorkingAgePopulationList);
    setAgedPopulation(allAgedPopulationList);
  };

  // 総人口グラフ
  const totalPopulationLineChart = () => {
    return generateLineChart(totalPopulationList);
  };

  // 年少人口グラフ
  const youngPopulationLineChart = () => {
    return generateLineChart(youngPopulationList);
  };

  // 生産年齢人口グラフ
  const workingAgePopulationLineChart = () => {
    return generateLineChart(workingAgePopulationList);
  };

  // 老年人口グラフ
  const agedPopulationLineChart = () => {
    return generateLineChart(agedPopulationList);
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
              placeholder="都道府県を選択"
              onClick={openModal}
            />
          </div>
        </div>
        <div className={style.mainCategoryContentsArea}>
          <h1 className={style.mainCategoryTitle}>人口構成</h1>
          <div className={style.subCategoryContentsArea}>
            <div className={style.subCategoryContentWrap}>
              <h2 className={style.subCategoryTitle}>総人口</h2>
              <div className={style.subCategoryContent}>
                {totalPopulationLineChart()}
              </div>
            </div>
            <div className={style.subCategoryContentWrap}>
              <h2 className={style.subCategoryTitle}>年少人口</h2>
              <div className={style.subCategoryContent}>
                {youngPopulationLineChart()}
              </div>
            </div>
            <div className={style.subCategoryContentWrap}>
              <h2 className={style.subCategoryTitle}>生産年齢人口</h2>
              <div className={style.subCategoryContent}>
                {workingAgePopulationLineChart()}
              </div>
            </div>
            <div className={style.subCategoryContentWrap}>
              <h2 className={style.subCategoryTitle}>老年人口</h2>
              <div className={style.subCategoryContent}>
                {agedPopulationLineChart()}
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
