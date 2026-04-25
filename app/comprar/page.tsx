"use client"

import { Check, Key, Wallet, Shield, Zap, RefreshCw, Sparkles, MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Benefit {
  icon: React.ReactNode
  text: string
}

interface Plan {
  name: string
  price: number
  originalPrice: number
  benefits: Benefit[]
  buttonText: string
  link: string
  isHighlighted?: boolean
  badge?: string
}

function createBenefit(type: string, text: string): Benefit {
  const icons: Record<string, React.ReactNode> = {
    key: <Key className="w-3.5 h-3.5" />,
    wallet: <Wallet className="w-3.5 h-3.5" />,
    shield: <Shield className="w-3.5 h-3.5" />,
    zap: <Zap className="w-3.5 h-3.5" />,
    refresh: <RefreshCw className="w-3.5 h-3.5" />,
    check: <Check className="w-3.5 h-3.5" />,
  }

  return {
    icon: icons[type] || icons.check,
    text,
  }
}

const plans: Plan[] = [
  {
    name: "Bank Pix Basico",
    price: 299,
    originalPrice: 599,
    benefits: [
      createBenefit("key", "Chave personalizada (x1)"),
      createBenefit("wallet", "Limite de saque por dia: 200 MZN"),
      createBenefit("shield", "Conta garantida"),
      createBenefit("zap", "Levantamento instantaneo (M-pesa)"),
    ],
    buttonText: "Quero Bank Pix Basico",
    link: "https://my.debito.co.mz/pay/f3f148d7-2749-4b0e-b23d-f8f208b582bc",
    isHighlighted: false,
  },
  {
    name: "Bank Pix Pro Max",
    price: 729,
    originalPrice: 1479,
    benefits: [
      createBenefit("key", "Chave personalizada"),
      createBenefit("wallet", "Limite de saque por dia: 50.000 MZN"),
      createBenefit("shield", "Conta garantida"),
      createBenefit("zap", "Levantamento instantaneo (M-pesa e E-mola)"),
      createBenefit("refresh", "Atualizacoes automaticas"),
    ],
    buttonText: "Quero Bank Pix Pro Max",
    link: "https://my.debito.co.mz/pay/cfdc7006-0e32-40ee-88de-72ae5bdc3463",
    isHighlighted: true,
    badge: "Melhor Oferta",
  },
  {
    name: "Bank Pix Normal",
    price: 379,
    originalPrice: 809,
    benefits: [
      createBenefit("key", "Chave personalizada (x3)"),
      createBenefit("wallet", "Limite de saque por dia: 1000 MZN"),
      createBenefit("shield", "Conta garantida"),
      createBenefit("zap", "Levantamento instantaneo"),
    ],
    buttonText: "Quero Bank Pix Normal",
    link: "https://my.debito.co.mz/pay/5cf54a87-c174-4000-a662-21127880185b",
    isHighlighted: false,
  },
]

function PlanCard({
  name,
  price,
  originalPrice,
  benefits,
  buttonText,
  link,
  isHighlighted = false,
  badge,
}: Plan) {
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100)

  return (
    <div
      className={`
        relative flex flex-col rounded-2xl p-6 transition-all duration-500
        ${
          isHighlighted
            ? "bg-gradient-to-b from-[#2a1a1a] to-[#1a0a0a] border-2 border-[#ff4d4d] md:scale-105 shadow-2xl shadow-[#ff4d4d]/20 animate-glow-pulse"
            : "bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] border border-[#333] hover:border-[#00ff88]/50 hover:shadow-lg hover:shadow-[#00ff88]/10"
        }
      `}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#ff8800] to-[#ff4d4d] text-white text-sm font-bold shadow-lg">
            <Sparkles className="w-4 h-4" />
            {badge}
          </div>
        </div>
      )}

      {/* Plan name */}
      <div className="text-center mb-6 pt-2">
        <h3 className="text-xl font-bold text-white">{name}</h3>
      </div>

      {/* Pricing */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-gray-500 line-through text-lg">
            {originalPrice} MZN
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#00ff88]/10 text-[#00ff88] text-xs font-bold">
            -{discount}%
          </span>
        </div>
        <div className="flex items-baseline justify-center gap-1">
          <span className={`text-4xl font-bold ${isHighlighted ? "text-[#00ff88]" : "text-white"}`}>
            {price}
          </span>
          <span className="text-gray-400 text-lg">MZN</span>
        </div>
      </div>

      {/* Benefits */}
      <div className="flex-1 space-y-4 mb-8">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
              isHighlighted ? "bg-[#00ff88]/20 text-[#00ff88]" : "bg-[#333] text-[#00ff88]"
            }`}>
              {benefit.icon}
            </div>
            <span className="text-gray-300 text-sm leading-relaxed">{benefit.text}</span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <a href={link} target="_blank" rel="noopener noreferrer" className="block">
        <Button
          size="lg"
          className={`w-full h-14 text-base font-bold rounded-xl transition-all duration-300 cursor-pointer ${
            isHighlighted
              ? "bg-gradient-to-r from-[#00ff88] to-[#00cc6a] hover:from-[#00cc6a] hover:to-[#00ff88] text-black shadow-lg shadow-[#00ff88]/30 hover:scale-[1.02]"
              : "bg-[#1f1f1f] hover:bg-[#2a2a2a] text-white border border-[#333] hover:border-[#00ff88]"
          }`}
        >
          {buttonText}
        </Button>
      </a>

      {/* PixBank logo */}
      <div className="flex items-center justify-center mt-6">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
          isHighlighted ? "bg-[#00ff88]/10" : "bg-[#1a1a1a]"
        }`}>
          <div className="w-6 h-6 rounded bg-gradient-to-br from-[#00ff88] to-[#00aa55] flex items-center justify-center">
            <Zap className="w-4 h-4 text-black" />
          </div>
          <span className="text-sm font-semibold text-[#00ff88]">PixBank</span>
        </div>
      </div>
    </div>
  )
}

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5519982612846?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20a%20oferta"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-lg shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:scale-105"
    >
      <MessageCircle className="w-6 h-6" />
      <span>Quero saber mais</span>
    </a>
  )
}

export default function ComprarPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff4d4d]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00ff88]/5 rounded-full blur-[150px]" />
      </div>

      {/* Header */}
      <header className="relative py-6 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00ff88] to-[#00aa55] flex items-center justify-center">
              <Zap className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-bold">Bank Pix</span>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="relative px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Escolha o melhor plano para voce
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-6">
            Tenha acesso a chaves personalizadas, saques instantaneos e muito mais. 
            Comece a receber pagamentos hoje mesmo!
          </p>
          
          {/* Benefits highlights */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-8">
            <div className="flex items-center gap-2 text-gray-300">
              <Check className="w-5 h-5 text-[#00ff88]" />
              <span className="text-sm md:text-base">Ativacao imediata</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Check className="w-5 h-5 text-[#00ff88]" />
              <span className="text-sm md:text-base">Suporte 24/7</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Check className="w-5 h-5 text-[#00ff88]" />
              <span className="text-sm md:text-base">Pagamento seguro</span>
            </div>
          </div>
        </div>
      </section>

      {/* Plans section */}
      <section className="relative px-4 py-8 md:py-12">
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Plans grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8 items-start">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`animate-fade-in-up ${
                  plan.isHighlighted ? "md:order-2" : index === 0 ? "md:order-1" : "md:order-3"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PlanCard {...plan} />
              </div>
            ))}
          </div>

          {/* WhatsApp CTA - After plans */}
          <div className="mt-12 md:mt-16 text-center">
            <p className="text-gray-400 text-lg mb-4">
              Tem duvidas? Fale conosco pelo WhatsApp
            </p>
            <WhatsAppButton />
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="relative px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] rounded-2xl border border-[#333] p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
              Por que escolher o Bank Pix?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#00ff88]/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-7 h-7 text-[#00ff88]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Rapido</h3>
                <p className="text-gray-400 text-sm">
                  Levantamentos instantaneos via M-pesa e E-mola
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#00ff88]/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-7 h-7 text-[#00ff88]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Seguro</h3>
                <p className="text-gray-400 text-sm">
                  Conta garantida sem contestacao ou bloqueio
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#00ff88]/10 flex items-center justify-center mx-auto mb-4">
                  <Key className="w-7 h-7 text-[#00ff88]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Personalizado</h3>
                <p className="text-gray-400 text-sm">
                  Chaves personalizadas com seu nome
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA with WhatsApp */}
      <section className="relative px-4 py-12 md:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ainda tem duvidas?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Nossa equipe esta pronta para ajudar voce. Entre em contato agora mesmo!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <WhatsAppButton />
            <a
              href="tel:+5519982612846"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1f1f1f] hover:bg-[#2a2a2a] border border-[#333] hover:border-[#00ff88] text-gray-300 hover:text-white transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium">Ligar agora</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-4 border-t border-[#1f1f1f]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00ff88] to-[#00aa55] flex items-center justify-center">
              <Zap className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold text-white">Bank Pix</span>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Bank Pix. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </main>
  )
}
