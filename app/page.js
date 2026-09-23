export default function Home() {
  return (
    <main>
      <nav className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <img
              src="/assets/logo.png"
              alt="FitLog Logo"
              className="h-9 w-auto"
            />

            <span className="text-xl font-bold tracking-wide text-white">
              FITLOG
            </span>
          </a>

          {/* Navigation Links */}
          <div className="hidden gap-8 md:flex">
            <a href="/" className="text-[#ccff00]">
              Workout
            </a>

            <a href="/my-plan" className="text-gray-400 hover:text-white">
              My Plan
            </a>
          </div>

          {/* Status Badges */}
          <div className="flex items-center gap-3">
            <a
              href="/my-plan"
              className="rounded-full bg-[#ccff00] px-4 py-2 text-sm font-semibold text-black"
            >
              Plan 0
            </a>

            <a
              href="/my-plan"
              className="rounded-full border border-white/30 px-4 py-2 text-sm"
            >
              Saved 0
            </a>
          </div>

        </div>
      </nav>
      <section className="mx-auto max-w-7xl bg-[#181a1c]">
        <div className="flex min-h-[600px] items-center gap-12 px-10 py-16">

          {/* Left Side */}
          <div className="flex-1">
            <p className="mb-5 text-sm font-semibold tracking-[0.25em] text-[#ccff00]">
              WORKOUT LIBRARY
            </p>

            <h1 className="text-5xl font-bold leading-tight md:text-6xl">
              <span className="whitespace-nowrap">
                TRAIN WITH INTENT. LOG
              </span>
              <br />
              <span className="whitespace-nowrap">
                EVERY SET.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-gray-400">
              Build your workout plan, track every session, and train with purpose.
            </p>

            <a
              href="#library"
              className="mt-8 inline-block rounded-full bg-[#ccff00] px-6 py-3 font-semibold text-black transition hover:bg-[#b8e600]"
            >
              Browse Workouts
            </a>
          </div>

          {/* Right Side */}
          <div className="w-1/2">
            <img
              src="/assets/banner.png"
              alt="Workout"
              className="w-full"
            />
          </div>

        </div>
      </section>
    </main>
  );
}