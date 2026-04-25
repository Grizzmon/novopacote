'use client';

import React from 'react';

interface PlanCardProps {
  name: string;
  price: string;
  oldPrice?: string;
  benefits?: string[];        // ← agora é opcional
  buttonText: string;
  link: string;
  featured?: boolean;
  badge?: string;
  extraText?: string;
}

const PlanCard: React.FC<PlanCardProps> = ({
  name,
  price,
  oldPrice,
  benefits = [],           // ← valor padrão vazio
  buttonText,
  link,
  featured = false,
  badge,
  extraText,
}) => {
  const getCleanPrice = (): number => {
    return parseFloat(price.replace(/[^0-9.,]/g, '').replace(',', '.')) || 0;
  };

  const handleTrack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window === 'undefined' || !(window as any).fbq) return;

    const cleanPrice = getCleanPrice();

    (window as any).fbq('track', 'InitiateCheckout', {
      content_name: name,
      value: cleanPrice,
      currency: 'MZN',
      num_items: 1,
    });

    (window as any).fbq('trackCustom', 'Checkout_V2', {
      plano: name,
      preco: cleanPrice,
      moeda: 'MZN',
    });
  };

  return (
    <div
      className={`rounded-2xl p-6 border transition-all duration-300 ${
        featured
          ? 'border-2 border-[#00ff88] shadow-xl scale-[1.02]'
          : 'border border-[#00ff88]/30'
      }`}
    >
      {badge && (
        <div className="text-center mb-3">
          <span className="inline-block bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full">
            {badge}
          </span>
        </div>
      )}

      <h3 className="text-center text-xl font-bold mb-2 text-white">{name}</h3>

      <div className="text-center mb-6">
        {oldPrice && (
          <span className="block line-through text-gray-500 text-sm mb-1">
            {oldPrice}
          </span>
        )}
        <div className="text-4xl font-bold text-[#00ff88]">{price}</div>
      </div>

      {/* Proteção forte aqui */}
      <ul className="mb-8 space-y-3">
        {(benefits || []).map((benefit, index) => (
          <li key={index} className="flex items-start gap-3 text-sm text-gray-300">
            <span className="text-[#00ff88] text-lg leading-none mt-0.5">✓</span>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>

      {extraText && (
        <p className="text-center text-[#00ff88] text-sm mb-6 font-medium">
          {extraText}
        </p>
      )}

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleTrack}
        className="block"
      >
        <button className="w-full bg-[#00ff88] hover:bg-[#00ff88]/90 transition-colors text-black font-bold py-4 rounded-xl text-lg">
          {buttonText}
        </button>
      </a>
    </div>
  );
};

export default PlanCard;
