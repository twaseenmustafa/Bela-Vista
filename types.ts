import { LucideIcon } from 'lucide-react';

export interface NavLink {
  name: string;
  href: string;
}

export interface Feature {
  title: string;
  icon: LucideIcon;
  image: string;
}


export interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
  platform: 'Google' | 'TripAdvisor';
}