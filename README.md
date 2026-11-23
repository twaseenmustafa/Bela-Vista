# Bela Vista Resort

Website for Bela Vista, a resort of wooden cottages on the West Beach of Saint Martin's Island, Bangladesh.

Live: https://bela-vista-pied.vercel.app

## Run locally

Needs Node.js 18+.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build in dist/
```

## Structure

```
src/
  main.tsx              entry: mounts <App />
  App.tsx               smooth scroll, hash routing, page switch
  constants.ts          content: nav, features, reviews, photos, booking link
  components/
    layout/             Navbar
    home/               landing page sections, in page order
    ui/                 shared pieces: Button, Parallax, Magnetic, Eyebrow
  pages/
    Experience.tsx      #/experience
    Rooms.tsx           #/rooms
    Gallery.tsx         #/gallery
```

Stack: React 18, Vite, Tailwind CSS, Framer Motion, GSAP, Lenis.

## Notes

- Pages are addressed by hash: `#/experience`, `#/rooms`, `#/gallery` (home has no hash).
- All booking buttons open WhatsApp (`BOOKING_URL` in `constants.ts`).
- Photos and videos come from Cloudinary with size and quality transforms. The shared photo list is `PHOTO_PATHS` in `constants.ts`.
