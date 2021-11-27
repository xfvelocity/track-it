<template>
  <div class="add-workout">
    <div class="add-workout__heading">
      <h3>{{ workout.name }}</h3>
      <p class="secondary">{{ workout.time }}</p>
    </div>
    <div class="add-workout__workouts">
      <div
        class="workout"
        v-for="(exercise, exerciseIndex) in workout.exercises"
      >
        <Select
          class="workout-type"
          v-model="exercise.workoutTypeID"
          :label="exerciseIndex === 0 ? 'Workout' : ''"
          :options="workoutsList"
          selectStyle="width: 100%"
        />
        <div class="sets">
          <div v-for="(set, setIndex) in exercise.sets">
            <Input
              v-model="set.weight"
              inputType="number"
              class="wgt"
              :label="setIndex === 0 ? 'KG' : ''"
            />
            <Input
              v-model="set.reps"
              inputType="number"
              class="rps"
              :label="setIndex === 0 ? 'Reps' : ''"
            />
          </div>
        </div>
        <div class="add-set">
          <Button class="width100" text="Add Set" @click="addSet(exercise)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { emptyWorkoutData, mockWorkouts } from "./data/mockWorkoutData";
import { AddWorkoutData, AddWorkoutWorkout } from "./types/addWorkout.types";

const workout = ref<AddWorkoutData>(emptyWorkoutData);
const workoutsList: any[] = mockWorkouts;

const addSet = (wrkOut: AddWorkoutWorkout) => {
  wrkOut.sets.push({
    weight: "",
    reps: "",
  });
};
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
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: 10px;

      .workout-type {
        min-width: 180px;
      }

      .sets {
        display: flex;
        flex-direction: column;

        .wgt,
        .rps {
          max-width: 60px !important;
          margin-bottom: 7px;
        }

        .wgt {
          margin-right: 10px;
        }
      }

      .add-set {
        width: 100%;
        margin-top: 5px;
      }
    }
  }
}
</style>
