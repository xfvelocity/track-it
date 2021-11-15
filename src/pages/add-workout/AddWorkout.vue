<template>
  <div class="add-workout">
    <div class="add-workout__heading">
      <h3>{{ workout.name }}</h3>
      <p class="secondary">{{ workout.time }}</p>
    </div>
    <div class="add-workout__workouts">
      <div class="workout" v-for="(wrkOut, i) in workout.workouts">
        <Select
          class="workout-type"
          v-model="wrkOut.workoutTypeID"
          :label="i === 0 ? 'Workout' : ''"
          :options="workoutsList"
        />
        <div class="sets">
          <div v-for="(set, i) in wrkOut.sets">
            <Input
              v-model="set.weight"
              class="wgt"
              :label="i === 0 ? 'WGT' : ''"
              placeholder="WGT"
            />
            <Input
              v-model="set.reps"
              class="rps"
              :label="i === 0 ? 'RPS' : ''"
              placeholder="RPS"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { Select } from "@/shared/types/globalTypes";
import {
  emptyWorkoutData,
  mockWorkoutData,
  mockWorkouts,
} from "./data/mockWorkoutData";
import { AddWorkoutData } from "./types/addWorkout.types";

// const workout: AddWorkoutData = mockWorkoutData;
const workout: AddWorkoutData = emptyWorkoutData;
const workoutsList: any[] = mockWorkouts;
</script>

<style lang="scss" scoped>
.add-workout {
  margin-top: 10px;

  &__heading {
    color: white;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    h3,
    p {
      margin: 0;
    }
  }

  &__workouts {
    .workout {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 10px;

      .workout-type {
        width: 200px;

        select {
          width: 100% !important;
        }
      }

      .sets {
        display: flex;
        flex-direction: column;

        .wgt,
        .rps {
          max-width: 60px !important;
          margin-bottom: 5px;
        }

        .wgt {
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
