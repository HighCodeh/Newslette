import NewsletterForm from "@/components/newsletter-form"
import { StarField } from "@/components/star-field"

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <StarField />
      <div className="z-10 text-center px-4 max-w-3xl">
        <p className="text-purple-400 mb-2">Bem-vindo ao</p>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          High Boy <span className="text-purple-500">Newsletter</span>
        </h1>
        <p className="text-gray-300 text-lg mb-8">Fique por dentro das novidades e atualizações do High Boy!</p>

        <NewsletterForm />

        <div className="mt-16">
          <button className="bg-purple-900/50 hover:bg-purple-800/50 text-white py-2 px-6 rounded-full border border-purple-700/50 transition-all">
            Conheça mais
          </button>
        </div>
      </div>
    </main>
  )
}

