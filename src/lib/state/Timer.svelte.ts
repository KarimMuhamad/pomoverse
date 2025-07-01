type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

interface TimerState {
   mode: TimerMode;
   currentSession: number;
   duration: {
      focus: number;
      shortBreak: number;
      longBreak: number;
   };
}

export const timer = $state<TimerState>({
   mode: 'focus',
   currentSession: 0,
   duration: {
      focus: 10,
      shortBreak: 5,
      longBreak: 8
   }
});