"use client";

import { useEffect, useState } from "react";
import { useFitLog } from "../../context/FitLogContext";

export default function WorkoutDetails({ params }) {
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToPlan, saveWorkout } = useFitLog();

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
      <main className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-gray-400">Loading workout...</p>
      </main>
    );
  }

  if (!workout) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="text-3xl font-bold">Workout not found.</h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-12 md:grid-cols-2">

        {/* Image */}
        <div>
          <img
            src={workout.image}
            alt={workout.name}
            className="w-full rounded-lg object-cover"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-4xl font-bold uppercase">
            {workout.name}
          </h1>

          <p className="mt-5 text-sm leading-7 text-gray-400">
            {workout.description}
          </p>

          {/* Muscle Groups */}
          <div className="mt-6 flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-bold uppercase text-black"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Key Specs */}
          <div className="mt-8 grid grid-cols-2 gap-4 border-y border-white/10 py-6 text-sm">
            <div>
              <p className="text-gray-500">Equipment</p>
              <p className="mt-1 font-semibold">{workout.equipment}</p>
            </div>

            <div>
              <p className="text-gray-500">Difficulty</p>
              <p className="mt-1 font-semibold">{workout.difficulty}</p>
            </div>

            <div>
              <p className="text-gray-500">Sets</p>
              <p className="mt-1 font-semibold">{workout.sets}</p>
            </div>

            <div>
              <p className="text-gray-500">Reps</p>
              <p className="mt-1 font-semibold">{workout.reps}</p>
            </div>

            <div>
              <p className="text-gray-500">Duration</p>
              <p className="mt-1 font-semibold">
                {workout.duration} min
              </p>
            </div>

            <div>
              <p className="text-gray-500">Calories</p>
              <p className="mt-1 font-semibold">
                {workout.caloriesBurned} kcal
              </p>
            </div>

            <div>
              <p className="text-gray-500">Rating</p>
              <p className="mt-1 font-semibold">
                ★ {workout.rating}
              </p>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8">
            <h2 className="text-lg font-bold uppercase">
              HOW TO DO IT
            </h2>

            <div className="mt-5 space-y-4">
              {workout.instructions?.map((instruction, index) => (
                <div key={index} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-xs font-bold text-black">
                    {index + 1}
                  </span>

                  <p className="text-sm leading-6 text-gray-400">
                    {instruction}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => addToPlan(workout)}
              className="rounded-md bg-[#ccff00] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#b8e600]"
            >
              Add to today's plan
            </button>

            <button
              onClick={() => saveWorkout(workout)}
              className="rounded-md border border-white/20 px-5 py-3 text-sm font-bold transition hover:border-white/50"
            >
              Save for later
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}