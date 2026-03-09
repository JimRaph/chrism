'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { FaGasPump, FaFire, FaCheckCircle, FaTruck, FaMapMarkerAlt, FaFlask } from 'react-icons/fa';
import GasCalculator from '@/components/oil-gas/GasCalculator';

export default function OilGasPage() {
  const introRef = useRef(null);
  const operationsRef = useRef(null);
  const stationRef = useRef(null);
  const lpgRef = useRef(null);

  const introInView = useInView(introRef, { once: true, margin: '-100px' });
  const operationsInView = useInView(operationsRef, { once: true, margin: '-100px' });
  const stationInView = useInView(stationRef, { once: true, margin: '-100px' });
  const lpgInView = useInView(lpgRef, { once: true, margin: '-100px' });

  return (
    <div className="pt-28">
      {/* hero section */}
      <section className="relative py-20 lg:py-28 bg-slate-deep overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=2071')` }}
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-deep via-slate-deep/80 to-slate-deep/40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center space-x-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider">
                Downstream Operations
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 ">
              Fueing the Nation with <br/><span className="text-gradient">Quality Energy</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              At Chrism Group, we are committed to providing clean, affordable energy solutions. 
              We specialize in the transportation, storage, marketing, sales, and distribution 
              of refined petroleum products including PMS, AGO, DPK, and LPG.
            </p>
          </motion.div>
        </div>
      </section>

      {/* services section  */}
      <section ref={introRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: FaGasPump, title: 'Retail Distribution', desc: 'Direct sales of PMS, AGO, and DPK via our modern filling stations.' },
              { icon: FaFire, title: 'LPG Solutions', desc: 'Safe and efficient cooking gas distribution for homes and businesses.' },
              { icon: FaTruck, title: 'Bulk Supply', desc: 'Reliable logistics for industrial and commercial bulk fuel delivery.' },
              { icon: FaFlask, title: 'Quality Assurance', desc: 'Strict adherence to NMDPRA safety and quality standards.' },
            ].map((item, index) => (
              <div 
                key={item.title}
                className="p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-deep mb-2 ">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

            {/* retail outlet  */}
      <section id="station" ref={stationRef} className="py-20 lg:py-28 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={stationInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary font-semibold uppercase tracking-wider text-sm">
                Retail Outlets
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-deep mt-2 mb-6">
                Modern Filling Station <br /> Infrastructure
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our flagship filling station is designed for efficiency and customer comfort. 
                Equipped with modern digital pumps, we ensure accurate dispensing and quick turnaround time. 
                We consistently stock Premium Motor Spirit (PMS), Automotive Gas Oil (AGO), and Dual Purpose Kerosene (DPK).
              </p>
              
              <ul className="space-y-4">
                {[
                  'High-speed digital pumps for faster service',
                  'Guaranteed product quality and quantity',
                  ' Spacious forecourt for easy maneuvering',
                  '24/7 security and safety systems'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <FaCheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={stationInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
             className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-4/3">
                <Image
                  src="/chrism.jpeg"
                  alt="Chrism Filling Station"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden sm:block">
                <div className="flex items-center space-x-3 mb-2">
                  <FaMapMarkerAlt className="text-primary" />
                  <span className="font-bold text-slate-deep">Review Standby</span>
                </div>
                <p className="text-sm text-gray-500">
                  Always ready to serve you with a smile and professional support.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

                {/* cooking gas  */}
      <section id="lpg" ref={lpgRef} className="py-20 lg:py-28 bg-slate-deep text-white relative active border-b border-b-orange-500">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={lpgInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <FaFire className="w-6 h-6 text-primary" />
                </div>
                <span className="text-primary font-semibold uppercase tracking-wider text-sm">
                  LPG Cooking Gas
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Clean, Efficient & Affordable <br /> Cooking Energy
              </h2>
              <p className="text-gray-300 leading-relaxed mb-8">
                Chrism Oil operates multiple LPG plants ensuring a steady supply of cooking gas 
                to households and businesses. Our modern refilling plants guarantee safety, 
                accuracy, and speed.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h4 className="font-bold text-lg mb-2">Plant Location 1</h4>
                  <p className="text-gray-400 text-sm">Serving the heart of the city with quick refills and cylinder exchanges.</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h4 className="font-bold text-lg mb-2">Plant Location 2</h4>
                  <p className="text-gray-400 text-sm">Strategically located for industrial and bulk supply access.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={lpgInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 w-full"
            >
              <GasCalculator />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
