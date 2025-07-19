export const getColorName = (name: string) => {
  if (!name) return null;
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 180}, 50%, 25%)`;
  return color;
}


export const getInitial = (name: string) => {
  if (!name) return null;
  const part = name.trim().split(" ");
  if (part.length === 1) return part[0][0].toUpperCase();
  return part[0][0].toUpperCase() + part[1][0].toUpperCase();
}

