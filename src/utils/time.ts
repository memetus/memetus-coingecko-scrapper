export const getTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const timeDifference = (start: Date, end: Date): string => {
  const diffMs = Math.abs(end.getTime() - start.getTime());
  const diffSec = Math.floor(diffMs / 1000);
  const hours = Math.floor(diffSec / 3600);
  const minutes = Math.floor((diffSec % 3600) / 60);
  const seconds = diffSec % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
};
