"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FitLogContext = createContext();

export function FitLogProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [ready, setReady] = useState(false);

  // Load saved data from localStorage
  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");

    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    }

    if (storedSaved) {
      setSaved(JSON.parse(storedSaved));
    }

    setReady(true);
  }, []);

  // Save plan to localStorage
  useEffect(() => {
    if (ready) {
      localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    }
  }, [plan, ready]);

  // Save saved workouts to localStorage
  useEffect(() => {
    if (ready) {
      localStorage.setItem("fitlog-saved", JSON.stringify(saved));
    }
  }, [saved, ready]);

  // Add workout to today's plan
  const addToPlan = (workout) => {
    setPlan((currentPlan) => {
      const alreadyAdded = currentPlan.some(
        (item) => item.id === workout.id
      );

      if (alreadyAdded) {
        return currentPlan;
      }

      return [...currentPlan, workout];
    });
  };

  // Remove workout from today's plan
  const removeFromPlan = (workoutId) => {
    setPlan((currentPlan) =>
      currentPlan.filter((workout) => workout.id !== workoutId)
    );
  };

  // Save workout for later
  const saveWorkout = (workout) => {
    setSaved((currentSaved) => {
      const alreadySaved = currentSaved.some(
        (item) => item.id === workout.id
      );

      if (alreadySaved) {
        return currentSaved;
      }

      return [...currentSaved, workout];
    });
  };

  // Remove workout from saved
  const removeFromSaved = (workoutId) => {
    setSaved((currentSaved) =>
      currentSaved.filter((workout) => workout.id !== workoutId)
    );
  };

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        saveWorkout,
        removeFromSaved,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  return useContext(FitLogContext);
}