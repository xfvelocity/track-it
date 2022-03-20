<template>
  <div>
    <div class="d-flex align-center">
      <p class="my-0 text-body-2">{{ date }}</p>
      <v-spacer />
    </div>

    <div class="mt-4">
      <div
        v-for="(plan, i) in Object.keys(mockPlan)"
        :key="i"
        class="text-capitalize mb-6"
      >
        <div class="d-flex align-center">
          <h4>{{ plan }}</h4>
          <v-spacer />
          <v-icon
            class="ml-1"
            color="white"
            size="small"
            @click="toggleAddMealModal(plan)"
          >
            mdi-plus
          </v-icon>
        </div>

        <MealExpansionPanel :meal-list="mockPlan[plan]" :show-edit="false" />
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
  import { defineComponent, onMounted, ref } from 'vue'
  import MealExpansionPanel from './components/MealExpansionPanel.vue'
  import AddMeal from './add-meal/AddMeal.vue'
  import { Store, useStore } from 'vuex'
  import { Meal } from './add-meal/create-meal/types/CreateMeal.types'

  export default defineComponent({
    name: 'MealPlan',
    components: { MealExpansionPanel, AddMeal },
    setup() {
      const mockPlan = {
        breakfast: [
          {
            id: 'cE7lg7RKWXih5BsG74L2',
            img: '',
            ingredients: [{ unit: 'g', name: 'Protein Powder', amount: 20 }],
            instructions: [],
            name: 'Protein Shake',
            nutrients: { protein: 20, carbs: 30, fat: 0, calories: 98 },
          },
        ],
        lunch: [],
        dinner: [],
      }

      const store: Store<any> = useStore()

      const date = ref<string>('')
      const isAddMealOpen = ref<boolean>(false)
      const selectedMealTime = ref<string>('')

      onMounted(() => {
        const today = new Date()

        date.value = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`
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
        })

        isAddMealOpen.value = false
      }

      return {
        isAddMealOpen,
        toggleAddMealModal,
        date,
        mockPlan,
        selectedMealTime,
        addMeal,
      }
    },
  })
</script>
