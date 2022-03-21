<template>
  <div>
    <div class="d-flex align-center">
      <p class="my-0 text-body-2">{{ date }}</p>
      <v-spacer />
    </div>

    <div class="mt-4">
      <div v-for="(key, i) in keys" :key="i" class="text-capitalize mb-6">
        <div class="d-flex align-center">
          <h4>{{ key }}</h4>
          <v-spacer />
          <v-icon
            class="ml-1 cursor-pointer"
            color="white"
            size="small"
            @click="toggleAddMealModal(key)"
          >
            mdi-plus
          </v-icon>
        </div>

        <MealExpansionPanel
          v-if="mealPlan"
          :meal-list="mealPlan[key]"
          :show-edit="false"
        />
      </div>
    </div>

    <AddMeal
      v-model="isAddMealOpen"
      @meal-added="addMeal"
      @close="isAddMealOpen = false"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, onBeforeMount, ref } from 'vue'
  import MealExpansionPanel from './components/MealExpansionPanel.vue'
  import AddMeal from './add-meal/AddMeal.vue'
  import { Store, useStore } from 'vuex'
  import { Meal, MealPlan } from './types/mealPlan.types'
  import { mealPlanBase } from './data/mealPlan.data'

  export default defineComponent({
    name: 'MealPlan',
    components: { MealExpansionPanel, AddMeal },
    setup() {
      const store: Store<any> = useStore()

      const mealPlan = ref<MealPlan>(mealPlanBase)
      const date = ref<string>('')
      const isAddMealOpen = ref<boolean>(false)
      const selectedMealTime = ref<string>('')
      const keys: (keyof MealPlan)[] = ['breakfast', 'lunch', 'dinner']

      onBeforeMount(async () => {
        const today: Date = new Date()
        date.value = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`

        mealPlan.value = await store.dispatch('getMeals', date.value)
      })

      const toggleAddMealModal = (mealTime: string): void => {
        selectedMealTime.value = mealTime
        isAddMealOpen.value = true
      }

      const addMeal = async (meal: Meal): Promise<void> => {
        await store.dispatch('addMeal', {
          meal,
          time: selectedMealTime.value,
          date: date.value,
          mealPlan: mealPlan.value,
        })

        isAddMealOpen.value = false
      }

      return {
        isAddMealOpen,
        keys,
        toggleAddMealModal,
        date,
        mealPlan,
        selectedMealTime,
        addMeal,
      }
    },
  })
</script>
