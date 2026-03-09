'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaGasPump } from 'react-icons/fa';
import { usePrices } from '@/context/PriceContext';

export default function GasCalculator() {
  const { products, loading } = usePrices();
  const [weightKg, setWeightKg] = useState<number>(12.5);
  const [total, setTotal] = useState<number>(0);
  const [isOrdering, setIsOrdering] = useState(false);

  const lpgProduct = products.find(p => p.code === 'LPG');

  useEffect(() => {
    if (lpgProduct && weightKg > 0) {
      setTotal(lpgProduct.price * weightKg);
    } else {
      setTotal(0);
    }
  }, [weightKg, lpgProduct]);

  const handleOrder = () => {
    if (!lpgProduct || weightKg <= 0) return;

    setIsOrdering(true);
    
    const message = `Hello Chrism Oil, I would like to order:
    
    Product: LPG Cooking Gas
    Quantity: ${weightKg}kg
    Total Price: ₦${total.toLocaleString()}

    Please confirm availability and delivery options.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/2348158133906?text=${encodedMessage}`;
    
  };

  if (loading) {
    return <div className="animate-pulse h-64 bg-gray-100 rounded-2xl"></div>;
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      <div className="bg-slate-deep p-6 text-white text-center">
        <FaGasPump className="w-8 h-8 mx-auto mb-3 text-primary" />
        <h3 className="text-2xl font-bold ">LPG Order Calculator</h3>
        <p className="text-gray-400 text-sm mt-1">Enter your desired quantity and order via WhatsApp</p>
      </div>

      <div className="p-6 sm:p-8 space-y-6">


        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Enter Quantity (KG)</label>
          <div className="relative">
            <input
              type="number"
              min="1"
              step="0.1"
              value={weightKg}
              onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl text-2xl font-bold text-slate-deep focus:border-primary focus:bg-white outline-none transition-all pr-12"
              placeholder="0.0"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">KG</span>
          </div>
          {lpgProduct && (
            <p className="mt-2 text-sm text-gray-500">
              Current Price: <span className="font-bold text-primary">₦{lpgProduct.price.toLocaleString()}</span> / kg
              {!lpgProduct.is_available && <span className="ml-2 text-red-500 font-bold">(Out of Stock)</span>}
            </p>
          )}
        </div>

        {/* total  */}
        <div className="pt-6 border-t border-gray-100">
          <div className="flex justify-between items-end mb-6">
            <span className="text-gray-500 font-medium">Total Estimate</span>
            <div className="text-right">
              <span className="text-3xl font-bold text-slate-deep">
                ₦{total.toLocaleString()}
              </span>
            </div>
          </div>

          <button
            onClick={handleOrder}
            disabled={isOrdering || !lpgProduct?.is_available || weightKg <= 0}
            className="w-full py-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl font-bold text-lg shadow-lg shadow-green-500/30 transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isOrdering ? (
              <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <FaWhatsapp className="w-6 h-6" />
                <span>Order via WhatsApp</span>
              </>
            )}
          </button>
          <p className="text-center text-xs text-gray-400 mt-3">
            Ordering redirects to WhatsApp to finalize details.
          </p>
        </div>
      </div>
    </div>
  );
}
