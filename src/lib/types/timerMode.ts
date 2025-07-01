export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

interface SessionTitle {
   title: string;
   subtitle: string;
}

export const sessionTitle: Record<TimerMode, SessionTitle> = {
   focus: {
    title: 'ZERO DISTRACTION ZONE',
    subtitle: 'Close tabs, silence notifications, and dive in'
   },
   shortBreak: {
      title: 'QUICK RECHARGE',
      subtitle: 'Stay away from your screen and take a deep breath'
   },
   longBreak: {
      title: 'FULL REBOOT',
      subtitle: 'Do a quick stretch, walk, or hydrate. Your body will thank you!'
   }
}