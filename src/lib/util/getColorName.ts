export const getColorName = (name: string, theme: string) => {
  if (!name) return null;
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash % 360);
  const saturation = theme === 'dark' ? 35 : 55;
  const lightness = theme === 'dark' ? 35 : 55;

  const bgLightness = lightness;
  const textLightness = theme === 'dark' ? Math.min(bgLightness + 35, 100) : Math.max(bgLightness - 35, 0);

  const bgColor = `hsl(${hue}, ${saturation}%, ${bgLightness}%)`;
  const textColor = `hsl(${hue}, ${saturation}%, ${textLightness}%)`;

  return {
    bgColor,
    textColor
  }

}


export const getInitial = (name: string) => {
  if (!name) return null;
  const part = name.trim().split(" ");
  if (part.length === 1) return part[0][0].toUpperCase();
  return part[0][0].toUpperCase() + part[1][0].toUpperCase();
}

