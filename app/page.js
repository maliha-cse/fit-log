import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const dynamic = "force-dynamic";

export default async function Home() {
  let workouts = [];

  try {
    const response = await fetch(
      "https://api.abcz.workers.dev/api/fitlog",
      {
        cache: "no-store",
      }
    );

    if (response.ok) {
      const data = await response.json();

      if (Array.isArray(data)) {
        workouts = data;
      }
    } else {
      console.error("Workout API error:", response.status);
    }
  } catch (error) {
    console.error("Failed to load workouts:", error);
  }

  return (
    <main>
      <Navbar />

      {/* Hero */}
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
          <div className="w-1/2">
            <img
              src="/assets/banner.png"
              alt="Workout"
              className="w-full"
            />
          </div>

        </div>
      </section>

      {/* Library */}
      <section
        id="library"
        className="mx-auto max-w-7xl px-6 py-12"
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
                    {workout.muscleGroups?.map((group) => (
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
                  <div className="mt-4 flex items-center gap-4 border-t border-white/10 pt-3 text-[10px] text-gray-400">
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
              </a>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}