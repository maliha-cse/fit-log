"use client";

import { useFitLog } from "../context/FitLogContext";

export default function Navbar() {
  const { plan, saved } = useFitLog();

  return (
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
            Plan {plan.length}
          </a>

          <a
            href="/my-plan"
            className="rounded-full border border-white/30 px-4 py-2 text-sm"
          >
            Saved {saved.length}
          </a>
        </div>

      </div>
    </nav>
  );
}