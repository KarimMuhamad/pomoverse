<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { cn } from '$lib/utils';
  import Button from './ui/button/button.svelte';
  import { timer } from '$lib/state/Timer.svelte';
  import { formatTime } from '$lib/util/formatTime';
  import { fade } from 'svelte/transition';
   
	let activeTab = $state('focus');

	const tabs = [
		{ id: 'focus', label: 'FOCUS' },
		{ id: 'shortBreak', label: 'BREAK' },
		{ id: 'longBreak', label: 'LONG BREAK' }
	];

	function setTab(tabId: string) {
		activeTab = tabId;
	}

  let isStart = $state(false);
  let tick: number = $derived.by(() => {
    if (activeTab === 'focus') {
      return timer.duration.focus;
    } else if (activeTab === 'shortBreak') {
      return timer.duration.shortBreak;
    } else if (activeTab === 'longBreak') {
      return timer.duration.longBreak;
    }
    return 0;
  });

  const toggleStart = () => {
    isStart = !isStart;
  }
  
  const startTimer = () => {
    const interval = setInterval(() => {
      tick -= 1;
      if (tick <= 0) {
        if (activeTab === 'focus') {
          activeTab = 'shortBreak';
          tick = timer.duration.shortBreak;
        } else if (activeTab === 'shortBreak') {
          activeTab = 'longBreak';
          tick = timer.duration.longBreak;
        } else if (activeTab === 'longBreak') {
          activeTab = 'focus';
          tick = timer.duration.focus;
        }
        isStart = false;
      }
      if (!isStart) {
        clearInterval(interval);
      }
    }, 1000);
  };

  $effect(() => {
    if (isStart) {
      startTimer();
    }
  });

</script>

<Card.Root class="w-full max-w-2xl mx-auto shadow-md">
  <Card.Header class="text-center">
    <Card.Title class="font-bold text-2xl">ZERO DISTRACTION ZONE</Card.Title>
    <Card.Description class="italic">
      Close tabs, silence notifications, and dive in
    </Card.Description>
  </Card.Header>

  <Card.Content>
    <div class="flex max-w-full mx-auto justify-center mb-4 border rounded-full">
      {#each tabs as tab}
        <Button
          class="min-w-1/3 py-2 rounded-full {cn(
            activeTab === tab.id ? '' : 'text-muted-foreground'
          )}"
          variant={activeTab === tab.id ? 'default' : 'ghost'}
          onclick={() => setTab(tab.id)}
        >
          {tab.label}
        </Button>
      {/each}
    </div>

    {#if isStart}
      <div class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center backdrop-blur-md" transition:fade>
        <div class="text-center space-y-8">
          <div class="text-9xl text-white font-bold">{formatTime(tick)}</div>
          <Button 
            class="mx-auto text-white"
            variant="destructive"
            onclick={toggleStart}
          >
            STOP
          </Button>
        </div>
      </div>
    {:else}
      <div class="flex items-center justify-center">
        <div class="text-9xl font-semibold">{formatTime(tick)}</div>
      </div>
    {/if}

    
  </Card.Content>

  <Card.Footer class="flex flex-col items-center justify-center space-y-4">
    <p class="text-sm italic text-muted-foreground">Start your first session by clicking the button below.</p>
    <Button class="w-full max-w-xs" onclick={toggleStart} variant={isStart ? 'destructive' : 'default'}>{isStart ? 'STOP' : 'START'}</Button>
  </Card.Footer>
</Card.Root>
