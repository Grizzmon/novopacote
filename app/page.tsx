'use client';

import { useState, useEffect, useRef } from "react";
import Script from 'next/script';
import {
  Zap,
  Shield,
  Clock,
  Smartphone,
  ArrowRight,
  Banknote,
  Wallet,
  CheckCircle,
  Star,
  Flame,
  MessageCircle,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ==================== COMPONENTES AUXILIARES ====================

function CountdownTimer() {
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  useEffect(() => {
    const storedEndTime = localStorage.getItem("bankpix_offer_end");
    let endTime: number;
    if (storedEndTime) {
      endTime = parseInt(storedEndTime, 10);
    } else {
      endTime = Date.now() + 15 * 60 * 1000;
      localStorage.setItem("bankpix_offer_end", endTime.toString());
    }
    const updateTimer = () => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
      setTimeRemaining(remaining);
      if (remaining <= 0) {
        const newEndTime = Date.now() + 15 * 60 * 1000;
        localStorage.setItem("bankpix_offer_end", newEndTime.toString());
      }
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  if (timeRemaining === null) return null;
  const mins = Math.floor(timeRemaining / 60).toString().padStart(2, "0");
  const secs = (timeRemaining % 60).toString().padStart(2, "0");

  return (
    <div className="flex items-center justify-center gap-2">
      <div className="bg-[#1a1a1a] border border-[#00ff88]/30 rounded-lg px-3 py-2 min-w-[50px] text-center">
        <span className="font-mono font-bold text-2xl text-[#00ff88]">{mins}</span>
      </div>
      <span className="text-[#00ff88] font-bold text-xl">:</span>
      <div className="bg-[#1a1a1a] border border-[#00ff88]/30 rounded-lg px-3 py-2 min-w-[50px] text-center">
        <span className="font-mono font-bold text-2xl text-[#00ff88]">{secs}</span>
      </div>
    </div>
  );
}

function WhatsAppFloating() {
  return (
    <a
      href="https://wa.me/258842118909?text=Tenho%20d%C3%BAvidas%20sobre%20como%20acessar%20o%20Bank%20Pix"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] text-white font-medium shadow-lg transition-all hover:scale-105"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline">Duvidas? Fale conosco</span>
    </a>
  );
}

// ==================== PLAN CARD (APENAS 1 EVENTO) ====================

interface PlanProps {
  name: string;
  price: string;
  oldPrice?: string;
  benefits?: string[];
  buttonText: string;
  link: string;
  featured?: boolean;
  badge?: string;
}

function PlanCard({ name, price, oldPrice, benefits = [], buttonText, link, featured = false, badge }: PlanProps) {
  
  const handleTrack = () => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      // Envia apenas o evento padrão de Checkout para o seu ID
      (window as any).fbq('track', 'InitiateCheckout', {
        content_name: name,
        value: parseFloat(price.replace(/[^0-9]/g, '')),
        currency: 'MZN'
      });
    }
  };

  return (
    <div className={`relative rounded-2xl p-6 transition-all ${featured ? "bg-gradient-to-b from-[#0a2a1a] to-[#0f0f0f] border-2 border-[#00ff88]" : "bg-[#1a1a1a] border border-[#333]"}`}>
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4 py-1 rounded-full bg-red-500 text-white text-sm font-bold">
          <Flame className="w-4 h-4" />
          <span>{badge}</span>
        </div>
      )}
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold mb-2 text-[#00ff88]">{name}</h3>
        <div className="flex items-center justify-center gap-2">
          {oldPrice && <span className="text-gray-500 line-through">{oldPrice}</span>}
          <span className="text-3xl font-bold text-white">{price}</span>
        </div>
      </div>
      <ul className="space-y-3 mb-6">
        {benefits.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
            <CheckCircle className="w-5 h-5 text-[#00ff88] flex-shrink-0" />
            {b}
          </li>
        ))}
      </ul>
      <a href={link} target="_blank" rel="noopener noreferrer" onClick={handleTrack}>
        <Button className={`w-full py-6 font-bold rounded-xl ${featured ? "bg-[#00ff88] text-black" : "bg-transparent border border-[#00ff88] text-[#00ff88]"}`}>
          {buttonText} <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </a>
    </div>
  );
}

// ==================== PÁGINA PRINCIPAL ====================

export default function LandingPage() {
  const plansRef = useRef<HTMLElement>(null);
  const scrollToPlans = () => plansRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* SEU PIXEL ÚNICO */}
      <Script id="fb-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '829061486173119'); 
          fbq('track', 'PageView');
        `}
      </Script>

      <main className="min-h-screen bg-[#0a0a0a] text-white">
        <section className="px-4 pt-12 pb-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Ative seu Bank Pix hoje mesmo</h2>
          <div className="mb-8"><CountdownTimer /></div>
          <Button onClick={scrollToPlans} className="w-full max-w-sm py-6 bg-[#00ff88] text-black font-bold">Garantir acesso agora</Button>
        </section>

        <section ref={plansRef} className="px-4 py-12 bg-[#0f0f0f]">
          <div className="max-w-md mx-auto space-y-6">
            <PlanCard 
              name="Bank Pix Pro Max" price="729 MT" oldPrice="1479 MT" featured={true} badge="MAIS ESCOLHIDO"
              benefits={["Saque até 50.000 MT/dia", "Uso definitivo", "Sem bloqueios"]}
              buttonText="Garantir acesso agora" link="https://pay.kambafy.com/checkout/e8ab6f89-80dc-49c1-b937-c19c3a704ba8" 
            />
            <PlanCard 
              name="Bank Pix Start" price="319 MT"
              benefits={["Apenas 1 chave", "Saque até 5000 MT"]}
              buttonText="Começar com o básico" link="https://pay.kambafy.com/checkout/8e10e34b-8134-4456-9dce-efb470f3dd9b" 
            />
          </div>
        </section>
        <WhatsAppFloating />
      </main>
    </>
  );
}
