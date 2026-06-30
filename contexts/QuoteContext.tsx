"use client";
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';

interface QuoteContextType {
  quoteItems: Product[];
  addToQuote: (product: Product) => void;
  removeFromQuote: (id: string) => void;
  clearQuote: () => void;
  isQuoteOpen: boolean;
  setIsQuoteOpen: (isOpen: boolean) => void;
  isPriceListOpen: boolean;
  setIsPriceListOpen: (isOpen: boolean) => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quoteItems, setQuoteItems] = useState<Product[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('electroflor_quote');
    if (saved) {
      try {
        setQuoteItems(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing quote items from local storage", e);
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('electroflor_quote', JSON.stringify(quoteItems));
    }
  }, [quoteItems, isInitialized]);

  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isPriceListOpen, setIsPriceListOpen] = useState(false);

  const addToQuote = (product: Product) => {
    const productId = product._id || product.id;
    setQuoteItems(prev => {
      if (prev.find(item => (item._id || item.id) === productId)) return prev;
      return [...prev, product];
    });
    setIsQuoteOpen(true);
  };

  const removeFromQuote = (id: string) => {
    setQuoteItems(prev => prev.filter(item => (item._id || item.id) !== id));
  };

  const clearQuote = () => {
    setQuoteItems([]);
  };

  return (
    <QuoteContext.Provider
      value={{
        quoteItems,
        addToQuote,
        removeFromQuote,
        clearQuote,
        isQuoteOpen,
        setIsQuoteOpen,
        isPriceListOpen,
        setIsPriceListOpen,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (context === undefined) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
};
