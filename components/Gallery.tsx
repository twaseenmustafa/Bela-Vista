import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GridMotion from './GridMotion';
import Button from './Button';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const driveIds = [
    '1Msph17u8X67HBc2Tt4KzUKe4hhipvTgh',
    '15QH4rUjFUZaMNT4yCY7aWDdRxwSR0eTP',
    '1ouCSl-IEH9ZSyiMgQFWaz9XtnR5b0aNj',
    '1udDuYpT1yU4nyWYu1ff2CqP4WhW1Sx0J',
    '1vNjXvfs3FZQm2Sbru6pxp7xOql-agqXL',
    '1X_gq21zgf7vjcxJTe9sLd8U-ipOsIwvH',
    '1cRCJdRbvfXCGLpzV-OCpVbBR6atCuGYQ',
    '1dVLoK2NARK3V0Pb271q20mhxpGPN0fT-',
    '156oCGH9s8YYMDqA5N_PyhIcqwjMRsSOi',
    '1g7dfM2BHNtK0Pb9wcjztVFxG-w_njR_M',
    '1mvDwqTS730HjTAoyblG4rvPm6JhsfSoN',
    '1UXcAv9Br9Iy_m2z878lZvY6dlZ7VRV2W',
    '1BPt7rLVcv_-jF96d4ulmR8jVqzhPXcGJ',
    '1qPq9DCLMaRg3ZqXm932m9KSdt9Gc_lf3',
    '1jGNsQtgQlhKBRWQc4gNzoPzMhA0kRJvA',
    '1_RfOIsu5kokqfioHtlhF2-L_9lRhWmCX'
  ];

  // Fix: Use thumbnail API for reliable loading
  const driveImages = driveIds.map(id => `https://drive.google.com/thumbnail?id=${id}&sz=w1000`);
  
  const newImages = [
    "https://res.cloudinary.com/dshsndiup/image/upload/v1770210316/490695027_658827613723852_3180105066990256892_n_mvq3tm.jpg",
    "https://res.cloudinary.com/dshsndiup/image/upload/v1770210314/490299037_661672946772652_6917754502023880151_n_j2g5sx.jpg",
    "https://res.cloudinary.com/dshsndiup/image/upload/v1770210313/470265802_567929742813640_3986908786392581994_n_en6bwy.jpg",
    "https://res.cloudinary.com/dshsndiup/image/upload/v1770210312/488659378_9652615331513514_1207158668534091051_n_nhdn5y.jpg",
    "https://res.cloudinary.com/dshsndiup/image/upload/v1770210311/488204218_651172854489328_7838867764146526144_n_zr5bgu.jpg",
    "https://res.cloudinary.com/dshsndiup/image/upload/v1770210272/572039975_817667477839864_6507293766839302549_n_nyautn.jpg",
    "https://res.cloudinary.com/dshsndiup/image/upload/v1770210272/571797021_817642561175689_5360640411154814931_n_pnblqd.jpg",
    "https://res.cloudinary.com/dshsndiup/image/upload/v1770210269/572738803_817665804506698_7387560200045857839_n_uofzhs.jpg",
    "https://res.cloudinary.com/dshsndiup/image/upload/v1770210266/612500669_871556589117619_8069417825920055219_n_yvzfh7.jpg",
    "https://res.cloudinary.com/dshsndiup/image/upload/v1770210257/612779072_871556415784303_6792620734759867195_n_z97fxb.jpg",
    "https://res.cloudinary.com/dshsndiup/image/upload/v1770210253/616231183_882220111384600_4095673891837948387_n_xifzlv.jpg",
    "https://res.cloudinary.com/dshsndiup/image/upload/v1770210224/617108022_886557274284217_8221465207005871057_n_wneeee.jpg",
    "https://res.cloudinary.com/dshsndiup/image/upload/v1770210219/617437235_886557144284230_2632703659645721925_n_jsawfi.jpg",
    "https://res.cloudinary.com/dshsndiup/image/upload/v1770210207/617588221_886557254284219_9078444656541115619_n_jokdis.jpg",
    "https://res.cloudinary.com/dshsndiup/image/upload/v1770210197/619397337_889079880698623_598201687456560402_n_jizaup.jpg",
    "https://res.cloudinary.com/dshsndiup/image/upload/v1770210192/622371407_889079964031948_1845903599249027941_n_asjfzw.jpg"
  ];

  // Interleave items
  const items: string[] = [];
  const maxLength = Math.max(driveImages.length, newImages.length);
  for (let i = 0; i < maxLength; i++) {
    if (i < newImages.length) items.push(newImages[i]);
    if (i < driveImages.length) items.push(driveImages[i]);
  }

  // Close modal on scroll
  useEffect(() => {
    if (selectedImage) {
      const handleScroll = () => {
        setSelectedImage(null);
      };
      
      // We use 'true' for capture to ensure we catch it early if possible, 
      // but standard passive listener is usually enough for window scroll.
      window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
      
      // Also listen to wheel events to catch start of scroll before visual update if possible
      window.addEventListener('wheel', handleScroll, { passive: true, capture: true });

      return () => {
        window.removeEventListener('scroll', handleScroll, { capture: true });
        window.removeEventListener('wheel', handleScroll, { capture: true });
      };
    }
  }, [selectedImage]);

  return (
    <section id="gallery" className="py-24 bg-navy relative overflow-hidden">
      {/* Background Gradient overlay handled by GridMotion */}
      
      <div className="container mx-auto px-6 relative z-10 pointer-events-none mb-8">
        <div className="flex flex-col md:flex-row justify-between items-end">
            <div>
                <span className="text-gold uppercase tracking-widest text-xs font-bold">Visual Story</span>
                <h2 className="font-serif text-3xl md:text-4xl text-white mt-4">Glimpses of Paradise</h2>
            </div>
            <div className="hidden md:block pointer-events-auto">
                <Button variant="outline">View All Photos</Button>
            </div>
        </div>
      </div>

      <div className="relative w-full">
         <GridMotion 
            items={items} 
            gradientColor="#0F172A" 
            onItemClick={(url) => setSelectedImage(url)}
         />
      </div>

      <div className="md:hidden mt-8 text-center relative z-10 pointer-events-auto">
          <Button variant="outline">View All Photos</Button>
      </div>

      {/* Interactive Picture Bubble */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
            {/* 
              Bubble Container
              - pointer-events-auto allows clicking inside if needed (though we just view)
              - We rely on window scroll listeners to close it, so we don't block background pointer events.
              - Size: 25vw is roughly 10% larger than the 22vw grid items.
            */}
            <motion.div
              initial={{ scale: 0, opacity: 0, borderRadius: "50%" }}
              animate={{ scale: 1, opacity: 1, borderRadius: "24px" }}
              exit={{ scale: 0, opacity: 0, borderRadius: "50%" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative overflow-hidden shadow-2xl bg-navy border-4 border-white/10 pointer-events-auto"
              style={{ 
                width: '25vw', 
                height: '25vw', 
                minWidth: '300px', 
                minHeight: '300px' 
              }}
            >
              <img 
                src={selectedImage} 
                alt="Gallery Preview" 
                className="w-full h-full object-cover"
              />
              
              {/* Optional gloss effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50 pointer-events-none"></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Gallery;