'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { FaShip, FaUsers, FaAnchor, FaUserGraduate, FaCompass, FaCheck } from 'react-icons/fa';
import Link from 'next/link';

export default function MaritimePage() {
  const shipsRef = useRef(null);
  const trainingRef = useRef(null);
  
  const shipsInView = useInView(shipsRef, { once: true, margin: '-100px' });
  const trainingInView = useInView(trainingRef, { once: true, margin: '-100px' });

  return (
    <div className="pt-28">
      {/*hero */}
      <section className="relative py-20 lg:py-28 bg-slate-deep overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1559765239-0155b111116c?q=80&w=2072')` }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-slate-deep via-slate-deep/60 to-slate-deep" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-500/20 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-blue-500/30">
              <FaAnchor className="text-blue-400 w-4 h-4" />
              <span className="text-blue-100 text-xs font-bold uppercase tracking-wider">
                Maritime Services Division
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Navigating the Future of <br/><span className="text-blue-400">Maritime Operations</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Chrism Shipping Services Limited delivers world-class vessel management and 
              cadet training programs, setting new standards for safety and operational excellence 
              in the West African maritime sector.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ship section */}
      <section id="ships" ref={shipsRef} className="py-20 lg:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* images  */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={shipsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl aspect-4/3">
                <Image
                  src="https://images.unsplash.com/photo-1585713181935-d5f622cc2415?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hpcHxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Oil Tanker Vessel"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -z-10 top-12 -left-12 w-full h-full border-2 border-primary rounded-2xl hidden lg:block" />
              
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-blue-600 rounded-2xl p-6 flex-col justify-center text-white shadow-xl z-20 hidden sm:flex">
                <FaShip className="w-10 h-10 mb-4 opacity-80" />
                <span className="text-3xl font-bold ">IMO</span>
                <span className="text-sm opacity-80">Compliant Vessels</span>
              </div>
            </motion.div>

            {/* shipping details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={shipsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-deep mb-6 ">
                Ship Management & <br /> Vessel Operations
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                At Chrism Shipping Services Limited, we are proud to be a trusted name in the maritime industry. 
                We specialize in the ownership and operation of modern oil tanker vessels tailored 
                for the safe transport of refined petroleum products.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our fleet meets rigorous international standards for safety, environmental protection, 
                and efficiency. Our ship is maintained by a dedicated crew and supported by a shore-based 
                management team that ensures seamless logistics, technical oversight, and regulatory compliance.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Whether transporting crude oil or refined products, our vessel is equipped to handle complex voyages 
                with precision and care. We prioritise preventive maintenance, crew welfare, and continuous improvement 
                to ensure optimal performance on every journey.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Modern Oil Tanker Fleet',
                  'International Safety Standards',
                  'Experienced Crew & Management',
                  'Environmental Compliance'
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <FaCheck className="text-green-500 shrink-0" />
                    <span className="text-sm font-medium text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* cadet section */}
      <section id="training" ref={trainingRef} className="py-20 lg:py-28 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={trainingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                <FaUserGraduate className="w-6 h-6" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-deep mb-4">
              Sea Service Training Program
            </h2>
            <p className="text-gray-600">
              At Chrism Shipping Services Limited, we believe that hands-on experience is the cornerstone of maritime education. 
              That’s why we offer a structured cadetship training program onboard our managed vessel for aspiring officers who 
              are ready to invest in their future. This premium service promises to eliminate the struggle Nigerian Maritime Cadets 
              face while searching for cadetship placement onboard foreign-flagged vessel. We are pioneers and promise to continue 
              to provide the leading light to future maritime professionals.
            </p>
            <p className="text-gray-500 mt-10">
              This program is open to cadets who are willing to pay for sea time and are committed to gaining practical experience 
              in a professional environment. We provide a safe and supportive platform for learning, growth, and career advancement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
            
            {/* features */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={trainingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 h-full"
            >
              <h3 className="text-xl font-bold text-slate-deep mb-6 flex items-center">
                 <span className="w-1.5 h-8 bg-blue-500 rounded-full mr-4"></span>
                 Key Features of Our Cadetship Training Program
              </h3>
              <ul className="space-y-4">
                {[
                  'Sea time opportunities for deck and engine cadets',
                  'Supervised training under licensed officers',
                  'Exposure to real-time operations, safety drills, and watch-keeping',
                  'Performance evaluations and mentorship',
                  'Certificate of sea service upon completion'
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-3 group">
                    <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                      <FaCheck className="text-green-500 w-3 h-3" />
                    </div>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* why us section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={trainingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 h-full"
            >
              <h3 className="text-xl font-bold text-slate-deep mb-6 flex items-center">
                 <span className="w-1.5 h-8 bg-primary rounded-full mr-4"></span>
                 Why Choose Us?
              </h3>
              <ul className="space-y-4">
                {[
                  { title: 'Proven Track Record', desc: 'Years of successful voyages and satisfied clients' },
                  { title: 'Professional Crew', desc: 'Experienced mariners and certified trainers' },
                  { title: 'Transparent Process', desc: 'Clear terms, structured training, and documented sea service' },
                  { title: 'Career Support', desc: 'Guidance for licensing, job placement, and further education' }
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    <div>
                      <span className="font-bold text-gray-800 block mb-0.5">{item.title}</span>
                      <span className="text-gray-600 text-sm">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={trainingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12 max-w-4xl mx-auto bg-blue-50 p-8 rounded-2xl border border-blue-100"
          >
             <p className="text-lg sm:text-xl text-slate-deep font-medium leading-relaxed">
                <span className="text-blue-600 font-bold block mb-2">Are you a cadet looking to build your career at sea?</span>
                Chrism Shipping Services Limited offers the opportunity you need to scale your maritime career.
             </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={trainingInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-center"
          >
            <Link
              href="/contact?subject=Cadet Application"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-slate-deep text-white rounded-xl font-bold hover:bg-slate-medium transition-colors shadow-lg"
            >
              <span>Apply for Training</span>
              <FaUserGraduate className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
