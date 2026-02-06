import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import { CONTACT_INFO, NAV_LINKS } from '../constants';
import Lottie from 'lottie-react';
import { whatsappAnimation } from './whatsappAnimationData';

const Footer: React.FC = () => {
  const handleNavigation = (view: string) => {
    const event = new CustomEvent('app-navigate', { detail: { view } });
    window.dispatchEvent(event);
  };

  const triggerScroll = (targetId?: string) => {
     const event = new CustomEvent('lenis-scroll', { detail: { targetId } });
     window.dispatchEvent(event);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    // Handle special pages
    if (href === '#gallery') {
        handleNavigation('gallery');
        return;
    }
    if (href === '#experience') {
        handleNavigation('experience');
        return;
    }
    if (href === '#rooms') {
        handleNavigation('rooms');
        return;
    }

    // Handle Home Anchor links
    if (href.startsWith('#')) {
        handleNavigation('home');
        setTimeout(() => {
            const id = href.replace('#', '');
            triggerScroll(id);
        }, 100);
    }
  };

  return (
    <footer className="bg-navy text-white pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="md:col-span-1">
                <a 
                    href="/" 
                    onClick={(e) => { e.preventDefault(); handleNavigation('home'); }}
                    className="font-serif text-2xl tracking-widest font-semibold text-white block mb-6"
                >
                    Bela Vista
                </a>
                <p className="text-gray-400 text-sm font-sans leading-relaxed">
                    A secluded haven on the West Beach of Saint Martin's Island. Experience the finest wooden cottages and the most breathtaking sunsets in Bangladesh.
                </p>
            </div>

            {/* Links */}
            <div>
                <h4 className="font-serif text-lg mb-6 text-gold">Explore</h4>
                <ul className="space-y-4">
                    {NAV_LINKS.map(link => (
                        <li key={link.name}>
                            <a 
                                href={link.href} 
                                onClick={(e) => handleLinkClick(e, link.href)}
                                className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wide cursor-pointer"
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Contact */}
            <div>
                <h4 className="font-serif text-lg mb-6 text-gold">Contact</h4>
                <div className="space-y-4 text-gray-400 text-sm font-sans">
                    <a 
                        href={CONTACT_INFO.mapsLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-start space-x-3 hover:text-white transition-colors group"
                    >
                        <MapPin size={16} className="mt-1 text-gold group-hover:scale-110 transition-transform" />
                        <span>{CONTACT_INFO.address}</span>
                    </a>
                    
                    <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center space-x-3 hover:text-white transition-colors group">
                        <Mail size={16} className="text-gold group-hover:scale-110 transition-transform" />
                        <span>{CONTACT_INFO.email}</span>
                    </a>
                    
                    <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center space-x-3 hover:text-white transition-colors group">
                        <Phone size={16} className="text-gold group-hover:scale-110 transition-transform" />
                        <span>{CONTACT_INFO.phone}</span>
                    </a>

                    {/* WhatsApp Button */}
                     <div className="pt-4">
                        <a 
                           href="https://wa.me/8801712097790" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="inline-flex items-center space-x-2 bg-[#25D366] text-white px-4 py-2 rounded-full hover:bg-[#20bd5a] transition-colors shadow-lg hover:shadow-xl"
                        >
                            <div className="w-6 h-6">
                                <Lottie animationData={whatsappAnimation} loop={true} />
                            </div>
                            <span className="font-sans font-semibold text-sm">Chat on WhatsApp</span>
                        </a>
                     </div>
                </div>
            </div>

            {/* Socials */}
            <div>
                <h4 className="font-serif text-lg mb-6 text-gold">Follow Us</h4>
                <div className="flex space-x-4">
                    {[Facebook, Instagram, Twitter].map((Icon, i) => (
                        <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold hover:bg-gold hover:text-navy transition-all duration-300">
                            <Icon size={18} />
                        </a>
                    ))}
                </div>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-sans">
            <p>&copy; {new Date().getFullYear()} Bela Vista Resort. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;