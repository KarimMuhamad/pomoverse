<script lang="ts">
  import { AreaChart } from "layerchart";
  import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
  import { curveNatural } from "d3-shape";
  import { scaleUtc } from "d3-scale";
  import * as Chart from "$lib/components/ui/chart/index.js";
  import * as Card from "$lib/components/ui/card/index.js";

  const generateWeeklyData = () => {
    const today = new Date();
    const currentDay = today.getDay();

    const monday = new Date(today);
    monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));

    const weeklyData = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);

      weeklyData.push({
        date: date,
        focus: Math.floor(Math.random() * 500) + 50,
      });
    }
    return weeklyData;
  }

  const chartConfig = {
    focus: { label: "Focus Time", color: "var(--chart-1)" },
  } satisfies Chart.ChartConfig;

  const formatDay = (date: Date) : string => date.toLocaleDateString("en-US", { weekday: "short" });

  const formatFullDate = (date: Date) : string => date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
</script>

<Chart.Container config={chartConfig}>
  <AreaChart
    data={generateWeeklyData()}
    x="date"
    xScale={scaleUtc()}
    series={[
          {
            key: "focus",
            label: "Focus",
            color: chartConfig.focus.color,
          },
        ]}
    axis="x"
    props={{
          area: {
            curve: curveNatural,
            "fill-opacity": 0.4,
            line: { class: "stroke-1" },
            motion: "tween",
          },
          xAxis: {
            format: (v: Date) => formatDay(v),
            ticks: 7
          },
        }}
  >
    {#snippet tooltip()}
      <Chart.Tooltip
        labelFormatter={(v: Date) => formatFullDate(v)}
        indicator="line"
      />
    {/snippet}
  </AreaChart>
</Chart.Container>

