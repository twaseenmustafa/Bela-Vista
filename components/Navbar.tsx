import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import Button from './Button';

interface NavbarProps {
  currentView?: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentView = 'home' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
    <nav className={`fixed top-0 w-full z-[60] transition-all duration-500 ${navBackground}`}>
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
            <button 
                onClick={() => console.log('Book clicked')}
                className="group relative border-none bg-navy rounded-xl cursor-pointer outline-none font-bold text-sm"
            >
                <span className="block box-border border-2 border-navy rounded-xl px-6 py-2.5 bg-gold text-navy transform -translate-y-1 transition-transform duration-100 ease-out group-hover:-translate-y-1.5 group-active:translate-y-0 uppercase tracking-widest text-[11px] font-bold">
                    Book Now
                </span>
            </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden flex-1 justify-end items-center">
          <button 
            className={`${textColor} transition-colors duration-300`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
             <Button onClick={() => setIsMobileMenuOpen(false)}>Book Now</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;