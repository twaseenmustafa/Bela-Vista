import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, ArrowUp, ArrowUpRight, MessageCircle } from 'lucide-react';
import { BOOKING_URL, CONTACT_INFO, NAV_LINKS, cld } from '../../constants';
import Eyebrow from '../ui/Eyebrow';
import Magnetic from '../ui/Magnetic';
import { Parallax, ParallaxImage } from '../ui/Parallax';

const EASE = [0.22, 1, 0.36, 1] as const;
const STRIP = [
  'v1770210272/572039975_817667477839864_6507293766839302549_n_nyautn.jpg',
  'v1770210207/617588221_886557254284219_9078444656541115619_n_jokdis.jpg',
  'v1770210314/490299037_661672946772652_6917754502023880151_n_j2g5sx.jpg',
  'v1770210224/617108022_886557274284217_8221465207005871057_n_wneeee.jpg',
  'v1770210257/612779072_871556415784303_6792620734759867195_n_z97fxb.jpg',
].map(p => cld(p, 'f_auto,q_auto,w_480,h_600,c_fill'));

const navigate = (view: string) => window.dispatchEvent(new CustomEvent('app-navigate', { detail: { view } }));
const scrollTo = (targetId?: string) => window.dispatchEvent(new CustomEvent('lenis-scroll', { detail: { targetId } }));

const useIslandTime = () => {
  const fmt = () => new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Dhaka' }).format(new Date());
  const [t, setT] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return t;
};

const Footer: React.FC = () => {
  const time = useIslandTime();
  // The wordmark rises out of the floor as you reach the end of the page.
  const ref = React.useRef<HTMLElement>(null);
  const still = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const markY = useTransform(p, [0.4, 1], [still ? '12%' : '70%', '12%']);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const view = { '#gallery': 'gallery', '#experience': 'experience', '#rooms': 'rooms' }[href];
    if (view) return navigate(view);
    navigate('home');
    setTimeout(() => scrollTo(href.replace('#', '')), 100);
  };

  const label = 'text-sm text-white/50 mb-4';

  return (
    <footer ref={ref} className="relative z-40 -mt-[24vh] rounded-t-[40px] md:rounded-t-[56px] shadow-[0_-24px_60px_-12px_rgba(0,0,0,0.35)] bg-navy text-white overflow-hidden">
      <div className="container mx-auto px-6 pt-20 md:pt-28">
        {/* CTA */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div>
            <Parallax distance={50}><Eyebrow n="05" label="Stay with us" light /></Parallax>
            <Parallax distance={-15}>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.1, ease: EASE }}
              className="font-serif text-5xl md:text-8xl leading-[0.98] mt-6"
            >
              Your sunset<br />is <span className="text-gold">waiting</span>
            </motion.h2>
            </Parallax>
          </div>
          <div className="flex flex-wrap gap-3">
            <Magnetic>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold text-navy px-6 py-3 rounded-full font-sans text-sm font-semibold hover:bg-white active:scale-[0.97] transition-[background-color,transform]"
            >
              <MessageCircle size={18} />
              Book on WhatsApp
            </a>
            </Magnetic>
            <Magnetic>
            <a
              href={CONTACT_INFO.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/25 px-6 py-3 rounded-full font-sans text-sm font-semibold hover:border-gold hover:text-gold active:scale-[0.97] transition-[border-color,color,transform] group"
            >
              Directions <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            </Magnetic>
          </div>
        </div>

        {/* Visual strip */}
        <button onClick={() => navigate('gallery')} className="mt-16 grid grid-cols-3 md:grid-cols-5 gap-3 w-full" aria-label="Open gallery">
          {STRIP.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.07 }}
              className={`relative block aspect-[4/5] rounded-2xl overflow-hidden ${i > 2 ? 'hidden md:block' : ''}`}
            >
              <ParallaxImage src={s} alt="" loading="lazy" className="transition-[filter] duration-500 hover:brightness-110" />
            </motion.span>
          ))}
        </button>

        {/* Info */}
        <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-2 md:grid-cols-12 gap-10 font-sans text-sm">
          <div className="col-span-2 md:col-span-4">
            <p className={label}>Island time</p>
            <p className="font-serif text-5xl tabular-nums">{time}</p>
            <p className="text-white/50 text-xs mt-2">GMT+6 · Saint Martin's Island</p>
          </div>

          <div className="md:col-span-2">
            <p className={label}>Explore</p>
            <ul className="space-y-3">
              {NAV_LINKS.map(l => (
                <li key={l.name}>
                  <a href={l.href} onClick={e => handleLinkClick(e, l.href)} className="text-white/70 hover:text-gold bg-gradient-to-r from-gold to-gold bg-no-repeat bg-left-bottom bg-[length:0%_1px] hover:bg-[length:100%_1px] pb-0.5 transition-[color,background-size] duration-300">
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className={label}>Contact</p>
            <ul className="space-y-3 text-white/70">
              <li>
                <a href={CONTACT_INFO.mapsLink} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-gold transition-colors">
                  <MapPin size={16} className="text-gold mt-0.5 shrink-0" />{CONTACT_INFO.address}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_INFO.email}`} className="flex gap-3 hover:text-gold transition-colors">
                  <Mail size={16} className="text-gold shrink-0" />{CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT_INFO.phone.replace(/[\s-]/g, '')}`} className="flex gap-3 hover:text-gold transition-colors">
                  <Phone size={16} className="text-gold shrink-0" />{CONTACT_INFO.phone}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className={label}>Follow</p>
            <div className="flex gap-2">
              {[
                { Icon: Facebook, name: 'Facebook' },
                { Icon: Instagram, name: 'Instagram' },
                { Icon: Twitter, name: 'Twitter' },
              ].map(({ Icon, name }) => (
                <a key={name} href="#" aria-label={name} className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:bg-gold hover:border-gold hover:text-navy transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Wordmark */}
      <div className="mt-16 select-none pointer-events-none overflow-hidden" aria-hidden>
        <motion.p style={{ y: markY }} className="font-majestic whitespace-nowrap text-center leading-[0.75] text-[19vw] bg-gradient-to-b from-white/25 to-white/0 bg-clip-text text-transparent">
          Bela Vista
        </motion.p>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row gap-4 justify-between items-center text-xs text-white/50 font-sans">
          <p>© {new Date().getFullYear()} Bela Vista Resort</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <button onClick={() => scrollTo()} className="flex items-center gap-2 hover:text-gold transition-colors">
              Top <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
