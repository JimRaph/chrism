'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaEye, FaBullseye, FaHeart, FaHandshake, FaLeaf, FaShieldAlt } from 'react-icons/fa';

const values = [
  {
    icon: FaEye,
    title: 'Our Vision',
    description: 'To be the leading energy and maritime solutions provider in Nigeria, recognized for excellence, innovation, and sustainable practices.',
    color: 'from-[var(--color-primary)] to-[var(--color-primary-dark)]',
  },
  {
    icon: FaBullseye,
    title: 'Our Mission',
    description: 'Delivering high-quality petroleum products and maritime services while adhering to the highest safety and environmental standards.',
    color: 'from-[var(--color-secondary)] to-[var(--color-secondary-dark)]',
  },
  {
    icon: FaHeart,
    title: 'Our Values',
    description: 'Integrity, Safety, Excellence, Customer Focus, and Environmental Stewardship guide everything we do at Chrism Oil.',
    color: 'from-[var(--color-primary)] to-[var(--color-secondary)]',
  },
];

const coreValues = [
  { icon: FaShieldAlt, name: 'Safety First', description: 'Uncompromising commitment to safety in all operations' },
  { icon: FaHandshake, name: 'Integrity', description: 'Honest and transparent business practices' },
  { icon: FaLeaf, name: 'Sustainability', description: 'Environmental responsibility in every decision' },
];

export default function VisionMissionValues() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-off-white relative overflow-hidden">
 
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/*  header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Who We Are
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-deep mt-2 ">
            Driving Nigeria&apos;s <span className="text-gradient">Energy Future</span>
          </h2>
        </motion.div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {values.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden card-hover"
            >
     
              <div className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${item.color}`} />
              
              <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-xl font-bold text-slate-deep mb-3 ">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>

              <div className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            </motion.div>
          ))}
        </div>


        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-slate-deep rounded-2xl p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div key={value.name} className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">{value.name}</h4>
                  <p className="text-gray-400 text-sm">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
