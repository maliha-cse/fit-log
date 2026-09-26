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
      <main>
        <Navbar />

        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-gray-400">Loading workout...</p>
        </div>
      </main>
    );
  }

  if (!workout) {
    return (
      <main>
        <Navbar />

        <div className="mx-auto max-w-7xl px-6 py-20">
          <h1 className="text-3xl font-bold">Workout not found.</h1>
        </div>
      </main>
    );
  }
  const alreadyInPlan = plan.some(
    (item) => String(item.id) === String(workout.id)
  );
  return (
    <main>
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Image */}
          <div>
            <img
              src={workout.image}
              alt={workout.name}
              className="w-full rounded-xl object-cover"
            />
          </div>

          {/* Details */}
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {workout.muscleGroups?.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-semibold text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            <h1 className="text-4xl font-bold uppercase tracking-tight text-white">
              {workout.name}
            </h1>

            <p className="mt-5 leading-7 text-gray-400">
              {workout.description}
            </p>

            {/* Key Specs */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-white/10 p-4">
                <p className="text-xs text-gray-500">Equipment</p>
                <p className="mt-1 font-medium">{workout.equipment}</p>
              </div>

              <div className="rounded-lg border border-white/10 p-4">
                <p className="text-xs text-gray-500">Difficulty</p>
                <p className="mt-1 font-medium">{workout.difficulty}</p>
              </div>

              <div className="rounded-lg border border-white/10 p-4">
                <p className="text-xs text-gray-500">Sets</p>
                <p className="mt-1 font-medium">{workout.sets}</p>
              </div>

              <div className="rounded-lg border border-white/10 p-4">
                <p className="text-xs text-gray-500">Reps</p>
                <p className="mt-1 font-medium">{workout.reps}</p>
              </div>

              <div className="rounded-lg border border-white/10 p-4">
                <p className="text-xs text-gray-500">Duration</p>
                <p className="mt-1 font-medium">{workout.duration} min</p>
              </div>

              <div className="rounded-lg border border-white/10 p-4">
                <p className="text-xs text-gray-500">Calories</p>
                <p className="mt-1 font-medium">
                  {workout.caloriesBurned} kcal
                </p>
              </div>

              <div className="rounded-lg border border-white/10 p-4">
                <p className="text-xs text-gray-500">Rating</p>
                <p className="mt-1 font-medium">★ {workout.rating}</p>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold">How to do it</h2>

              <div className="mt-5 space-y-4">
                {workout.instructions?.map((instruction, index) => (
                  <div key={index} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ccff00] font-bold text-black">
                      {index + 1}
                    </span>

                    <p className="pt-1 text-gray-400">{instruction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  if (alreadyInPlan) {
                    toast.info("Already in your plan!");
                    return;
                  }

                  addToPlan(workout);
                  toast.success("Added to today's plan!");
                }}
                className={`rounded-lg px-6 py-3 font-bold transition ${alreadyInPlan
                    ? "cursor-not-allowed bg-gray-700 text-gray-400"
                    : "bg-[#ccff00] text-black hover:opacity-90"
                  }`}
              >
                {alreadyInPlan ? "Already in your plan" : "Add to today's plan"}
              </button>

              <button
                onClick={() => {
                  saveWorkout(workout);
                  toast.success("Saved for later!");
                }}
                className="rounded-lg border border-white/30 px-6 py-3 font-bold text-white transition hover:border-[#ccff00]"
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