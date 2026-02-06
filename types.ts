import { LucideIcon } from 'lucide-react';

export interface NavLink {
  name: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  size: 'large' | 'tall' | 'wide' | 'small';
}

export interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
  platform: 'Google' | 'TripAdvisor';
}