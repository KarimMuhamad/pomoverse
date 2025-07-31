import type { TimerMode } from "$lib/types/timerMode";
import {getUserPreferencesRequest, updatePreferencesRequest} from "$lib/api/userApi";

interface TimerState {
   duration: Record<TimerMode, number>;
}

class TimerStore {
   timer: TimerState = $state<TimerState>({
      duration: {
         focus: 25 * 60,
         short_Break: 5 * 60,
         long_Break: 15 * 60
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
      if (timerSetting) {
         const parsed: TimerState = JSON.parse(timerSetting);
         this.timer = {...parsed};
      }
   }

   async loadFromApi() {
      try {
         const res = await getUserPreferencesRequest();
         this.timer.duration = this.mappingFromApi(res?.data);
         console.log(res);
         this.savedLocalStorage();
      } catch (e) {
         console.log(e);
         this.loadFromLocalStorage();
      }
   }

   mappingFromApi(data: any) {
      return {
         focus: data.focusDuration,
         short_Break: data.shortBreakDuration,
         long_Break: data.longBreakDuration
      }
   }

   mappingToApi(data: TimerState['duration']) {
      return {
         focusDuration: data.focus,
         shortBreakDuration: data.short_Break,
         longBreakDuration: data.long_Break
      }
   }

   async updatePreferencesApi() {
      try {
         const payload = this.mappingToApi(this.timer.duration);
         const res = await updatePreferencesRequest(payload);
         console.log(res);
      } catch (e) {
         console.log(e);
      }
   }
}

export const timerStore = new TimerStore();