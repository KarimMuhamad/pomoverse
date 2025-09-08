<script lang="ts">
  import {goto} from "$app/navigation";
  import SectionCards from "$lib/components/stats/SectionCards.svelte";
  import LineChart from "$lib/components/stats/LineChart.svelte";
  import {Separator} from "$lib/components/ui/separator";
  import PieChartVs from "$lib/components/stats/PieChartVs.svelte";
  import ChartCard from "$lib/components/ChartCard.svelte";


  let { data } = $props();

  if (data.user === null) {
    goto('/');
  }
</script>


<div class="flex flex-col gap-2 gap-y-4">
  <div class="flex flex-1 justify-center">
    <SectionCards/>
  </div>
  <Separator/>
  <div class="grid grid-cols-5 gap-4">
    <div class="col-span-3">
      <ChartCard title="Focus Time" description="Time spent on weeks" footerText="Last 7 days">
        {#snippet children()}
          <LineChart />
        {/snippet}
      </ChartCard>
    </div>
    <div class="col-span-2">
      <ChartCard title="Focus Time" description="Time spent on weeks">
        {#snippet children()}
          <PieChartVs />
        {/snippet}
      </ChartCard>
    </div>
  </div>
  <Separator/>

</div>