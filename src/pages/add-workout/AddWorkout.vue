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
          :options="workoutsList"
        />
        <div class="sets">
          <span v-for="(set, i) in wrkOut.sets">
            <Input v-model="set.weight" class="wgt" placeholder="WGT" />
            <Input v-model="set.reps" class="rps" placeholder="RPS" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { Select } from "@/shared/types/globalTypes";
import { mockWorkoutData, mockWorkouts } from "./data/mockWorkoutData";
import { AddWorkoutData } from "./types/addWorkout.types";

const workout: AddWorkoutData = mockWorkoutData;
const workoutsList: any[] = mockWorkouts;
</script>

<style lang="scss">
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
        width: 180px;
      }

      .sets {
        display: flex;
        flex-direction: column;

        .wgt,
        .rps {
          width: 60px;
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
