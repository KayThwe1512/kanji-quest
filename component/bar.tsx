import colors from "@/theme/colors";
import { BarChart } from "react-native-gifted-charts";

type BarChartItem = {
  value: number;
  label?: string;
  frontColor?: string;
};

export const Bar = ({ data }: { data: BarChartItem[] }) => {
  return (
    <BarChart
      data={data}
      barWidth={14}
      spacing={20}
      roundedTop
      xAxisLabelTextStyle={{ color: colors.primary }}
      yAxisTextStyle={{ color: colors.primary }}
    />
  );
};
