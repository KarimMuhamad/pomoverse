<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { cn } from '$lib/utils';
  import Button from './ui/button/button.svelte';
  import { timerStore } from '$lib/state/Timer.svelte';
  import { formatTime } from '$lib/util/formatTime';
  import { sessionTitle, type TimerMode } from '$lib/types/timerMode';
  import OverlayTimer from './OverlayTimer.svelte';
  import { sendNotification } from './utils/sendNotification';
  import { onDestroy, onMount } from 'svelte';
  import { Space } from '@lucide/svelte';
  import { timerRuntimeStore } from "$lib/state/TimerRuntime.svelte";
  import {labelStore} from "$lib/state/Labels.svelte";

  let timer = $state(timerStore.timer);
  let runtimeTimer = $state(timerRuntimeStore.runtimeTimer);

  let isStart = $state(false);
  let isManual = $state(false);
  let sessionNumber = $derived.by(() => Math.floor(runtimeTimer.currentSession / 2) + 1);

	const tabs : {id: TimerMode, label : string}[] = [
		{ id: 'focus', label: 'FOCUS' },
		{ id: 'shortBreak', label: 'BREAK' },
		{ id: 'longBreak', label: 'LONG BREAK' }
	];

	const setTab = (tabId: TimerMode) => {
    runtimeTimer.activeMode = tabId;
    isManual = true;
    runtimeTimer.isRunning = false;
    runtimeTimer.remainingTime = timer.duration[tabId];
    runtimeTimer.currentSession = 0;
    runtimeTimer.duration = 0;
    timerRuntimeStore.savedLocalStorage();
	}

  const handleReset = () => {
    isManual = false;
    runtimeTimer.isRunning = false;
    timerRuntimeStore.reset();
    indexSelected(runtimeTimer.currentSession);
  }

  const handleSkip = () => {
    if (isManual) {
      isManual = false;
      isStart = false;
      runtimeTimer.isRunning = false;
      runtimeTimer.remainingTime = 0;
      runtimeTimer.currentSession = 0;
      runtimeTimer.duration = 0;
      indexSelected(runtimeTimer.currentSession);
      timerRuntimeStore.savedLocalStorage();
    } else {
      runtimeTimer.isRunning = false;
      nextSession();
      isStart = false;
    }
  }

  const indexSelected = (index: number) => {
    if (index === 7) {
      runtimeTimer.activeMode = 'longBreak';
      runtimeTimer.remainingTime = timer.duration.longBreak;
    } else if (index % 2 === 0) {
      runtimeTimer.activeMode = 'focus';
      runtimeTimer.remainingTime = timer.duration.focus;
    } else {
      runtimeTimer.activeMode = 'shortBreak';
      runtimeTimer.remainingTime = timer.duration.shortBreak;
    }
  }

  const nextSession = () => {
    if (isManual) {
      isManual = false;
      runtimeTimer.activeMode = 'focus';
      runtimeTimer.remainingTime = timer.duration.focus;
      runtimeTimer.currentSession = 0;
      runtimeTimer.duration = 0;
      timerRuntimeStore.savedLocalStorage();
      return;
    }

    runtimeTimer.currentSession = (runtimeTimer.currentSession + 1) % 8;
    runtimeTimer.duration = 0;
    indexSelected(runtimeTimer.currentSession);
    timerRuntimeStore.savedLocalStorage();
  }

  let interval: ReturnType<typeof setInterval>;

  const startTimer = () => {
    clearInterval(interval);
    interval = setInterval(() => {
      if (!isStart) {
        clearInterval(interval);
        return;
      }

      if (runtimeTimer.remainingTime <= 0) {
        runtimeTimer.isRunning = false;
        clearInterval(interval);
        isStart = false;
        nextSession();
        sendNotification(`Time's up!`, `Your session has ended.`);
        return;
      }

      runtimeTimer.remainingTime -= 1;
      runtimeTimer.duration += 1;
      timerRuntimeStore.savedLocalStorage();
    }, 1000);
  };

  const toggleStart = () => {
    isStart = !isStart;
    if (isStart) {
      runtimeTimer.isRunning = true;
      runtimeTimer.labelId = labelStore.label?.id;
      timerRuntimeStore.savedLocalStorage();
      startTimer();
    } else {
      clearInterval(interval);
    }
  }

  onMount(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        toggleStart();
      }
    };

    if (localStorage.getItem('accessToken')) {
      timerStore.loadFromApi();
    }

    window.addEventListener('keydown', handleKeydown);

    onDestroy(() => {
      window.removeEventListener('keydown', handleKeydown);
    });
  });
</script>

<svelte:head>
  <title>{isStart ? `${formatTime(runtimeTimer.remainingTime)} - Pomoverse` : 'Pomoverse'}</title>
</svelte:head>

<Card.Root class="w-full max-w-2xl mx-auto shadow-md">
  <Card.Header class="text-center">
    <Card.Title class="font-bold text-2xl">{sessionTitle[runtimeTimer.activeMode].title}</Card.Title>
    <Card.Description class="italic">
      {sessionTitle[runtimeTimer.activeMode].subtitle}
    </Card.Description>
  </Card.Header>

  <Card.Content>
    <div class="flex max-w-full mx-auto justify-center mb-4 border rounded-full">
      {#each tabs as tab}
        <Button
          class="min-w-1/3 py-2 rounded-full {cn(
            runtimeTimer.activeMode === tab.id ? '' : 'text-muted-foreground'
          )}"
          variant={runtimeTimer.activeMode === tab.id ? 'default' : 'ghost'}
          onclick={() => setTab(tab.id)}
        >
          {tab.label}
        </Button>
      {/each}
    </div>

    {#if isStart}
      <OverlayTimer
        tick={runtimeTimer.remainingTime}
        onStop={toggleStart} 
        title={sessionTitle[runtimeTimer.activeMode].title}
        subtitle={sessionTitle[runtimeTimer.activeMode].subtitle}
        max={timer.duration[runtimeTimer.activeMode]}
        onNext={handleSkip}
      />
    {:else}
      <div class="flex items-center justify-center">
        <div class="text-9xl font-semibold">{formatTime(runtimeTimer.remainingTime)}</div>
      </div>
    {/if}

    
  </Card.Content>

  <Card.Footer class="flex flex-col items-center justify-center space-y-4">
    <Button class="text-sm text-muted-foreground" variant="ghost" onclick={handleReset}>#{sessionNumber}</Button>
    <p class="text-sm italic text-muted-foreground">Start your first session by clicking the button below.</p>
    <Button class="w-full max-w-xs" onclick={toggleStart} variant={isStart ? 'destructive' : 'default'}><Space/>{isStart ? 'STOP' : 'START'}</Button>
  </Card.Footer>
</Card.Root>
