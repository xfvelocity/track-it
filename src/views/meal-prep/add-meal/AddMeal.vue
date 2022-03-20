<template>
  <v-dialog class="add-meal" v-model="modelValue" fullscreen>
    <v-card>
      <v-icon class="ml-2 mt-2" size="large" @click="backToggled">
        mdi-chevron-left
      </v-icon>

      <CreateMeal
        v-if="createMeal"
        :editing="isEditing"
        :editing-meal="selectedMeal"
        @return="createMeal = false"
      />

      <div class="pa-4" v-else>
        <div class="d-flex justify-space-between align-center mb-4">
          <h2>Meals</h2>
          <v-btn variant="text" size="small" @click="createMeal = true">
            Create Meal
            <v-icon class="ml-1">mdi-plus</v-icon>
          </v-btn>
        </div>

        <div class="d-flex flex-wrap justify-space-between">
          <MealExpansionPanel
            :meal-list="mealList"
            @meal-added="($event) => $emit('meal-added', $event)"
            @edit="editMeal"
            @delete="deleteMeal"
          />
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { defineComponent, onBeforeMount, ref } from 'vue'
  import { Store, useStore } from 'vuex'
  import { Meal } from './create-meal/types/CreateMeal.types'

  import MealExpansionPanel from '../components/MealExpansionPanel.vue'
  import CreateMeal from './create-meal/CreateMeal.vue'

  export default defineComponent({
    name: 'AddMeal',
    components: { MealExpansionPanel, CreateMeal },
    props: {
      modelValue: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['close', 'meal-added'],
    setup(props, context) {
      const store: Store<any> = useStore()

      const mealList = ref<Meal[]>([])
      const createMeal = ref<boolean>(false)
      const selectedMeal = ref<Meal>()
      const isEditing = ref<boolean>(false)

      const getMeals = async (): Promise<void> => {
        mealList.value = await store.dispatch('getRecipes')
      }

      const editMeal = (meal: Meal): void => {
        selectedMeal.value = meal
        isEditing.value = true
        createMeal.value = true
      }

      const deleteMeal = (meal: Meal): void => {
        store.dispatch('delRecipe', meal)
      }

      const backToggled = (): void => {
        if (createMeal.value) {
          createMeal.value = false
        } else {
          context.emit('close')
        }
      }

      onBeforeMount(getMeals)

      return {
        mealList,
        selectedMeal,
        isEditing,
        createMeal,
        backToggled,
        editMeal,
        deleteMeal,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .add-meal {
    .v-card {
      background: rgb(9, 0, 66) !important;
      background: linear-gradient(
        144deg,
        rgba(9, 0, 66, 1) 0%,
        rgba(11, 0, 78, 1) 100%
      ) !important;
    }
  }
</style>
