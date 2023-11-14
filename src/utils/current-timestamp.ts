const INTERVAL = 30;

export const currentTimestamp = (): number => {
  const rounder =
    Math.floor(Math.floor(Date.now() / 1000) / INTERVAL) * INTERVAL;
  const fallbackToNow = Math.floor(Date.now() / 1000);
  return rounder ?? fallbackToNow;
};
