import type { TimerMode } from "$lib/types/timerMode";

export const timer = $state<{currentSession: number, duration: Record<TimerMode, number>}>({
   currentSession: 0,
   duration: {
      focus: 60 * 25,
      shortBreak: 60 * 5,
      longBreak: 60 * 15
   }
});