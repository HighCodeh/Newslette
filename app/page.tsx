import NewsletterForm from "@/components/newsletter-form"
import { StarField } from "@/components/star-field"
import { DebugConnection } from "@/components/debug-connection"

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#8c2aff]/20 z-0"></div>
      <StarField />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#8c2aff]/10 blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-[#8c2aff]/15 blur-3xl"></div>
      
      <div className="z-10 text-center px-4 max-w-3xl py-16">
        <div className="mb-12">
          <p className="text-[#8c2aff] mb-3 text-lg font-medium tracking-wide">Bem-vindo ao</p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            High Boy <span className="text-[#8c2aff]">Newsletter</span>
          </h1>
          <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Fique por dentro das novidades e atualizações do High Boy! Receba conteúdo exclusivo diretamente no seu
            email.
          </p>
        </div>

        <div className="backdrop-blur-xl bg-black/30 p-8 md:p-10 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(140,42,255,0.15)] relative overflow-hidden">
          {/* Glass reflections */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute -top-[500px] -left-[500px] w-[1000px] h-[1000px] bg-[#8c2aff]/5 rounded-full blur-3xl"></div>
          
          <h2 className="text-2xl font-bold text-white mb-8 relative">Inscreva-se agora</h2>
          <NewsletterForm />
        </div>

        <div className="mt-16 relative">
          <button className="bg-[#8c2aff]/80 hover:bg-[#8c2aff] text-white py-3.5 px-10 rounded-full border border-[#8c2aff]/50 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm shadow-[0_0_15px_rgba(140,42,255,0.3)]">
            Conheça mais
          </button>
        </div>
      </div>


      {/* Only show in development */}
      {process.env.NODE_ENV === "development" && <DebugConnection />}
    </main>
  )
}
