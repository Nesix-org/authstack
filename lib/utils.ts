import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name?: string | null | undefined) {
  if (!name) return "JD"; 
  const names = name.split(" ");
  return names
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2); ;
}
