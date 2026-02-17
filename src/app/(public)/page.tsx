import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">
        Bienvenue sur SeeMyStock
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Gérez votre stock facilement
      </p>
      <div className="flex justify-center gap-4">
        <Link
          href="/sign-up" // Changé de /dashboard à /sign-up
          className="bg-[#6c47ff] text-white px-6 py-3 rounded-lg hover:bg-[#5a3ad9] transition-colors"
        >
          Commencer gratuitement
        </Link>
        <Link
          href="/features"
          className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          En savoir plus
        </Link>
      </div>
    </div>
  );
}
