'use client';

import { usePrices } from '@/context/PriceContext';
import { motion } from 'framer-motion';
import { FaGasPump, FaFire, FaOilCan } from 'react-icons/fa';
import { GiGasStove } from 'react-icons/gi';

const productIcons: Record<string, React.ElementType> = {
  PMS: FaGasPump,
  AGO: FaOilCan,
  DPK: FaFire,
  LPG: GiGasStove,
};

export default function PriceTicker() {
  const { products, loading } = usePrices();

  if (loading) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 h-8 bg-slate-deep flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-white text-xs">Loading prices...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-8 bg-slate-deep overflow-hidden">
      <div className="relative h-full flex items-center">

        <div className="absolute left-0 top-0 bottom-0 w-16 bg-linear-to-r from-slate-deep to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-linear-to-l from-slate-deep to-transparent z-10" />
        
        {/* tickers scrolling */}
        <motion.div
          className="flex items-center space-x-8 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        >
     
          {[...products, ...products].map((product, index) => {
            const Icon = productIcons[product.code] || FaGasPump;
            return (
              <div
                key={`${product.id}-${index}`}
                className="flex items-center space-x-2 px-4"
              >
                <Icon className="w-3.5 h-3.5 text-primary" />
                <span className="text-white text-xs font-medium">
                  {product.code}:
                </span>
                {product.is_available ? (
                  <span className="text-primary text-xs font-bold">
                    ₦{product.price.toLocaleString()}/{product.unit}
                  </span>
                ) : (
                  <span className="text-secondary text-xs font-bold animate-pulse">
                    OUT OF STOCK
                  </span>
                )}
                <span className="text-gray-600 mx-4">|</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
