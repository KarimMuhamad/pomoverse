export type TimerMode = 'focus' | 'short_Break' | 'long_Break';

interface SessionTitle {
   title: string;
   subtitle: string;
}

export const sessionTitle: Record<TimerMode, SessionTitle> = {
   focus: {
    title: 'ZERO DISTRACTION ZONE',
    subtitle: 'Minimize tabs, silence notifications, and dive in'
   },
   short_Break: {
      title: 'QUICK RECHARGE',
      subtitle: 'Stay away from your screen and take a deep breath'
   },
   long_Break: {
      title: 'FULL REBOOT',
      subtitle: 'Do a quick stretch, walk, or hydrate. Your body will thank you!'
   }
}