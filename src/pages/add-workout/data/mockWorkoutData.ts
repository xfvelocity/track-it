import { AddWorkoutData } from "../types/addWorkout.types";

export const mockWorkoutData: AddWorkoutData = {
  name: "Push 1",
  time: "43:02",
  comments: "",
  difficulty: 0,
  workouts: [
    {
      name: "Bench Press",
      sets: [
        {
          weight: 20,
          reps: 12,
        },
        {
          weight: 20,
          reps: 12,
        },
        {
          weight: 20,
          reps: 12,
        },
      ],
    },
  ],
};
