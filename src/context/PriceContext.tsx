'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase, Product, LPGSize, defaultProducts, defaultLPGSizes } from '@/lib/supabase';

interface PriceContextType {
  products: Product[];
  lpgSizes: LPGSize[];
  loading: boolean;
  error: string | null;
  refreshProducts: () => Promise<void>;
  refreshLPGSizes: () => Promise<void>;
  getProductByCode: (code: string) => Product | undefined;
}

const PriceContext = createContext<PriceContextType | undefined>(undefined);

export function PriceProvider({ children }: { children: React.ReactNode }) {
  
  const [products, setProducts] = useState<Product[]>([]);
  const [lpgSizes, setLPGSizes] = useState<LPGSize[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .order('name');

      if (fetchError) {
        console.warn('using default products: ', fetchError.message);
        setProducts(defaultProducts.map((p, i) => ({
          ...p,
          id: `default-${i}`,
          updated_at: new Date().toISOString()
        })));
      } else {
        setProducts(data || []);
      }
    } catch (err) {
      console.error('error fetching products: ', err);
      setProducts(defaultProducts.map((p, i) => ({
        ...p,
        id: `default-${i}`,
        updated_at: new Date().toISOString()
      })));
    }
  }, []);

  const fetchLPGSizes = useCallback(async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('lpg_sizes')
        .select('*')
        .order('size_kg');

      if (fetchError) {
        console.warn('Using default LPG sizes: ', fetchError.message);
        setLPGSizes(defaultLPGSizes.map((s, i) => ({
          ...s,
          id: `default-${i}`,
          updated_at: new Date().toISOString()
        })));
      } else {
        setLPGSizes(data || []);
      }
    } catch (err) {
      console.error('error fetching LPG sizes: ', err);
      setLPGSizes(defaultLPGSizes.map((s, i) => ({
        ...s,
        id: `default-${i}`,
        updated_at: new Date().toISOString()
      })));
    }
  }, []);

  const refreshProducts = useCallback(async () => {
    await fetchProducts();
  }, [fetchProducts]);

  const refreshLPGSizes = useCallback(async () => {
    await fetchLPGSizes();
  }, [fetchLPGSizes]);

  const getProductByCode = useCallback((code: string) => {
    return products.find(p => p.code === code);
  }, [products]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      await Promise.all([fetchProducts(), fetchLPGSizes()]);
      setLoading(false);
    };

    loadData();

    const productsChannel = supabase
      .channel('products-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        (payload) => {
          console.log('products changed: ', payload);
          if (payload.eventType === 'UPDATE') {
            setProducts(prev => 
              prev.map(p => p.id === payload.new.id ? payload.new as Product : p)
            );
          } else if (payload.eventType === 'INSERT') {
            setProducts(prev => [...prev, payload.new as Product]);
          } else if (payload.eventType === 'DELETE') {
            setProducts(prev => prev.filter(p => p.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    const lpgChannel = supabase
      .channel('lpg-sizes-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'lpg_sizes' },
        (payload) => {
          console.log('LPG sizes changed: ', payload);
          if (payload.eventType === 'UPDATE') {
            setLPGSizes(prev => 
              prev.map(s => s.id === payload.new.id ? payload.new as LPGSize : s)
            );
          } else if (payload.eventType === 'INSERT') {
            setLPGSizes(prev => [...prev, payload.new as LPGSize]);
          } else if (payload.eventType === 'DELETE') {
            setLPGSizes(prev => prev.filter(s => s.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(productsChannel);
      supabase.removeChannel(lpgChannel);
    };
  }, [fetchProducts, fetchLPGSizes]);

  return (
    <PriceContext.Provider
      value={{
        products,
        lpgSizes,
        loading,
        error,
        refreshProducts,
        refreshLPGSizes,
        getProductByCode,
      }}
    >
      {children}
    </PriceContext.Provider>
  );
}

export function usePrices() {
  const context = useContext(PriceContext);
  if (context === undefined) {
    throw new Error('usePrices must be used within a PriceProvider');
  }
  return context;
}
