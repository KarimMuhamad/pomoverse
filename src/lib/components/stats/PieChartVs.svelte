<script lang="ts">
  import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
  import * as Chart from "$lib/components/ui/chart/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { PieChart } from "layerchart";

  const chartData = [
    { browser: "chrome", visitors: 275, color: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, color: "var(--color-safari)" },
    { browser: "firefox", visitors: 287, color: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, color: "var(--color-edge)" },
    { browser: "other", visitors: 190, color: "var(--color-other)" },
  ];

  const chartConfig = {
    visitors: { label: "Visitors" },
    chrome: { label: "Chrome", color: "var(--chart-1)" },
    safari: { label: "Safari", color: "var(--chart-2)" },
    firefox: { label: "Firefox", color: "var(--chart-3)" },
    edge: { label: "Edge", color: "var(--chart-4)" },
    other: { label: "Other", color: "var(--chart-5)" },
  } satisfies Chart.ChartConfig;
</script>

<Chart.Container config={chartConfig} class="min-h-10/12">
  <PieChart
    data={chartData}
    key="browser"
    value="visitors"
    c="color"
    innerRadius={100}
    legend
    padding={29}
    props={{ pie: { motion: "tween" } }}
  >
    {#snippet tooltip()}
      <Chart.Tooltip hideLabel />
    {/snippet}
  </PieChart>
</Chart.Container>

