<template>
  <div class="add-workout">
    <div class="add-workout__heading">
      <h3>{{ workout.name }}</h3>
      <p class="secondary">{{ workout.time }}</p>
    </div>
    <div class="add-workout__workouts">
      <Input placeholder="Workout" />
      <Select :options="test" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { mockWorkoutData } from "./data/mockWorkoutData";
import { AddWorkoutData } from "./types/addWorkout.types";

const workout: AddWorkoutData = mockWorkoutData;
const test = [
  {
    text: "Bench Press",
    value: "Bench Press",
  },
  {
    text: "Bench Press",
    value: "Bench Press",
  },
];
</script>

<style lang="scss">
.add-workout {
  margin-top: 10px;

  &__heading {
    color: white;
    display: flex;
    justify-content: space-between;

    h3,
    p {
      margin: 0;
    }
  }
}
</style>
