export default function StockLoader() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="relative">
        {/* Box animation */}
        <div className="flex gap-1 items-end h-16">
          <div
            className="w-4 bg-[#6c47ff] rounded-t animate-stack"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="w-4 bg-[#6c47ff] rounded-t animate-stack"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="w-4 bg-[#6c47ff] rounded-t animate-stack"
            style={{ animationDelay: "0.4s" }}
          />
          <div
            className="w-4 bg-[#6c47ff] rounded-t animate-stack"
            style={{ animationDelay: "0.6s" }}
          />
          <div
            className="w-4 bg-[#6c47ff] rounded-t animate-stack"
            style={{ animationDelay: "0.8s" }}
          />
        </div>

        {/* text */}
        <p className="text-center mt-4 text-gray-500 font-medium">
          Loading your stock...
        </p>
      </div>
    </div>
  );
}
