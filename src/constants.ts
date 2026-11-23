import { Waves, Sunset, UtensilsCrossed } from 'lucide-react';
import { NavLink, Feature, Review } from './types';

export const NAV_LINKS: NavLink[] = [
  { name: 'Home', href: '#hero' },
  { name: 'Experience', href: '#experience' },
  { name: 'Rooms', href: '#rooms' },
  { name: 'Gallery', href: '#gallery' },
];

// Cloudinary image with on-the-fly format/quality/size.
export const cld = (path: string, t = 'f_auto,q_auto,w_1400') =>
  `https://res.cloudinary.com/dshsndiup/image/upload/${t}/${path}`;

export const FEATURES: Feature[] = [
  {
    title: 'Private West Beach',
    icon: Waves,
    image: cld('v1770210269/572738803_817665804506698_7387560200045857839_n_uofzhs.jpg', 'f_auto,q_auto,w_1600'),
  },
  {
    title: 'Wooden Cottages',
    icon: Sunset,
    image: cld('v1770210197/619397337_889079880698623_598201687456560402_n_jizaup.jpg'),
  },
  {
    title: 'Seafood BBQ',
    icon: UtensilsCrossed,
    image: cld('v1770210253/616231183_882220111384600_4095673891837948387_n_xifzlv.jpg'),
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


export const BOOKING_URL = 'https://wa.me/8801712097790';
export const openBooking = () => window.open(BOOKING_URL, '_blank', 'noopener');

// Resort photos on Cloudinary. The promo collage with baked-in text is left out on purpose.
export const PHOTO_PATHS = [
  'v1770210316/490695027_658827613723852_3180105066990256892_n_mvq3tm.jpg',
  'v1770210314/490299037_661672946772652_6917754502023880151_n_j2g5sx.jpg',
  'v1770210313/470265802_567929742813640_3986908786392581994_n_en6bwy.jpg',
  'v1770210312/488659378_9652615331513514_1207158668534091051_n_nhdn5y.jpg',
  'v1770210311/488204218_651172854489328_7838867764146526144_n_zr5bgu.jpg',
  'v1770210272/572039975_817667477839864_6507293766839302549_n_nyautn.jpg',
  'v1770210269/572738803_817665804506698_7387560200045857839_n_uofzhs.jpg',
  'v1770210266/612500669_871556589117619_8069417825920055219_n_yvzfh7.jpg',
  'v1770210257/612779072_871556415784303_6792620734759867195_n_z97fxb.jpg',
  'v1770210253/616231183_882220111384600_4095673891837948387_n_xifzlv.jpg',
  'v1770210224/617108022_886557274284217_8221465207005871057_n_wneeee.jpg',
  'v1770210219/617437235_886557144284230_2632703659645721925_n_jsawfi.jpg',
  'v1770210207/617588221_886557254284219_9078444656541115619_n_jokdis.jpg',
  'v1770210197/619397337_889079880698623_598201687456560402_n_jizaup.jpg',
  'v1770210192/622371407_889079964031948_1845903599249027941_n_asjfzw.jpg',
];

export const CONTACT_INFO = {
  address: "St. Martin Island, Western Beach, Dakhinpara",
  phone: "+880 1712-097790",
  email: "info@belavistaresort.com",
  mapsLink: "https://www.google.com/maps/place/Bela+Vista+-+Saint+Martin's+Island/@20.6041804,92.324494,1414m/data=!3m1!1e3!4m9!3m8!1s0x30ae237101e5bb9f:0x633298a5f41b4100!5m2!4m1!1i2!8m2!3d20.604477!4d92.32687!16s%2Fg%2F11sckhkqht?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
};