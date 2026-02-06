import { Waves, Sunset, UtensilsCrossed } from 'lucide-react';
import { NavLink, Feature, GalleryImage, Review } from './types';

export const NAV_LINKS: NavLink[] = [
  { name: 'Home', href: '#hero' },
  { name: 'Experience', href: '#experience' },
  { name: 'Rooms', href: '#rooms' },
  { name: 'Gallery', href: '#gallery' },
];

export const FEATURES: Feature[] = [
  {
    title: 'Private West Beach',
    description: 'Located on the serene western coast, offering exclusive access to quiet shores and unobstructed sunset views.',
    icon: Waves,
  },
  {
    title: 'Wooden Cottages',
    description: 'Eco-friendly, artistically designed wooden suites that blend rusticity with modern luxury.',
    icon: Sunset,
  },
  {
    title: 'Fresh Seafood BBQ',
    description: 'Experience our signature beachside BBQ with fresh catch from the Bay of Bengal under the starry sky.',
    icon: UtensilsCrossed,
  },
];

export const REVIEWS: Review[] = [
  {
    author: 'Tanvir Hasan',
    rating: 5.0,
    text: 'One of the best resorts in Saint Martin. The location is just beside the beach. You can enjoy the sunset from your balcony. Staff behavior is top notch.',
    date: '2 months ago',
    platform: 'Google',
  },
  {
    author: 'Sarah Jenkins',
    rating: 5.0,
    text: 'A sanctuary of peace. The wooden cottages give a rustic feel with modern comfort. The attention to detail is unmatched on the island. West beach is definitely the quieter, better side.',
    date: '1 month ago',
    platform: 'Google',
  },
  {
    author: 'Mahbubur Rahman',
    rating: 4.0,
    text: 'Great location for sunset lovers. The service was prompt and the BBQ at night was delicious. The road to the resort is a bit bumpy but worth it for the view.',
    date: '3 weeks ago',
    platform: 'Google',
  },
  {
    author: 'Elena Rossi',
    rating: 5.0,
    text: 'We stayed in the second-floor cottage. Waking up to the sound of waves was magical. Highly recommended for couples looking for privacy.',
    date: '4 months ago',
    platform: 'Google',
  },
  {
    author: 'Fahim Ahmed',
    rating: 5.0,
    text: 'Best hospitality in St. Martin. They arranged a candlelight dinner for us right on the beach. Unforgettable experience.',
    date: '1 week ago',
    platform: 'Google',
  },
  {
    author: 'Jessica Lee',
    rating: 4.0,
    text: 'Lovely eco-resort. No AC but the sea breeze is enough at night. Very clean and the manager was very helpful with boat tickets.',
    date: '5 months ago',
    platform: 'Google',
  },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1200&auto=format&fit=crop', // Resort Pool/Exterior
    alt: 'Infinity pool overlooking the ocean',
    size: 'large',
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop', // Luxury Interior
    alt: 'Premium Suite Interior',
    size: 'tall',
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1519708227418-81988761e535?q=80&w=800&auto=format&fit=crop', // Beach Detail
    alt: 'Private beach lounge area',
    size: 'small',
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop', // Food/Drink
    alt: 'Signature cocktails at sunset',
    size: 'small',
  },
];

export const CONTACT_INFO = {
  address: "St. Martin Island, Western Beach, Dakhinpara",
  phone: "+880 1712-097790",
  email: "info@belavistaresort.com",
  mapsLink: "https://www.google.com/maps/place/Bela+Vista+-+Saint+Martin's+Island/@20.6041804,92.324494,1414m/data=!3m1!1e3!4m9!3m8!1s0x30ae237101e5bb9f:0x633298a5f41b4100!5m2!4m1!1i2!8m2!3d20.604477!4d92.32687!16s%2Fg%2F11sckhkqht?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
};