import NewsletterForm from "@/components/newsletter-form"
import { StarField } from "@/components/star-field"
import { DebugConnection } from "@/components/debug-connection"

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <StarField />
      <div className="z-10 text-center px-4 max-w-3xl">
        <div className="mb-10">
          <p className="text-purple-400 mb-2 text-lg">Bem-vindo ao</p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            High Boy <span className="text-purple-500">Newsletter</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
            Fique por dentro das novidades e atualizações do High Boy! Receba conteúdo exclusivo diretamente no seu
            email.
          </p>
        </div>

        <div className="bg-purple-900/20 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-purple-700/30 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6">Inscreva-se agora</h2>
          <NewsletterForm />
        </div>

        <div className="mt-16">
          <button className="bg-purple-900/50 hover:bg-purple-800/50 text-white py-3 px-8 rounded-full border border-purple-700/50 transition-all transform hover:scale-105">
            Conheça mais
          </button>
        </div>
      </div>

      {/* Only show in development */}
      {process.env.NODE_ENV === "development" && <DebugConnection />}
    </main>
  )
}

