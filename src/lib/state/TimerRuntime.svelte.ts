import type {TimerMode} from "$lib/types/timerMode";
import {timerStore} from "$lib/state/Timer.svelte";
import {createSessionRequest, type SessionRequestPayload, updateSessionRequest} from "$lib/api/sessionApi";
import {userStore} from "$lib/state/User.svelte";

interface TimerRuntimeState {
  isRunning: boolean;
  labelId?: number | null;
  sessionId?: number | null;
  currentSession: number;
  duration: number;
  activeMode: TimerMode;
  remainingTime: number;
}

class TimerRuntimeStore {
  runtimeTimer: TimerRuntimeState = $state<TimerRuntimeState>({
    isRunning: false,
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

  async sendSessionToApi(payload: SessionRequestPayload) {
    if(!localStorage.getItem('accessToken')) return;

    try {
      const res = await createSessionRequest(payload);
      console.log(res);
      this.runtimeTimer.sessionId = res?.data.id;
      this.savedLocalStorage();
    } catch (e) {
      console.log(e);
    }
  }

  async sendUpdateSessionToApi(id: number ,payload: SessionRequestPayload) {
    if(!localStorage.getItem('accessToken')) return;

    if(!this.runtimeTimer.sessionId) {
      return;
    }

    try {
      console.log(id);
      const res = await updateSessionRequest(id, payload);
    } catch (e) {
      console.log(e);
    }
  }

  reset() {
    this.runtimeTimer = {
      sessionId: null,
      isRunning: false,
      currentSession: 0,
      duration: 0,
      activeMode: 'focus',
      remainingTime: timerStore.timer.duration.focus
    }
    this.savedLocalStorage();
  }

}

export const timerRuntimeStore = new TimerRuntimeStore();