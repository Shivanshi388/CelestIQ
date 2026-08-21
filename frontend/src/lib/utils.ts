import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(isoString: string) {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', { hour12: false, timeZone: 'UTC' }) + ' UTC';
}
