'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const partners = [
  { name: 'NNPC', logo: '/partners/nnpc.png' },
  { name: 'NMDPRA', logo: '/partners/nmdpra.png' },
  { name: 'DPR', logo: '/partners/dpr.png' },
  { name: 'NIMASA', logo: '/partners/nimasa.png' },
  { name: 'NPA', logo: '/partners/npa.png' },
  { name: 'PPPRA', logo: '/partners/pppra.png' },
];

export default function Partners() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-16 lg:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* partner section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Trusted By Industry Leaders
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-deep mt-2">
            Our Partners & Affiliations
          </h2>
        </motion.div>

        {/* partners logo scroll */}
        <div className="relative overflow-hidden">
          {/* gradient overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-orange-500/80 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-white to-transparent z-10" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center"
          >
            <motion.div
              className="flex items-center space-x-16"
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                x: {
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                },
              }}
            >
              {/* logos scrolling */}
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="shrink-0 w-32 h-20 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                >
                  <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center p-4">
                    <span className="text-slate-deep font-bold text-sm text-center">
                      {partner.name}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* numbers section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8 text-center"
        >
          <div className="px-6">
            <p className="text-3xl font-bold text-primary ">100%</p>
            <p className="text-sm text-gray-500">Regulatory Compliant</p>
          </div>
          <div className="w-px h-12 bg-gray-200 hidden sm:block" />
          <div className="px-6">
            <p className="text-3xl font-bold text-primary ">ISO</p>
            <p className="text-sm text-gray-500">Certified Operations</p>
          </div>
          <div className="w-px h-12 bg-gray-200 hidden sm:block" />
          <div className="px-6">
            <p className="text-3xl font-bold text-primary ">24/7</p>
            <p className="text-sm text-gray-500">Operational Excellence</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
