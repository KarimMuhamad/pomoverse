<script lang="ts">
  import {goto} from "$app/navigation";
  import * as Chart from "$lib/components/ui/chart/index.js";
  import { scaleBand } from "d3-scale";
  import { BarChart } from "layerchart";
  import {MonitorIcon} from "@lucide/svelte";
  import SectionCards from "$lib/components/SectionCards.svelte";

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 , tablet: 100},
    { month: "February", desktop: 305, mobile: 200, tablet: 150 },
    { month: "March", desktop: 500, mobile: 338, tablet: 200 },
    { month: "April", desktop: 73, mobile: 190, tablet: 250 },
    { month: "May", desktop: 209, mobile: 130, tablet: 200 },
    { month: "June", desktop: 214, mobile: 140, tablet: 200 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
      icon: MonitorIcon,
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
    tablet: {
      label: "Tablet",
      color: "#96c5fd",
    },
  } satisfies Chart.ChartConfig;

  let { data } = $props();

  if (data.user === null) {
    goto('/');
  }
</script>


<div class="flex flex-col gap-2">
  <div class="flex flex-1 justify-center">
    <SectionCards/>
  </div>
<!--  <Chart.Container config={chartConfig} class="w-full">-->
<!--    <BarChart-->
<!--      data={chartData}-->
<!--      xScale={scaleBand().padding(0.35)}-->
<!--      x="month"-->
<!--      axis="x"-->
<!--      seriesLayout="group"-->
<!--      legend-->
<!--      series={[-->
<!--      {-->
<!--        key: "desktop",-->
<!--        icon: MonitorIcon,-->
<!--        label: chartConfig.desktop.label,-->
<!--        color: chartConfig.desktop.color-->
<!--      },-->
<!--      {-->
<!--        key: "mobile",-->
<!--        label: chartConfig.mobile.label,-->
<!--        color: chartConfig.mobile.color-->
<!--      },-->
<!--      {-->
<!--        key: "tablet",-->
<!--        label: chartConfig.tablet.label,-->
<!--        color: chartConfig.tablet.color-->
<!--      }-->
<!--    ]}-->
<!--      props={{-->
<!--      xAxis: {-->
<!--        format: (d) => d.slice(0, 3),-->
<!--      }-->
<!--    }}-->
<!--    >-->
<!--      {#snippet tooltip()}-->
<!--        <Chart.Tooltip/>-->
<!--      {/snippet}-->
<!--    </BarChart>-->
<!--  </Chart.Container>-->
</div>