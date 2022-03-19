<template>
  <div>
    <div class="d-flex align-center">
      <p class="my-0 text-body-2">23rd June 2021</p>
      <v-spacer />
      <v-btn
        variant="text"
        size="small"
        @click="$router.push('/meal-prep/add-meal')"
      >
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
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import MealExpansionPanel from '../components/MealExpansionPanel.vue'

  export default defineComponent({
    name: 'MealPlan',
    components: { MealExpansionPanel },
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
      return {
        mockPlan,
      }
    },
  })
</script>
