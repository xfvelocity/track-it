export type AddWorkoutData = {
  name: string;
  time: string;
  comments: string;
  difficulty: number;
  workouts: AddWorkoutWorkout[];
};

export type AddWorkoutWorkout = {
  name: string;
  sets: AddWorkoutSets[];
};

export type AddWorkoutSets = {
  weight: number;
  reps: number;
};
