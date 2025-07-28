import type {TimerMode} from "$lib/types/timerMode";
import {timerStore} from "$lib/state/Timer.svelte";

interface TimerRuntimeState {
  currentSession: number;
  duration: number;
  activeMode: TimerMode;
  remainingTime: number;
}

class TimerRuntimeStore {
  runtimeTimer: TimerRuntimeState = $state<TimerRuntimeState>({
    currentSession: 0,
    duration: 0,
    activeMode: 'focus',
    remainingTime: timerStore.timer.duration.focus
  });

  constructor() {
    this.loadFromLocalStorage();
  }

  savedLocalStorage() {
    localStorage.setItem('timer-runtime', JSON.stringify(this.runtimeTimer));
  }

  loadFromLocalStorage() {
    const timerRuntime = localStorage.getItem('timer-runtime');
    if (timerRuntime) {
      const parsed: TimerRuntimeState = JSON.parse(timerRuntime);
      this.runtimeTimer = {...parsed};
    }
  }

  reset() {
    this.runtimeTimer = {
      currentSession: 0,
      duration: 0,
      activeMode: 'focus',
      remainingTime: timerStore.timer.duration.focus
    }
    this.savedLocalStorage();
  }

}

export const timerRuntimeStore = new TimerRuntimeStore();