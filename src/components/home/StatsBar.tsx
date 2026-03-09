'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { FaCalendarAlt, FaShip, FaUsers, FaGasPump } from 'react-icons/fa';

interface StatItemProps {
  icon: React.ElementType;
  endValue: number;
  suffix: string;
  label: string;
  delay: number;
  isInView: boolean;
}

function StatItem({ icon: Icon, endValue, suffix, label, delay, isInView }: StatItemProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, endValue, {
        duration: 2,
        delay: delay,
        ease: 'easeOut',
      });
      return controls.stop;
    }
  }, [isInView, count, endValue, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center group"
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
        <Icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
      </div>
      <div className="flex items-center justify-center text-4xl sm:text-5xl font-bold text-white mb-2">
        <motion.span>{rounded}</motion.span>
        <span className="text-primary">{suffix}</span>
      </div>
      <p className="text-gray-400 text-sm sm:text-base">{label}</p>
    </motion.div>
  );
}

const stats = [
  { icon: FaCalendarAlt, endValue: 15, suffix: '+', label: 'Years of Excellence' },
  { icon: FaShip, endValue: 5, suffix: '', label: 'Operational Vessels' },
  { icon: FaUsers, endValue: 500, suffix: '+', label: 'Daily Customers' },
  { icon: FaGasPump, endValue: 2, suffix: 'M', label: 'Litres Dispensed Monthly' },
];

export default function StatsBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section 
      ref={ref} 
      className="relative py-20 lg:py-24 overflow-hidden"
    >

      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076')`,
        }}
      >
        <div className="absolute inset-0 bg-slate-deep/90" />
      </div>


      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Our Impact in <span className="text-gradient">Numbers</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              icon={stat.icon}
              endValue={stat.endValue}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 0.15}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
