import type { TimerMode } from "$lib/types/timerMode";

interface TimerState {
   currentSession: number;
   duration: Record<TimerMode, number>;
}

class TimerStore {
   timer: TimerState = $state<TimerState>({
      currentSession: 0,
      duration: {
         focus: 25 * 60,
         shortBreak: 5 * 60,
         longBreak: 15 * 60
      }
   });

   constructor() {
      this.loadFromLocalStorage();
   }

   updateDuration(update: Partial<TimerState>['duration']) {
      this.timer.duration = {...this.timer.duration, ...update};
      this.savedLocalStorage();
   }

   savedLocalStorage() {
      localStorage.setItem('timer-setting', JSON.stringify(this.timer));
   }

   loadFromLocalStorage() {
      const timerSetting = localStorage.getItem('timer-setting');
      console.log(timerSetting);
      if (timerSetting) {
         const parsed: TimerState = JSON.parse(timerSetting);
         this.timer = {...parsed};
      }
   }
}

export const timerStore = new TimerStore();