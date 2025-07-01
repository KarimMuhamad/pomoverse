const playSound = () => {
   const audio = new Audio('/notif.wav');
   audio.play().catch(error => {
      console.error('Error playing notification sound:', error) 
   });
}

export const sendNotification = (title: string, body: string) => {
  if (Notification.permission === 'granted') {
      new Notification(title, { body });
      playSound();
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
         new Notification(title, { body });
         playSound();
      }
    });
  }
}