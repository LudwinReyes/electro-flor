"use client";

import React from 'react';
import Header from './Header';
import QuoteCart from './QuoteCart';
import PriceListModal from './PriceListModal';
import { useQuote } from '../contexts/QuoteContext';
import { Product } from '../types';

export default function GlobalModalsWrapper({
  children,
  products
}: {
  children: React.ReactNode;
  products: Product[];
}) {
  const {
    quoteItems,
    isQuoteOpen,
    setIsQuoteOpen,
    isPriceListOpen,
    setIsPriceListOpen,
    removeFromQuote,
    clearQuote
  } = useQuote();

  return (
    <>
      <Header
        quoteCount={quoteItems.length}
        onOpenQuote={() => setIsQuoteOpen(true)}
        onOpenPriceList={() => setIsPriceListOpen(true)}
        products={products}
      />
      
      <main>
        {children}
      </main>

      <QuoteCart
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        items={quoteItems}
        onRemove={removeFromQuote}
        onClear={clearQuote}
      />

      <PriceListModal
        isOpen={isPriceListOpen}
        onClose={() => setIsPriceListOpen(false)}
      />
    </>
  );
}
