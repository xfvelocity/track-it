<template>
  <meal-card-details :meal="creatingMeal" editing-meal />

  <xf-button
    class="xf-w-100 xf-mt-8"
    background-colour="green"
    @click="addMeal"
  >
    Add Meal
  </xf-button>
</template>

<script lang="ts" setup>
  import { useMealStore } from '@/stores/meals'
  import { storeToRefs } from 'pinia'
  import { useRouter } from 'vue-router'

  import { XfButton } from 'xf-cmpt-lib'
  import MealCardDetails from '@/components/meal-card/MealCardDetails.vue'

  // ** Data **
  const router = useRouter()
  const mealStore = useMealStore()

  const { creatingMeal } = storeToRefs(mealStore)

  // ** Methods **
  const addMeal = async (): Promise<void> => {
    await mealStore.addMeal()

    router.push('/add-meal')
  }
  // import { onMounted, ref, computed } from 'vue'
  // import { useMealStore } from '@/stores/meals'
  // import { useConfigStore } from '@/stores/config'
  // import { debounce } from '@/helpers/utility'
  // import { mealBase } from '@/views/meal-plan/data/mealPlan.data'
  // import { Meal, MealNutrients } from '@/views/meal-plan/types/mealPlan.types'
  // import { useRouter } from 'vue-router'

  // import { XfTextInput, XfIcon, XfButton } from 'xf-cmpt-lib'

  // // ** Base **
  // const props = defineProps<{
  //   editing?: boolean
  //   editingMeal?: Meal
  // }>()

  // // ** Emits **
  // const emit = defineEmits(['return'])

  // // ** Data **
  // const router = useRouter()
  // const configStore = useConfigStore()
  // const mealStore = useMealStore()

  // const meal = ref<Meal>(mealBase)

  // const nutrientKeys: (keyof MealNutrients)[] = Object.keys(
  //   meal.value.nutrients
  // ) as (keyof MealNutrients)[]
  // const unitOptions: any[] = [
  //   { text: 'g', value: 'g' },
  //   { text: 'ml', value: 'ml' },
  //   { text: 'units', value: 'units' },
  // ]

  // // ** Computed **
  // const ingredientsList = computed<any[]>(() =>
  //   mealStore.ingredients.map((ingredient: any) => ({
  //     title: ingredient.name,
  //     value: ingredient,
  //   }))
  // )

  // // ** Methods **
  // const setSelectedIngredientNutrients = debounce(
  //   (val: any, index: number): void => {
  //     const matchingIngredient = ingredientsList.value.find(
  //       (ingredient) => ingredient.title === val.title
  //     )

  //     if (matchingIngredient) {
  //       meal.value.ingredients[index] = matchingIngredient.value
  //     }
  //   },
  //   300
  // )

  // const onFocus = (event: any): void => {
  //   event?.target?.select()
  // }

  // const addIngredient = (): void => {
  //   meal.value.ingredients.push({
  //     amount: null,
  //     unit: 'g',
  //     name: '',
  //     nutrients: {
  //       calories: null,
  //       protein: null,
  //       carbs: null,
  //       fat: null,
  //     },
  //   })
  // }

  // const deleteIngredient = (index: number): void => {
  //   if (meal.value.ingredients.length === 1) {
  //     meal.value.ingredients[index] = {
  //       amount: null,
  //       unit: 'g',
  //       name: '',
  //       nutrients: {
  //         calories: null,
  //         protein: null,
  //         carbs: null,
  //         fat: null,
  //       },
  //     }
  //   } else {
  //     meal.value.ingredients.splice(index, 1)
  //   }
  // }

  // const setMealNutrients = (): void => {
  //   meal.value.nutrients = {
  //     calories: null,
  //     protein: null,
  //     carbs: null,
  //     fat: null,
  //   }

  //   meal.value.ingredients.forEach((ingredient) => {
  //     nutrientKeys.forEach((key) => {
  //       if (meal.value.nutrients[key] && ingredient.nutrients[key]) {
  //         meal.value.nutrients[key]! += ingredient.nutrients[key]!
  //       } else {
  //         meal.value.nutrients[key] = ingredient.nutrients[key]
  //       }
  //     })
  //   })
  // }

  // const addMeal = async (): Promise<void> => {
  //   setMealNutrients()
  //   await mealStore[props.editing ? 'editRecipe' : 'addRecipe'](meal.value)

  //   configStore.$patch({
  //     color: '',
  //     text: `${meal.value.name} was ${props.editing ? 'updated' : 'created'}`,
  //     isVisible: true,
  //   })

  //   meal.value = { ...mealBase }
  //   emit('return')
  // }

  // // ** Lifecycle **
  // onMounted(async () => {
  //   await mealStore.getIngredients()

  //   if (
  //     props.editing &&
  //     props.editingMeal &&
  //     Object.keys(props.editingMeal).length > 0
  //   ) {
  //     meal.value = props.editingMeal
  //   }
  // })
</script>

<style lang="scss" scoped>
  .create-meal {
    &-macros {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }
</style>
