<a href="https://bela-vista-pied.vercel.app">
  <img src="docs/social-preview.jpg" alt="Bela Vista: Where the Horizon Begins" width="100%" />
</a>

<h1 align="center">Bela Vista</h1>

<p align="center">
  <b>Wooden cottages on the quiet West Beach of Saint Martin's Island, Bangladesh.</b><br/>
  Sunset from your balcony. Candlelit dinners on the sand. The sound of the Bay of Bengal all night.
</p>

<p align="center">
  <a href="https://bela-vista-pied.vercel.app"><b>Visit the website →</b></a>
</p>

---

## Before you open it

Put sound on, give it a moment, and scroll slowly.

The site is built to feel like arriving on the island: a short welcome, then the beach at full screen, then each part of the stay rising in as you go. It is meant to be scrolled, not skimmed. Two minutes is enough to know if this is your kind of place.

**What you'll find inside**

| | |
|---|---|
| **The beach** | Full-screen video of the West Beach, the quieter, sunset side of the island |
| **The cottages** | Two-storey wooden rooms with sea views, prices and what's included |
| **The evenings** | Seafood BBQ and candlelit dinners on the sand |
| **Guest stories** | What people say after they've stayed |
| **The gallery** | Every corner of the resort, day and night |

Booking is one tap away on every page: it opens WhatsApp, and a real person answers.

---

## For developers

**Stack:** React 18 · Vite · Tailwind CSS · Framer Motion · GSAP · Lenis (smooth scroll). Hosted on Vercel; every push to `main` deploys.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build in dist/
```

### Structure

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
public/
  og-image.jpg          link preview image (1200×630)
docs/
  social-preview.jpg    GitHub social preview + this banner (1280×640)
```

### Notes

- Pages are addressed by hash: `#/experience`, `#/rooms`, `#/gallery`; home has none.
- All booking buttons open WhatsApp via `BOOKING_URL` in `src/constants.ts`.
- Photos and videos come from Cloudinary with size and quality transforms. The shared photo list is `PHOTO_PATHS` in `src/constants.ts`.
- Built files in `/assets` are cached for a year (`vercel.json`); their names change on every build.
- Motion respects the visitor's "reduce motion" system setting.
