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

// ==================== Countdown Timer ====================
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

// ==================== WhatsApp Floating ====================
function WhatsAppFloating() {
  return (
    <a
      href="https://wa.me/258842118909?text=Tenho%20d%C3%BAvidas%20sobre%20como%20acessar%20o%20Bank%20Pix"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium text-sm shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:scale-105"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline">Duvidas? Fale conosco</span>
    </a>
  );
}

// ==================== PLAN CARD ====================
interface PlanProps {
  name: string;
  price: string;
  oldPrice?: string;
  benefits?: string[];
  buttonText: string;
  link: string;
  featured?: boolean;
  badge?: string;
  extraText?: string;
}

function PlanCard({
  name,
  price,
  oldPrice,
  benefits = [],
  buttonText,
  link,
  featured = false,
  badge,
  extraText,
}: PlanProps) {

  const handleTrack = () => {
    if (typeof window === "undefined" || !(window as any).fbq) return;

    const cleanPrice = parseFloat(price.replace(/[^0-9.,]/g, '').replace(',', '.')) || 0;

    // Evento Padrão (Meta recomenda)
    (window as any).fbq('track', 'InitiateCheckout', {
      content_name: name,
      value: cleanPrice,
      currency: 'MZN',
    });

    // Evento Customizado (mais fácil de analisar)
    (window as any).fbq('trackCustom', 'Click_Plano', {
      plano: name,
      preco: cleanPrice,
      moeda: 'MZN',
    });
  };

  return (
    <div
      className={`relative rounded-2xl p-6 transition-all duration-300 ${
        featured
          ? "bg-gradient-to-b from-[#0a2a1a] to-[#0f0f0f] border-2 border-[#00ff88] shadow-lg shadow-[#00ff88]/20"
          : "bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] border border-[#00ff88]/40 hover:border-[#00ff88]/60"
      }`}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4 py-1 rounded-full bg-gradient-to-r from-[#ff6b35] to-[#ff4d4d] text-white text-sm font-bold">
          <Flame className="w-4 h-4" />
          <span>{badge}</span>
        </div>
      )}

      <div className="text-center mb-4 pt-2">
        <h3 className={`text-xl font-bold mb-2 ${featured ? "text-[#00ff88]" : "text-[#00ff88]/80"}`}>
          {name}
        </h3>
        <div className="flex items-center justify-center gap-2">
          {oldPrice && <span className="text-gray-500 line-through text-lg">{oldPrice}</span>}
          <span className={`text-3xl font-bold ${featured ? "text-[#00ff88]" : "text-white"}`}>{price}</span>
        </div>
      </div>

      <ul className="space-y-3 mb-6">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
            <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${featured ? "text-[#00ff88]" : "text-[#00ff88]/70"}`} />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>

      {extraText && <p className="text-center text-sm text-[#00ff88] mb-4 font-medium">{extraText}</p>}

      <a href={link} target="_blank" rel="noopener noreferrer" onClick={handleTrack} className="block">
        <Button
          className={`w-full py-6 text-lg font-bold rounded-xl transition-all duration-300 ${
            featured
              ? "bg-[#00ff88] hover:bg-[#00cc6a] text-black shadow-lg shadow-[#00ff88]/30 hover:scale-[1.02]"
              : "bg-[#00ff88]/20 hover:bg-[#00ff88]/30 text-[#00ff88] border border-[#00ff88]/50 hover:border-[#00ff88] hover:scale-[1.02]"
          }`}
        >
          {buttonText} <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </a>
    </div>
  );
}

// ==================== PÁGINA PRINCIPAL ====================
export default function LandingPage() {
  const plansRef = useRef<HTMLElement>(null);

  const scrollToPlans = () => {
    plansRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Evento quando a pessoa entra na página
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq('track', 'ViewContent', {
        content_name: 'Landing Bank Pix',
        content_category: 'Vendas',
        currency: 'MZN',
      });

      (window as any).fbq('trackCustom', 'Acessou_Pagina_Vendas', {
        pagina: 'Bank Pix - Planos',
      });
    }
  }, []);

  return (
    <>
      {/* Meta Pixel */}
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
        {/* Hero Section */}
        <section className="relative px-4 pt-12 pb-16 overflow-hidden text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#00ff88]/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative max-w-md mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00ff88] to-[#00cc6a] flex items-center justify-center shadow-lg shadow-[#00ff88]/30">
                <Smartphone className="w-7 h-7 text-black" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-white">Bank Pix</h1>
                <p className="text-sm text-[#00ff88]">Aplicativo pronto para uso</p>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
              Ative seu Bank Pix e comece a{" "}
              <span className="text-[#00ff88]">receber e sacar dinheiro</span> hoje mesmo
            </h2>

            <p className="text-gray-400 mb-6">Sistema rápido, funcional e pronto para uso</p>

            <div className="mb-8">
              <p className="text-[#ff4d4d] font-medium mb-3 flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" />
                Oferta com desconto termina em:
              </p>
              <CountdownTimer />
            </div>

            <Button
              onClick={scrollToPlans}
              className="w-full py-6 text-lg font-bold rounded-xl bg-[#00ff88] hover:bg-[#00cc6a] text-black shadow-lg shadow-[#00ff88]/30 transition-all duration-300 hover:scale-[1.02]"
            >
              Garantir acesso agora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>

        {/* Plans Section */}
        <section ref={plansRef} className="px-4 py-12 bg-[#0f0f0f]">
          <div className="max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-center mb-2 text-white">Escolha seu plano</h3>
            <p className="text-gray-500 text-center mb-8">Selecione a opção ideal para você</p>

            <div className="space-y-6">
              {/* Pro Max */}
              <PlanCard
                name="Bank Pix Pro Max"
                price="729 MT"
                oldPrice="1479 MT"
                badge="MAIS ESCOLHIDO"
                featured={true}
                benefits={[
                  "Até 10 chaves diferentes",
                  "Saque até 50.000 MT por dia",
                  "Conta protegida e estável",
                  "Uso definitivo (sem expiração)",
                  "Receba e saque rápido",
                  "Funcionalidades completas"
                ]}
                extraText="A maioria dos usuários escolhe este plano"
                buttonText="Garantir acesso agora"
                link="https://pay.kambafy.com/checkout/e8ab6f89-80dc-49c1-b937-c19c3a704ba8"
              />

              {/* Start */}
              <PlanCard
                name="Bank Pix Start"
                price="319 MT"
                benefits={[
                  "Apenas 1 chave",
                  "Saque até 500 MT",
                  "Acesso básico",
                  "Funcionalidades limitadas"
                ]}
                buttonText="Começar com o básico"
                link="https://pay.kambafy.com/checkout/8e10e34b-8134-4456-9dce-efb470f3dd9b"
              />

              {/* Ultra */}
              <PlanCard
                name="Bank Pix Ultra"
                price="1099 MT"
                benefits={[
                  "Chaves ilimitadas",
                  "Sem limite de saque",
                  "Tudo do Pro Max incluído",
                  "Prioridade no suporte",
                  "Máxima performance"
                ]}
                buttonText="Quero acesso completo"
                link="https://pay.kambafy.com/checkout/7ee14786-af98-49e1-a3b9-272d5857c3d0"
              />
            </div>
          </div>
        </section>

        {/* WhatsApp */}
        <WhatsAppFloating />
      </main>
    </>
  );
}
