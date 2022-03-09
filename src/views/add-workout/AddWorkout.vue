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
        <v-select
          class="workout-type"
          v-model="exercise.workoutTypeID"
          :label="exerciseIndex === 0 ? 'Workout' : ''"
          :options="workoutsList"
          style="width: 100%"
        />
        <div class="sets">
          <div v-for="(set, setIndex) in exercise.sets">
            <v-text-field
              v-model="set.weight"
              inputType="number"
              class="wgt"
              :label="setIndex === 0 ? 'KG' : ''"
            />
            <v-text-field
              v-model="set.reps"
              inputType="number"
              class="rps"
              :label="setIndex === 0 ? 'Reps' : ''"
            />
          </div>
        </div>

        <v-btn class="w-100 mt-2" color="primary" @click="addSet(exercise)">
          Add Set
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { emptyWorkoutData, mockWorkouts } from './data/mockWorkoutData'
  import { AddWorkoutData, AddWorkoutWorkout } from './types/addWorkout.types'

  export default defineComponent({
    name: 'AddWorkout',
    setup() {
      const workout = ref<AddWorkoutData>(emptyWorkoutData)
      const workoutsList: any[] = mockWorkouts

      const addSet = (wrkOut: AddWorkoutWorkout) => {
        wrkOut.sets.push({
          weight: '',
          reps: '',
        })
      }

      return {
        workout,
        workoutsList,
        addSet,
      }
    },
  })
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
      }
    }
  }
</style>
