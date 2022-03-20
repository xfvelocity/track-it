<template>
  <div>
    <div class="d-flex align-center">
      <p class="my-0 text-body-2">{{ date }}</p>
      <v-spacer />
      <v-btn variant="text" size="small" @click="isAddMealOpen = true">
        Add Meal
        <v-icon class="ml-1" color="white">mdi-plus</v-icon>
      </v-btn>
    </div>

    <div class="mt-4">
      <div
        v-for="(plan, i) in Object.keys(mockPlan)"
        :key="i"
        class="text-capitalize mb-4"
      >
        <h4>{{ plan }}</h4>
        <MealExpansionPanel :meal-list="mockPlan[plan]" :show-edit="false" />
      </div>
    </div>

    <AddMeal v-model="isAddMealOpen" @close="isAddMealOpen = false" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'
  import MealExpansionPanel from './components/MealExpansionPanel.vue'
  import AddMeal from './add-meal/AddMeal.vue'

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

      const date = ref<string>('')
      const isAddMealOpen = ref<boolean>(false)

      onMounted(() => {
        const today = new Date()

        date.value = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`
      })

      return {
        isAddMealOpen,
        date,
        mockPlan,
      }
    },
  })
</script>
