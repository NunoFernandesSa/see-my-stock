export default function LogoLoader() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-white to-gray-50 z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Logo animé */}
        <div className="relative mb-4">
          <div className="text-4xl font-bold text-[#6c47ff] animate-pulse">
            SeeMyStock
          </div>
          <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#6c47ff] to-transparent animate-slide" />
        </div>

        {/* Points de chargement */}
        <div className="flex gap-2 justify-center mt-4">
          <div
            className="w-2 h-2 bg-[#6c47ff] rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="w-2 h-2 bg-[#6c47ff] rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="w-2 h-2 bg-[#6c47ff] rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>
    </div>
  );
}
