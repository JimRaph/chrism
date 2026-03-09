'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FaOilCan, FaShip } from 'react-icons/fa';

import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Oil & Gas', href: '/oil-gas', icon: FaOilCan },
  { name: 'Maritime', href: '/maritime', icon: FaShip },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { isAdmin } = useAuth();

  const isAdminPage = pathname.startsWith('/command-center');
  if (isAdminPage) return null;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-8 left-0 right-0 z-40 transition-all duration-300 mb-2 border-b-primary border-b-2 ${
        scrolled
          ? 'bg-slate-deep/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* llogo */}
          <Link href="/" className="flex items-center space-x-2 group">
            {/* <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-lg md:text-xl font-[var(--font-heading)]">C</span>
            </div>
            <div className="hidden sm:block">
              <span className={`${
                pathname === '/' ? 'text-white' : 'text-[var(--color-primary)]'
                } text-lg md:text-xl font-[var(--font-heading)] tracking-wide transition-colors duration-300`}>
                CHRISM
              </span>
              <span className="text-[var(--color-primary)] text-lg md:text-xl font-[var(--font-heading)]">
                {' '}OIL
              </span>
            </div> */}
            <img src="/ink.svg" alt="" className='w-10 h-10 md:w-18 md:h-16 ' />
          </Link>

          {/* nav links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 ${pathname === '/' || pathname === '/command-center/login' ? 'text-white' : ''} rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    isActive
                      ? 'bg-primary'
                      : `${ scrolled ?  'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-white hover:bg-slate-deep/95'}`
                  }`}
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  <span>{link.name}</span>
                </Link>
              );
            })}
            
            {isAdmin && (
              <Link
                href="/command-center"
                className="ml-4 px-5 py-2 bg-linear-to-r from-primary to-secondary text-white rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-(--color-primary)/30 transition-all duration-200 transform hover:scale-105"
              >
                Admin Portal
              </Link>
            )}
          </div>

          {/* button for mobile  */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              pathname === '/' ? 'text-white' : 'text-primary'
            } hover:bg-white/10`}
            aria-label="Toggle menu"
          >
            {isOpen ? <HiX className="w-6 h-6" /> : <HiMenuAlt3 className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-slate-deep/98 backdrop-blur-md border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.icon && <link.icon className="w-5 h-5" />}
                    <span>{link.name}</span>
                  </Link>
                );
              })}
              
              {isAdmin && (
                <Link
                  href="/command-center"
                  className="flex items-center justify-center w-full mt-4 px-5 py-3 bg-linear-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Admin Portal
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
