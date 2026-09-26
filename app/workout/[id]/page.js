"use client";

import Footer from "../../components/Footer";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useFitLog } from "../../context/FitLogContext";

export default function WorkoutDetails({ params }) {
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  const { plan, addToPlan, saveWorkout } = useFitLog();

  useEffect(() => {
    async function loadWorkout() {
      const { id } = await params;

      const response = await fetch(
        `https://api.abcz.workers.dev/api/fitlog/${id}`
      );

      if (response.ok) {
        const data = await response.json();
        setWorkout(data);
      }

      setLoading(false);
    }

    loadWorkout();
  }, [params]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0d0f12] text-white">
        <Navbar />

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-sm text-gray-400">Loading workout...</p>
        </div>

        <Footer />
      </main>
    );
  }

  if (!workout) {
    return (
      <main className="min-h-screen bg-[#0d0f12] text-white">
        <Navbar />

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Workout not found.
          </h1>
        </div>

        <Footer />
      </main>
    );
  }

  const alreadyInPlan = plan.some(
    (item) => String(item.id) === String(workout.id)
  );

  return (
    <main className="min-h-screen bg-[#0d0f12] text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image */}
          <div>
            <img
              src={workout.image}
              alt={workout.name}
              className="h-auto max-h-[500px] w-full rounded-xl object-cover"
            />
          </div>

          {/* Details */}
          <div>
            {/* Muscle Groups */}
            <div className="mb-4 flex flex-wrap gap-2">
              {workout.muscleGroups?.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#ccff00] px-3 py-1 text-[10px] font-semibold uppercase text-black sm:text-xs"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-4 text-sm leading-6 text-gray-400 sm:mt-5 sm:text-base sm:leading-7">
              {workout.description}
            </p>

            {/* Key Specs */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-white/10 p-3 sm:p-4">
                <p className="text-[10px] text-gray-500 sm:text-xs">
                  Equipment
                </p>
                <p className="mt-1 break-words text-sm font-medium sm:text-base">
                  {workout.equipment}
                </p>
              </div>

              <div className="rounded-lg border border-white/10 p-3 sm:p-4">
                <p className="text-[10px] text-gray-500 sm:text-xs">
                  Difficulty
                </p>
                <p className="mt-1 text-sm font-medium sm:text-base">
                  {workout.difficulty}
                </p>
              </div>

              <div className="rounded-lg border border-white/10 p-3 sm:p-4">
                <p className="text-[10px] text-gray-500 sm:text-xs">
                  Sets
                </p>
                <p className="mt-1 text-sm font-medium sm:text-base">
                  {workout.sets}
                </p>
              </div>

              <div className="rounded-lg border border-white/10 p-3 sm:p-4">
                <p className="text-[10px] text-gray-500 sm:text-xs">
                  Reps
                </p>
                <p className="mt-1 text-sm font-medium sm:text-base">
                  {workout.reps}
                </p>
              </div>

              <div className="rounded-lg border border-white/10 p-3 sm:p-4">
                <p className="text-[10px] text-gray-500 sm:text-xs">
                  Duration
                </p>
                <p className="mt-1 text-sm font-medium sm:text-base">
                  {workout.duration} min
                </p>
              </div>

              <div className="rounded-lg border border-white/10 p-3 sm:p-4">
                <p className="text-[10px] text-gray-500 sm:text-xs">
                  Calories
                </p>
                <p className="mt-1 text-sm font-medium sm:text-base">
                  {workout.caloriesBurned} kcal
                </p>
              </div>

              <div className="col-span-2 rounded-lg border border-white/10 p-3 sm:col-span-1 sm:p-4">
                <p className="text-[10px] text-gray-500 sm:text-xs">
                  Rating
                </p>
                <p className="mt-1 text-sm font-medium sm:text-base">
                  ★ {workout.rating}
                </p>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-8 sm:mt-10">
              <h2 className="text-xl font-bold sm:text-2xl">
                How to do it
              </h2>

              <div className="mt-4 space-y-4 sm:mt-5">
                {workout.instructions?.map((instruction, index) => (
                  <div key={index} className="flex items-start gap-3 sm:gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-xs font-bold text-black sm:h-8 sm:w-8">
                      {index + 1}
                    </span>

                    <p className="pt-0.5 text-sm leading-6 text-gray-400 sm:pt-1 sm:text-base sm:leading-7">
                      {instruction}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
              <button
                onClick={() => {
                  if (alreadyInPlan) {
                    toast.info("Already in your plan!");
                    return;
                  }

                  addToPlan(workout);
                  toast.success("Added to today's plan!");
                }}
                className={`w-full rounded-lg px-6 py-3 text-sm font-bold transition sm:w-auto ${
                  alreadyInPlan
                    ? "cursor-not-allowed bg-gray-700 text-gray-400"
                    : "bg-[#ccff00] text-black hover:opacity-90"
                }`}
              >
                {alreadyInPlan
                  ? "Already in your plan"
                  : "Add to today's plan"}
              </button>

              <button
                onClick={() => {
                  saveWorkout(workout);
                  toast.success("Saved for later!");
                }}
                className="w-full rounded-lg border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:border-[#ccff00] sm:w-auto"
              >
                Save for later
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}