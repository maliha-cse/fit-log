"use client";

import Footer from "../components/Footer";
import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import { useFitLog } from "../context/FitLogContext";

export default function Saved() {
  const { saved, removeFromSaved } = useFitLog();
  const [sortBy, setSortBy] = useState("duration");

  const sortedSaved = useMemo(() => {
    return [...saved].sort((a, b) => {
      if (sortBy === "duration") {
        return Number(a.duration || 0) - Number(b.duration || 0);
      }

      if (sortBy === "calories") {
        return (
          Number(a.caloriesBurned || 0) -
          Number(b.caloriesBurned || 0)
        );
      }

      if (sortBy === "rating") {
        return Number(a.rating || 0) - Number(b.rating || 0);
      }

      return 0;
    });
  }, [saved, sortBy]);

  const totalMinutes = saved.reduce(
    (total, workout) => total + Number(workout.duration || 0),
    0
  );

  const totalCalories = saved.reduce(
    (total, workout) =>
      total + Number(workout.caloriesBurned || 0),
    0
  );

  return (
    <main className="min-h-screen bg-[#0d0f12] text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold uppercase">
            SAVED
          </h1>

          <p className="mt-1 text-xs text-gray-500">
            Your saved workouts for later.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 overflow-hidden rounded-lg border border-white/10 bg-[#13161c] sm:grid-cols-3">
          <div className="border-b border-white/10 px-5 py-5 sm:border-b-0 sm:border-r">
            <p className="text-[10px] text-gray-500">
              Saved Workouts
            </p>

            <p className="mt-1 text-3xl font-bold text-[#ccff00]">
              {saved.length}
            </p>
          </div>

          <div className="border-b border-white/10 px-5 py-5 sm:border-b-0 sm:border-r">
            <p className="text-[10px] text-gray-500">
              Minutes
            </p>

            <p className="mt-1 text-3xl font-bold">
              {totalMinutes}
            </p>
          </div>

          <div className="px-5 py-5">
            <p className="text-[10px] text-gray-500">
              Calories
            </p>

            <p className="mt-1 text-3xl font-bold">
              {totalCalories}
            </p>
          </div>
        </div>

        {/* Tabs + Sort */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Tabs */}
          <div className="flex w-fit rounded-md border border-white/10 bg-[#13161c] p-1">
            <a
              href="/my-plan"
              className="rounded px-4 py-2 text-[10px] text-gray-500 hover:text-white"
            >
              Today's Plan
            </a>

            <button className="rounded bg-[#ccff00] px-4 py-2 text-[10px] font-medium text-black">
              Saved
            </button>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-500">
              Sort By
            </span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded border border-white/10 bg-[#13161c] px-3 py-2 text-[10px] text-gray-300 outline-none"
            >
              <option value="duration">
                Duration
              </option>

              <option value="calories">
                Calories
              </option>

              <option value="rating">
                Rating
              </option>
            </select>
          </div>
        </div>

        {/* Saved Count */}
        <p className="mt-5 text-xs text-gray-500">
          {saved.length} saved workout
          {saved.length !== 1 ? "s" : ""}
        </p>

        {/* Saved Workouts */}
        {saved.length === 0 ? (
          <div className="mt-3 rounded-lg border border-white/10 bg-[#0f1115] px-4 py-16 text-center sm:px-6">
            <h2 className="text-xs font-bold uppercase">
              NOTHING SAVED YET
            </h2>

            <p className="mt-2 text-[10px] text-gray-500">
              Save workouts from the workout details page to find them here.
            </p>

            <a
              href="/"
              className="mt-5 inline-block rounded-md bg-[#ccff00] px-5 py-2 text-[10px] font-bold uppercase text-black"
            >
              Go to workouts
            </a>
          </div>
        ) : (
          <div className="mt-3 space-y-3">
            {sortedSaved.map((workout) => (
              <div
                key={workout.id}
                className="flex flex-col gap-4 rounded-lg border border-white/10 bg-[#13161c] p-3 sm:flex-row sm:items-center"
              >
                {/* Image */}
                <img
                  src={workout.image}
                  alt={workout.name}
                  className="h-40 w-full rounded-md object-cover sm:h-20 sm:w-28"
                />

                {/* Workout Info */}
                <div className="min-w-0 flex-1">
                  <h2 className="text-xs font-bold uppercase">
                    {workout.name}
                  </h2>

                  <p className="mt-1 text-[9px] text-gray-500">
                    {workout.equipment}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-3 text-[9px] text-gray-400">
                    <span>
                      ◷ {workout.duration} min
                    </span>

                    <span>
                      🔥 {workout.caloriesBurned} kcal
                    </span>

                    <span>
                      ★ {workout.rating}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex w-full items-center gap-2 sm:ml-auto sm:w-auto">
                  <a
                    href={`/workout/${workout.id}`}
                    className="flex-1 rounded-md border border-white/20 px-4 py-2 text-center text-[9px] font-medium text-gray-300 hover:border-white/40 hover:text-white sm:flex-none"
                  >
                    View Details
                  </a>

                  <button
                    onClick={() => removeFromSaved(workout.id)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 text-sm text-gray-500 hover:border-red-400/40 hover:text-red-400"
                    aria-label={`Remove ${workout.name} from saved`}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}