import { Select } from "@/shared/types/globalTypes";
import { AddWorkoutData } from "../types/addWorkout.types";

export const mockWorkoutData: AddWorkoutData = {
  name: "Push 1",
  time: "43:02",
  comments: "",
  difficulty: 0,
  workouts: [
    {
      workoutType: "Bench Press",
      workoutTypeID: 0,
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
    {
      workoutType: "Bicep Curl",
      workoutTypeID: 1,
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

export const mockWorkouts: Select[] = [
  {
    text: "Bench Press",
    value: 0,
  },
  {
    text: "Bicep Curl",
    value: 1,
  },
];
