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

type UseGenerateChart = {
  generateLineChart: (chartDataList: ChartData[]) => JSX.Element;
};

// TODO src/components/population/Population.tsxにも同じ型定義があるためリファクタ
type Composition = {
  label?: string;
  year: number;
  value: number;
};

type ChartData = {
  prefectureName: string;
  data: Composition[];
};

/**
 * RechartsのLineChartを生成するhooks
 */
const useGenerateChart = (): UseGenerateChart => {
  /**
   * LineChartグラフコンポーネントの生成
   * @param chartDataList グラフコンポーネントに必要なチャートデータ
   * @returns LineChartコンポーネント
   * @see https://recharts.org/en-US/examples/LineChartHasMultiSeries
   */
  const generateLineChart = (chartDataList: ChartData[]) => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={600}
        height={300}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        {chartDataList.map((chartData) => (
          <Line
            dataKey="value"
            data={chartData.data}
            name={chartData.prefectureName}
            key={chartData.prefectureName}
            type="monotone"
            stroke="#8884d8"
          />
        ))}
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="year" allowDuplicatedCategory={false} />
        <YAxis dataKey="value" />
        <Tooltip />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );

  return { generateLineChart };
};
export default useGenerateChart;
