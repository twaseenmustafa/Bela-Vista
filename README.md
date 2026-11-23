# Bela Vista Resort

Website for Bela Vista, a resort of wooden cottages on the West Beach of Saint Martin's Island, Bangladesh.

Live: https://bela-vista-pied.vercel.app

## Run locally

Needs Node.js 18+.

```bash
npm install --legacy-peer-deps
npm run dev      # http://localhost:3000
npm run build    # production build in dist/
```

## Notes

- Pages are addressed by hash: `#/experience`, `#/rooms`, `#/gallery` (home has no hash).
- All booking buttons open WhatsApp (`BOOKING_URL` in `constants.ts`).
- Photos and videos come from Cloudinary with size and quality transforms. The shared photo list is `PHOTO_PATHS` in `constants.ts`.
