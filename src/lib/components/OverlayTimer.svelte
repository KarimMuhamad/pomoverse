<script lang="ts">
   import { formatTime } from "$lib/util/formatTime";
   import { fade } from "svelte/transition";
   import Button from "./ui/button/button.svelte";
   import Progress from "./ui/progress/progress.svelte";
   import { SkipForward } from "@lucide/svelte";
   import { Space } from "@lucide/svelte";

   let { max, tick, onStop, title, subtitle, onNext } = $props<{
      max: number, 
      tick:number, 
      onStop: () => void, 
      title: string, 
      subtitle: string,
      onNext: () => void
   }>(); 

   const getProgressPercent = (remaining: number, total: number): number => {
      if (total === 0) return 0;
      return Math.round((remaining / total) * 100);
   };
</script>

<div class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center backdrop-blur-xl" transition:fade>
   <div class="flex flex-col max-w-7/2 items-center justify-center">
      <p class="text-3xl text-white font-bold">{title}</p>
      <p class="italic text-sm text-muted-foreground font-semibold mb-2">{subtitle}</p>
      <Progress value={getProgressPercent(tick, max)} max={100} />
      <div class="flex flex-col items-center text-center space-y-8 mt-2">
         <div class="text-9xl text-white font-bold">{formatTime(tick)}</div>
         <div class="flex items-center justify-stretch space-x-1">
            <Button variant="destructive" onclick={onStop} size="lg"><Space/>STOP</Button>
            <Button variant="ghost" onclick={onNext} size="lg"><SkipForward/></Button>
         </div>
      </div>
   </div>
</div>
   