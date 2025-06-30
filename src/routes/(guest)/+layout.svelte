<script lang="ts">
   import '../../app.css';
   import { ChartPie, Settings2,SunIcon, MoonIcon, AlignHorizontalSpaceAround } from "@lucide/svelte";
   import {Separator} from "$lib/components/ui/separator";
   import { cn } from '$lib/utils';
   import { buttonVariants } from '$lib/components/ui/button';
   import Button from '$lib/components/ui/button/button.svelte';
   import { toggleMode } from 'mode-watcher';

   let { children } = $props();

   let compact = $state(true);

   const handleCompactToggle = () => {
      compact = !compact;
   };

</script>

<div class="fixed w-full justify-around items-center bg-transparent backdrop-blur-md py-1 shadow-md">
   <div class="{cn('mx-auto transition-all duration-300', compact ? 'max-w-full px-10' : 'max-w-9/12 px-4')}">
      <div class="flex items-center justify-between">
         <a href="/" class="{cn(buttonVariants({variant: 'ghost'}))} text-lg font-bold">POMOVERSE</a>
         <a href="/" class="{cn(buttonVariants({ variant: 'ghost'}))}">
            <ChartPie/>
            <Separator orientation="vertical"/>
            <span class="text-sm font-semibold">STATS</span>
         </a>
         <div class="flex h-5 items-center space-x-0.5">
            <a href="/" class="{cn(buttonVariants({variant: 'ghost'}))}"><Settings2/></a>
            <Separator orientation='vertical'/>
            <Button variant='ghost' onclick={handleCompactToggle}><AlignHorizontalSpaceAround/></Button>
            <Separator orientation='vertical'/>
            <Button onclick={toggleMode} variant="ghost">
               <SunIcon
                  class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 !transition-all dark:-rotate-90 dark:scale-0"
               />
               <MoonIcon
                  class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 !transition-all dark:rotate-0 dark:scale-100"
               />
               <span class="sr-only">Toggle theme</span>
            </Button>
         </div>
      </div>
   </div>
</div>

<div class="{cn('mx-auto pt-16 transition-all duration-300', compact ? 'max-w-full px-10' : 'max-w-9/12 px-4')}">
   {@render children()}
</div>