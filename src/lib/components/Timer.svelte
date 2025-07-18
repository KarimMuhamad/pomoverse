<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { cn } from '$lib/utils';
  import Button from './ui/button/button.svelte';
  import { timer } from '$lib/state/Timer.svelte';
  import { formatTime } from '$lib/util/formatTime';
  import { sessionTitle, type TimerMode } from '$lib/types/timerMode';
  import OverlayTimer from './OverlayTimer.svelte';
  import { sendNotification } from './utils/sendNotification';
  import { onDestroy, onMount } from 'svelte';
  import { Space } from '@lucide/svelte';
   
	let activeTab = $state<TimerMode>('focus');
  let isStart = $state(false);
  let isManual = $state(false);
  let tick = $state(0);
  let sessionNumber = $state(timer.currentSession);

  $effect(() => {
    tick = timer.duration[activeTab];
    sessionNumber = Math.floor(timer.currentSession / 2) + 1;
    $inspect(console.log(timer.currentSession, sessionNumber))
  });

	const tabs : {id: TimerMode, label : string}[] = [
		{ id: 'focus', label: 'FOCUS' },
		{ id: 'shortBreak', label: 'BREAK' },
		{ id: 'longBreak', label: 'LONG BREAK' }
	];

	const setTab = (tabId: TimerMode) => {
		activeTab = tabId;
    isManual = true;
    tick = timer.duration[tabId];
	}

  const handleReset = () => {
    isManual = false;
    timer.currentSession = 0;
    indexSelected(timer.currentSession);
    localStorage.setItem('timer-setting', JSON.stringify(timer));
  }

  const handleSkip = () => {
    if (isManual) {
      isManual = false;
      isStart = false;
      indexSelected(timer.currentSession);
    } else {
      nextSession();
      isStart = false;
    }
  }

  const indexSelected = (index: number) => {
    if (index === 7) {
      activeTab = 'longBreak';
      tick = timer.duration.longBreak;
    } else if (index % 2 === 0) {
      activeTab = 'focus';
      tick = timer.duration.focus;
    } else {
      activeTab = 'shortBreak';
      tick = timer.duration.shortBreak;
    }
  }

  const nextSession = () => {
    if (isManual) {
      isManual = false;
      activeTab = 'focus';
      tick = timer.duration.focus;
      timer.currentSession = 0;
      localStorage.setItem('timer-setting', JSON.stringify(timer));
      return;
    }

    timer.currentSession = (timer.currentSession + 1) % 8;
    localStorage.setItem('timer-setting', JSON.stringify(timer));
    indexSelected(timer.currentSession);
  }

  let interval: ReturnType<typeof setInterval>;

  const startTimer = () => {
    clearInterval(interval);
    interval = setInterval(() => {
      if (!isStart) {
        clearInterval(interval);
        return;
      }

      if (tick <= 0) {
        clearInterval(interval);
        isStart = false;
        nextSession();
        sendNotification(`Time's up!`, `Your session has ended.`);
        return;
      }

      tick -= 1;
    }, 1000);
  };

  const toggleStart = () => {
    isStart = !isStart;
    if (isStart) {
      startTimer();
    } else {
      clearInterval(interval);
    }
  }

  onMount(() => {
    indexSelected(timer.currentSession);

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        toggleStart();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    onDestroy(() => {
      window.removeEventListener('keydown', handleKeydown);
    });
  });
</script>

<svelte:head>
  <title>{isStart ? `${formatTime(tick)} - Pomoverse` : 'Pomoverse'}</title>
</svelte:head>

<Card.Root class="w-full max-w-2xl mx-auto shadow-md">
  <Card.Header class="text-center">
    <Card.Title class="font-bold text-2xl">{sessionTitle[activeTab].title}</Card.Title>
    <Card.Description class="italic">
      {sessionTitle[activeTab].subtitle}
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
      <OverlayTimer
        tick={tick} 
        onStop={toggleStart} 
        title={sessionTitle[activeTab].title} 
        subtitle={sessionTitle[activeTab].subtitle} 
        max={timer.duration[activeTab]}
        onNext={handleSkip}
      />
    {:else}
      <div class="flex items-center justify-center">
        <div class="text-9xl font-semibold">{formatTime(tick)}</div>
      </div>
    {/if}

    
  </Card.Content>

  <Card.Footer class="flex flex-col items-center justify-center space-y-4">
    <Button class="text-sm text-muted-foreground" variant="ghost" onclick={handleReset}>#{sessionNumber}</Button>
    <p class="text-sm italic text-muted-foreground">Start your first session by clicking the button below.</p>
    <Button class="w-full max-w-xs" onclick={toggleStart} variant={isStart ? 'destructive' : 'default'}><Space/>{isStart ? 'STOP' : 'START'}</Button>
  </Card.Footer>
</Card.Root>
