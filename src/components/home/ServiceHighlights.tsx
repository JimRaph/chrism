'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { FaGasPump, FaFire, FaShip, FaUserGraduate, FaArrowRight } from 'react-icons/fa';

const services = [
  {
    category: 'Oil & Gas',
    icon: FaGasPump,
    title: 'Filling Station',
    description: 'Premium quality petroleum products including PMS, AGO, and DPK with accurate pump calibration and efficient service.',
    image: '/promo pic 03.avif',
    link: '/oil-gas#station',
    color: 'var(--color-primary)',
  },
  {
    category: 'Oil & Gas',
    icon: FaFire,
    title: 'LPG Cooking Gas',
    description: 'Safe and affordable LPG distribution across two strategic plant locations with various cylinder sizes.',
    image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=2071',
    link: '/oil-gas#lpg',
    color: 'var(--color-secondary)',
  },
  {
    category: 'Maritime',
    icon: FaShip,
    title: 'Ship Management',
    description: 'Modern oil tanker vessels meeting international standards for safety, environmental compliance, and operational excellence.',
    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2070',
    link: '/maritime#ships',
    color: 'var(--color-primary)',
  },
  {
    category: 'Maritime',
    icon: FaUserGraduate,
    title: 'Cadet Training',
    description: 'Structured cadetship training program offering sea time opportunities, supervised training, and performance evaluations.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070',
    link: '/maritime#training',
    color: 'var(--color-secondary)',
  },
];

export default function ServiceHighlights() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-slate-deep relative overflow-hidden">
      
      {/* background pattern*/}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* header text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2 ">
            Our <span className="text-gradient">Premium Services</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            From downstream petroleum operations to comprehensive maritime solutions, 
            we deliver excellence across every sector we operate in.
          </p>
        </motion.div>

        {/*services cards */}
        <div className="space-y-12 lg:space-y-20">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-12`}
              >
                {/* image */}
                <div className="w-full lg:w-1/2 relative group">
                  <div className="relative overflow-hidden rounded-2xl aspect-4/3">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
                      style={{ backgroundImage: `url('${service.image}')` }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-deep/80 via-transparent to-transparent" />
                    
                    {/* sector badge */}
                    <div className="absolute top-4 left-4">
                      <span 
                        className="px-4 py-1.5 rounded-full text-white text-sm font-medium"
                        style={{ backgroundColor: service.color }}
                      >
                        {service.category}
                      </span>
                    </div>
                  </div>

                  {/* decoration item */}
                  <div 
                    className={`absolute -z-10 ${isEven ? '-right-4 -bottom-4' : '-left-4 -bottom-4'} w-full h-full rounded-2xl border-2`}
                    style={{ borderColor: service.color }}
                  />
                </div>

                {/* content */}
                <div className={`w-full lg:w-1/2 ${isEven ? 'lg:pl-4' : 'lg:pr-4'}`}>
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${service.color}20` }}
                  >
                    <service.icon className="w-7 h-7" style={{ color: service.color }} />
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 ">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <Link
                    href={service.link}
                    className="inline-flex items-center space-x-2 text-white font-semibold group/link"
                  >
                    <span style={{ color: service.color }}>Learn More</span>
                    <FaArrowRight 
                      className="w-4 h-4 group-hover/link:translate-x-2 transition-transform"
                      style={{ color: service.color }}
                    />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
