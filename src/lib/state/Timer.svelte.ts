import type { TimerMode } from "$lib/types/timerMode";

interface TimerState {
   currentSession: number;
   duration: Record<TimerMode, number>;
}

const defaultTimer = $state<TimerState>({
   currentSession: 0,
   duration: {
      focus: 60 * 25,
      shortBreak: 60 * 5,
      longBreak: 60 * 15
   }
});

const stored = localStorage.getItem('timer-setting');
export const timer = stored ? JSON.parse(stored) : defaultTimer;