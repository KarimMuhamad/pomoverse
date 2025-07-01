import type { TimerMode } from "$lib/types/timerMode";

export const timer = $state<{currentSession: number, duration: Record<TimerMode, number>}>({
   currentSession: 0,
   duration: {
      focus: 10,
      shortBreak: 5,
      longBreak: 8
   }
});