export default function CardLoader() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="w-96 p-8 rounded-2xl bg-white shadow-xl border">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="text-2xl font-bold text-[#6c47ff]">SeeMyStock</div>
        </div>

        {/* Progress bar */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Loading...</span>
              <span className="animate-pulse">✨</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#6c47ff] rounded-full animate-progress" />
            </div>
          </div>

          {/*  Random Messages */}
          <p className="text-sm text-gray-400 text-center animate-pulse">
            preparing your dashboard... fetching the latest stock data...
            optimizing your experience...
          </p>
        </div>
      </div>
    </div>
  );
}
