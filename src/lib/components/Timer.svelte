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
  import type {SessionRequestPayload} from "$lib/api/sessionApi";

  let isStart = $state(false);
  let isManual = $state(false);
  let sessionNumber = $derived.by(() => Math.floor(timerRuntimeStore.runtimeTimer.currentSession / 2) + 1);

	const tabs : {id: TimerMode, label : string}[] = [
		{ id: 'focus', label: 'FOCUS' },
		{ id: 'short_Break', label: 'BREAK' },
		{ id: 'long_Break', label: 'LONG BREAK' }
	];

	const setTab = (tabId: TimerMode) => {
    timerRuntimeStore.runtimeTimer.activeMode = tabId;
    isManual = true;
    timerRuntimeStore.runtimeTimer.isRunning = false;
    timerRuntimeStore.runtimeTimer.remainingTime = timerStore.timer.duration[tabId];
    timerRuntimeStore.runtimeTimer.currentSession = 0;
    timerRuntimeStore.runtimeTimer.duration = 0;
    timerRuntimeStore.runtimeTimer.sessionId = null;
    console.log('sessionId Deleted setTab');
    timerRuntimeStore.savedLocalStorage();
	}

  const handleReset = () => {
    isManual = false;
    timerRuntimeStore.reset();
    console.log('sessionId Deleted handleReset');
    indexSelected(timerRuntimeStore.runtimeTimer.currentSession);
  }

  const handleSkip = () => {
    if (isManual) {
      isManual = false;
      isStart = false;
      handleUpdateSessionToApi(false);
      timerRuntimeStore.runtimeTimer.isRunning = false;
      timerRuntimeStore.runtimeTimer.remainingTime = 0;
      timerRuntimeStore.runtimeTimer.currentSession = 0;
      timerRuntimeStore.runtimeTimer.duration = 0;
      timerRuntimeStore.runtimeTimer.sessionId = null;
      console.log('sessionId Deleted handleSkip manual = true');
      indexSelected(timerRuntimeStore.runtimeTimer.currentSession);
      timerRuntimeStore.savedLocalStorage();
    } else {
      handleUpdateSessionToApi(false);
      timerRuntimeStore.runtimeTimer.isRunning = false;
      nextSession();
      isStart = false;
    }
  }

  const indexSelected = (index: number) => {
    if (index === 7) {
      timerRuntimeStore.runtimeTimer.activeMode = 'long_Break';
      timerRuntimeStore.runtimeTimer.remainingTime = timerStore.timer.duration.long_Break;
    } else if (index % 2 === 0) {
      timerRuntimeStore.runtimeTimer.activeMode = 'focus';
      timerRuntimeStore.runtimeTimer.remainingTime = timerStore.timer.duration.focus;
    } else {
      timerRuntimeStore.runtimeTimer.activeMode = 'short_Break';
      timerRuntimeStore.runtimeTimer.remainingTime = timerStore.timer.duration.short_Break;
    }
  }

  const nextSession = () => {
    if (isManual) {
      isManual = false;
      timerRuntimeStore.runtimeTimer.activeMode = 'focus';
      timerRuntimeStore.runtimeTimer.remainingTime = timerStore.timer.duration.focus;
      timerRuntimeStore.runtimeTimer.currentSession = 0;
      timerRuntimeStore.runtimeTimer.duration = 0;
      timerRuntimeStore.runtimeTimer.sessionId = null;
      console.log('sessionId Deleted nextSession manual = true');
      timerRuntimeStore.savedLocalStorage();
      return;
    }

    timerRuntimeStore.runtimeTimer.currentSession = (timerRuntimeStore.runtimeTimer.currentSession + 1) % 8;
    timerRuntimeStore.runtimeTimer.duration = 0;
    timerRuntimeStore.runtimeTimer.sessionId = null;
    console.log('sessionId Deleted nextSession manual = false');
    indexSelected(timerRuntimeStore.runtimeTimer.currentSession);
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

      if (timerRuntimeStore.runtimeTimer.remainingTime <= 0) {
        handleUpdateSessionToApi(true);
        timerRuntimeStore.runtimeTimer.isRunning = false;
        clearInterval(interval);
        isStart = false;
        nextSession();
        sendNotification(`Time's up!`, `Your session has ended.`);
        return;
      }

      timerRuntimeStore.runtimeTimer.remainingTime -= 1;
      timerRuntimeStore.runtimeTimer.duration += 1;
      timerRuntimeStore.savedLocalStorage();
    }, 1000);
  };

  const handleCreateSessionToApi = async () => {
    const payload: SessionRequestPayload = {
      labelId: timerRuntimeStore.runtimeTimer.labelId ?? null,
      duration: timerRuntimeStore.runtimeTimer.duration,
      hour: new Date().getHours(),
      type: timerRuntimeStore.runtimeTimer.activeMode.toUpperCase(),
      isCompleted: false
    }

    await timerRuntimeStore.sendSessionToApi(payload);
  }

  const handleUpdateSessionToApi = (completed: boolean) => {
    const payload: SessionRequestPayload = {
      labelId: timerRuntimeStore.runtimeTimer.labelId ?? null,
      duration: timerRuntimeStore.runtimeTimer.duration,
      hour: new Date().getHours(),
      type: timerRuntimeStore.runtimeTimer.activeMode.toUpperCase(),
      isCompleted: completed
    }

    timerRuntimeStore.sendUpdateSessionToApi(timerRuntimeStore.runtimeTimer.sessionId!, payload);
  }

  const toggleStart = async () => {
    isStart = !isStart;
    if (isStart) {
      timerRuntimeStore.runtimeTimer.isRunning = true;
      timerRuntimeStore.runtimeTimer.labelId = labelStore.label?.id;

      if (!timerRuntimeStore.runtimeTimer.sessionId) {
        await handleCreateSessionToApi();
      }

      startTimer();
    } else {
      handleUpdateSessionToApi(false);
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
  <title>{isStart ? `${formatTime(timerRuntimeStore.runtimeTimer.remainingTime)} - Pomoverse` : 'Pomoverse'}</title>
</svelte:head>

<Card.Root class="w-full max-w-2xl mx-auto shadow-md">
  <Card.Header class="text-center">
    <Card.Title class="font-bold text-2xl">{sessionTitle[timerRuntimeStore.runtimeTimer.activeMode].title}</Card.Title>
    <Card.Description class="italic">
      {sessionTitle[timerRuntimeStore.runtimeTimer.activeMode].subtitle}
    </Card.Description>
  </Card.Header>

  <Card.Content>
    <div class="flex max-w-full mx-auto justify-center mb-4 border rounded-full">
      {#each tabs as tab}
        <Button
          class="min-w-1/3 py-2 rounded-full {cn(
            timerRuntimeStore.runtimeTimer.activeMode === tab.id ? '' : 'text-muted-foreground'
          )}"
          variant={timerRuntimeStore.runtimeTimer.activeMode === tab.id ? 'default' : 'ghost'}
          onclick={() => setTab(tab.id)}
        >
          {tab.label}
        </Button>
      {/each}
    </div>

    {#if isStart}
      <OverlayTimer
        tick={timerRuntimeStore.runtimeTimer.remainingTime}
        onStop={toggleStart} 
        title={sessionTitle[timerRuntimeStore.runtimeTimer.activeMode].title}
        subtitle={sessionTitle[timerRuntimeStore.runtimeTimer.activeMode].subtitle}
        max={timerStore.timer.duration[timerRuntimeStore.runtimeTimer.activeMode]}
        onNext={handleSkip}
      />
    {:else}
      <div class="flex items-center justify-center">
        <div class="text-9xl font-semibold">{formatTime(timerRuntimeStore.runtimeTimer.remainingTime)}</div>
      </div>
    {/if}
  </Card.Content>

  <Card.Footer class="flex flex-col items-center justify-center space-y-4">
    <Button class="text-sm text-muted-foreground" variant="ghost" onclick={handleReset}>#{sessionNumber}</Button>
    <p class="text-sm italic text-muted-foreground">Start your first session by clicking the button below.</p>
    <Button class="w-full max-w-xs" onclick={toggleStart} variant={isStart ? 'destructive' : 'default'}><Space/>{isStart ? 'STOP' : 'START'}</Button>
  </Card.Footer>
</Card.Root>
