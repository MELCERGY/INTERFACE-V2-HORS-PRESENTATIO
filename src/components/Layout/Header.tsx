import React, { useState, useRef, useEffect } from 'react';
import { User, Menu } from 'lucide-react';

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-[#0053A0] border-b border-[#0076C8] sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Container */}
          <div className="flex items-center">
            <div className="flex flex-col items-start">
              <div className="text-white flex items-center">
                <span className="text-2xl md:text-3xl font-bold">b</span>
                <div className="relative">
                  <span className="text-2xl md:text-3xl font-bold">c</span>
                  <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 md:w-1.5 md:h-1.5 bg-[#FFB800] rounded-full" />
                </div>
                <span className="text-2xl md:text-3xl font-bold">a</span>
              </div>
              <span className="text-white text-xs md:text-sm font-medium mt-[-2px]">expertise</span>
            </div>
          </div>

          {/* Center Navigation - Hidden on mobile */}
          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-12">
            <a href="/accueil" className="text-white/80 hover:text-white font-medium text-xs tracking-wider transition-colors">
              ACCUEIL
            </a>
            <a href="/implantations" className="text-white/80 hover:text-white font-medium text-xs tracking-wider transition-colors">
              NOS IMPLANTATIONS
            </a>
            <a href="/creation-mission" className="text-white/80 hover:text-white font-medium text-xs tracking-wider transition-colors">
              CRÉATION MISSION
            </a>
            <a 
              href="chrome-extension://efaidnbmnnnibpcajpcglclefindmkaj/https://www.bca.fr/wp-content/uploads/2024/06/BCA-Expertise_Notice-dutilisation-BCA-Connect-Espace-Client_compressed.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white font-medium text-xs tracking-wider transition-colors"
            >
              AIDE EN LIGNE
            </a>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={20} />
          </button>

          {/* User section */}
          <div className="hidden lg:flex items-center" ref={dropdownRef}>
            <div className="relative">
              <button 
                className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-white/10 transition-colors"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="bg-white text-[#0053A0] p-1 rounded-full">
                  <User size={14} />
                </div>
                <span className="hidden xl:inline-block font-medium text-xs tracking-wider text-white">Jean Dupont</span>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-200">
                  <a 
                    href="/mon-compte" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Mon compte
                  </a>
                  <a 
                    href="/modifier-mot-de-passe" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Modification mot de passe
                  </a>
                  <hr className="my-1 border-gray-200" />
                  <a 
                    href="/deconnexion" 
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Déconnexion
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/20 py-4">
            <div className="flex flex-col space-y-3">
              <a href="/accueil" className="text-white/80 hover:text-white font-medium text-sm py-2">
                ACCUEIL
              </a>
              <a href="/implantations" className="text-white/80 hover:text-white font-medium text-sm py-2">
                NOS IMPLANTATIONS
              </a>
              <a href="/creation-mission" className="text-white/80 hover:text-white font-medium text-sm py-2">
                CRÉATION MISSION
              </a>
              <a 
                href="chrome-extension://efaidnbmnnnibpcajpcglclefindmkaj/https://www.bca.fr/wp-content/uploads/2024/06/BCA-Expertise_Notice-dutilisation-BCA-Connect-Espace-Client_compressed.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white font-medium text-sm py-2"
              >
                AIDE EN LIGNE
              </a>
              <div className="border-t border-white/20 pt-3 mt-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-white text-[#0053A0] p-2 rounded-full">
                    <User size={16} />
                  </div>
                  <span className="text-white font-medium text-sm">Jean Dupont</span>
                </div>
                <div className="mt-3 space-y-2">
                  <a href="/mon-compte" className="block text-white/80 hover:text-white text-sm py-1">
                    Mon compte
                  </a>
                  <a href="/modifier-mot-de-passe" className="block text-white/80 hover:text-white text-sm py-1">
                    Modification mot de passe
                  </a>
                  <a href="/deconnexion" className="block text-red-300 hover:text-red-200 text-sm py-1">
                    Déconnexion
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;