export const dynamic = "force-dynamic";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default async function Home() {
  let workouts = [];

  try {
    const response = await fetch(
      "https://api.abcz.workers.dev/api/fitlog",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");

    if (!contentType?.includes("application/json")) {
      throw new Error("API did not return JSON");
    }

    workouts = await response.json();

    if (!Array.isArray(workouts)) {
      workouts = [];
    }
  } catch (error) {
    console.error("Workout API error:", error);
    workouts = [];
  }

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl bg-[#181a1c]">
        <div className="flex min-h-[600px] flex-col items-center gap-10 px-4 py-12 sm:px-6 md:flex-row md:gap-12 md:px-10 md:py-16">

          {/* Left Side */}
          <div className="w-full flex-1">
            <p className="mb-5 text-sm font-semibold tracking-[0.2em] text-[#ccff00] sm:tracking-[0.25em]">
              WORKOUT LIBRARY
            </p>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              TRAIN WITH INTENT. LOG
              <br />
              EVERY SET.
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-6 text-gray-400">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today's plan, and watch the week's work add up.
            </p>

            <a
              href="#library"
              className="mt-8 inline-block rounded-md bg-[#ccff00] px-5 py-2 text-xs font-bold uppercase text-black transition hover:bg-[#b8e600]"
            >
              Browse Workouts
            </a>
          </div>

          {/* Right Side */}
          <div className="w-full md:w-1/2">
            <img
              src="/assets/banner.png"
              alt="Workout"
              className="mx-auto w-full max-w-xl"
            />
          </div>

        </div>
      </section>

      {/* Library */}
      <section
        id="library"
        className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12"
      >
        <div className="mb-6">
          <h2 className="text-xl font-bold uppercase">
            THE LIBRARY
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {workouts.length === 0 ? (
          <div className="rounded-lg border border-white/10 bg-[#181a1c] p-8 text-center">
            <p className="text-sm text-gray-400">
              Workout library is temporarily unavailable.
            </p>
            <p className="mt-2 text-xs text-gray-600">
              Please try again later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <a
                key={workout.id}
                href={`/workout/${workout.id}`}
                className="block overflow-hidden rounded-lg border border-white/10 bg-[#181a1c] transition hover:border-[#ccff00]"
              >
                <img
                  src={workout.image}
                  alt={workout.name}
                  className="h-44 w-full object-cover"
                />

                <div className="p-4">

                  {/* Muscle Groups */}
                  <div className="mb-3 flex flex-wrap gap-2">
                    {workout.muscleGroups.map((group) => (
                      <span
                        key={group}
                        className="rounded-full bg-[#ccff00] px-2 py-1 text-[9px] font-bold uppercase text-black"
                      >
                        {group}
                      </span>
                    ))}
                  </div>

                  {/* Workout Name */}
                  <h3 className="text-sm font-bold uppercase">
                    {workout.name}
                  </h3>

                  {/* Equipment */}
                  <p className="mt-1 text-[10px] text-gray-500">
                    {workout.equipment}
                  </p>

                  {/* Stats */}
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-3 text-[10px] text-gray-400">
                    <span>◷ {workout.duration} min</span>
                    <span>🔥 {workout.caloriesBurned} kcal</span>
                    <span>★ {workout.rating}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}