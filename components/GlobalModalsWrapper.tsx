"use client";

import React from 'react';
import Header from './Header';
import QuoteCart from './QuoteCart';
import PriceListModal from './PriceListModal';
import { useQuote } from '../contexts/QuoteContext';
import { Product } from '../types';

import { usePathname } from 'next/navigation';

export default function GlobalModalsWrapper({
  children,
  products
}: {
  children: React.ReactNode;
  products: Product[];
}) {
  const pathname = usePathname();
  const isFichaTecnica = pathname?.startsWith('/ficha-tecnica');
  const isStudio = pathname?.startsWith('/admin');

  const {
    quoteItems,
    isQuoteOpen,
    setIsQuoteOpen,
    isPriceListOpen,
    setIsPriceListOpen,
    removeFromQuote,
    clearQuote
  } = useQuote();

  if (isStudio) {
    return <main>{children}</main>;
  }

  if (isFichaTecnica) {
    return (
      <>
        <main className="w-full flex-1">
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
