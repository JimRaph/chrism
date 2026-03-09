import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Oil & Gas Services', href: '/oil-gas' },
  { name: 'Maritime Services', href: '/maritime' },
  { name: 'Contact Us', href: '/contact' },
];

const services = [
  { name: 'Filling Station', href: '/oil-gas#station' },
  { name: 'LPG Cooking Gas', href: '/oil-gas#lpg' },
  { name: 'Ship Management', href: '/maritime#ships' },
  { name: 'Cadet Training', href: '/maritime#training' },
];

const socialLinks = [
  { name: 'Facebook', icon: FaFacebook, href: '#' },
  { name: 'Twitter', icon: FaTwitter, href: '#' },
  { name: 'Instagram', icon: FaInstagram, href: '#' },
  { name: 'LinkedIn', icon: FaLinkedin, href: '#' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-deep text-white">
      
      {/* footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* company info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
             <img src="/ink.svg" alt="" className='w-10 h-10 md:w-18 md:h-16 ' />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              A leading multi-sector company in Nigeria&apos;s downstream oil & gas industry and maritime services, 
              delivering excellence across filling stations, LPG distribution, and vessel operations.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* quick links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* services section */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">
              Our Services
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-gray-400 hover:text-primary transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* contact info section */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="w-4 h-4 text-primary mt-1 shrink-0" />
                <span className="text-gray-400 text-sm">
                  Chrism Oil Filling Station,<br />
                  Akwa Ibom State, Nigeria
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="tel:+2348012345678"
                  className="text-gray-400 hover:text-primary transition-colors text-sm"
                >
                  +234 801 234 5678
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="mailto:info@chrismoil.com"
                  className="text-gray-400 hover:text-primary transition-colors text-sm"
                >
                  info@chrismoil.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* bar at bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {currentYear} Chrism Oil Nig Ltd. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <span>|</span>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
