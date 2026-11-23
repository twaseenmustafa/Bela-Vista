import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, openBooking as book } from '../constants';
import Button from './Button';
import Magnetic from './Magnetic';


interface NavbarProps {
  currentView?: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentView = 'home' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 50);
      // Out of the way while reading down, back as soon as the visitor scrolls up.
      if (Math.abs(y - last) > 6) { setHidden(y > last && y > 400); last = y; }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLightPage = currentView === 'experience';

  const navBackground = isScrolled 
    ? 'bg-white/90 backdrop-blur-md shadow-sm' 
    : 'bg-transparent';

  const textColor = (isScrolled || isLightPage) ? 'text-navy' : 'text-white';

  const handleNavigation = (view: string) => {
    const event = new CustomEvent('app-navigate', { detail: { view } });
    window.dispatchEvent(event);
  };

  const triggerScroll = (targetId?: string) => {
     const event = new CustomEvent('lenis-scroll', { detail: { targetId } });
     window.dispatchEvent(event);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    // Handle Views
    if (href === '#gallery') {
        if (currentView !== 'gallery') handleNavigation('gallery');
        return;
    }
    if (href === '#experience') {
        if (currentView !== 'experience') handleNavigation('experience');
        return;
    }
    if (href === '#rooms') {
        if (currentView !== 'rooms') handleNavigation('rooms');
        return;
    }

    // Handle Anchors on Home
    if (currentView !== 'home') {
        handleNavigation('home');
        setTimeout(() => {
            const id = href.replace('#', '');
            triggerScroll(id);
        }, 100);
    } else {
        const id = href.replace('#', '');
        triggerScroll(id);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (currentView !== 'home') {
          handleNavigation('home');
      } else {
          triggerScroll(); // Top
      }
  };

  return (
    <nav className={`fixed top-0 w-full z-[60] transition-[transform,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${hidden && !isMobileMenuOpen ? '-translate-y-full' : ''} ${navBackground}`}>
      <div className="container mx-auto px-6 h-24 flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex-1 flex justify-start items-center">
          <a 
            href="/" 
            onClick={handleLogoClick}
            className={`font-serif text-2xl tracking-widest font-semibold whitespace-nowrap ${textColor} transition-colors duration-300 -ml-3 leading-none pb-1`}
          >
            Bela Vista
          </a>
        </div>

        {/* Center: Desktop Links */}
        <div className="hidden md:flex flex-1 items-center justify-center space-x-12 shrink-0">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-xs uppercase tracking-[0.2em] font-medium hover:text-gold transition-colors duration-300 ${textColor}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right: CTA (Custom 3D Button) */}
        <div className="hidden md:flex flex-1 justify-end items-center">
            {/* Custom 3D Button Implementation */}
            <Magnetic>
              <button
                onClick={book}
                className="bg-gold text-navy px-6 py-3 rounded-full font-sans text-sm font-semibold hover:bg-white active:scale-[0.97] transition-[background-color,transform] shadow-[0_8px_24px_-8px_rgba(212,175,55,0.6)]"
              >
                Book now
              </button>
            </Magnetic>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden flex-1 justify-end items-center">
          <button 
            className={`${textColor} transition-colors duration-300`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl py-8 px-6 flex flex-col space-y-6 md:hidden">
           {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-navy text-center uppercase tracking-widest text-sm font-medium"
              onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  handleNavClick(e, link.href);
              }}
            >
              {link.name}
            </a>
          ))}
          <div className="flex justify-center">
             <Button onClick={() => { setIsMobileMenuOpen(false); book(); }}>Book now</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;