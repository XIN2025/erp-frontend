import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from 'axios'


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const apiClient =axios.create({
  baseURL:process.env.NEXT_PUBLIC_API_BASE_URL
})