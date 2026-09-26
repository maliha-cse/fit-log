"use client";

import { useFitLog } from "../context/FitLogContext";

export default function Navbar() {
  const { plan, saved } = useFitLog();

  return (
    <nav className="border-b border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 sm:py-5 md:flex-row md:items-center md:justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img
            src="/assets/logo.png"
            alt="FitLog Logo"
            className="h-8 w-auto sm:h-9"
          />

          <span className="text-lg font-bold tracking-wide text-white sm:text-xl">
            FITLOG
          </span>
        </a>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-sm sm:gap-8">
          <a
            href="/"
            className="text-[#ccff00]"
          >
            Workout
          </a>

          <a
            href="/my-plan"
            className="text-gray-400 hover:text-white"
          >
            My Plan
          </a>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/my-plan"
            className="rounded-full bg-[#ccff00] px-3 py-2 text-xs font-semibold text-black sm:px-4 sm:text-sm"
          >
            Plan {plan.length}
          </a>

          <a
            href="/saved"
            className="rounded-full border border-white/30 px-3 py-2 text-xs sm:px-4 sm:text-sm"
          >
            Saved {saved.length}
          </a>
        </div>

      </div>
    </nav>
  );
}