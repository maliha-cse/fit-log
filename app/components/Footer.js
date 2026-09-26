export default function Footer() {
  return (
    <footer className="mt-10 border-t border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <img
            src="/assets/logo.png"
            alt="FitLog"
            className="h-5 w-auto"
          />

          <span className="text-xs font-bold">
            FITLOG
          </span>
        </div>

        <p className="text-[9px] text-gray-600">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}