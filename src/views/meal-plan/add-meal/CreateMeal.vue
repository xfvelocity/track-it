<template>
  <xf-text-input
    v-model="creatingMeal.name"
    colour="white"
    placeholder="Name"
    outlined
  />

  <h4 class="xf-mt-4 xf-mb-2">Ingredients</h4>
  <hr class="xf-bg-white" />

  <template v-if="creatingMeal.ingredients">
    <div
      v-for="(ingredient, i) in creatingMeal.ingredients"
      :key="i"
      class="xf-pl-1"
    >
      <p>{{ formatIngredient(ingredient) }}</p>
    </div>
  </template>

  <p
    class="xf-p-1 xf-cursor-pointer xf-text-colour-blue xf-fw-600"
    @click="router.push('/add-meal/add-ingredient')"
  >
    <xf-icon
      class="xf-mt-1 xf-mr-1"
      src="icons/plus.svg"
      fill="blue"
      style="padding-top: 2px"
    />
    Add ingredient
  </p>

  <h4 class="xf-mt-8 xf-mb-2">Macros</h4>
  <hr class="xf-bg-white" />

  <div class="create-meal-macros xf-px-2">
    <div
      v-for="(nutrient, name, i) in calculatedMacros"
      :key="i"
      class="xf-text-center"
    >
      <p class="xf-text-capitalize xf-text-14 xf-fw-700 xf-mb-1">
        {{ name }}
      </p>

      <p class="xf-text-14">{{ nutrient }}</p>
    </div>
  </div>

  <xf-button
    class="xf-w-100 xf-mt-8"
    background-colour="green"
    @click="addMeal"
  >
    Add Meal
  </xf-button>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useMealStore } from '@/stores/meals'
  import { storeToRefs } from 'pinia'
  import { useRouter } from 'vue-router'
  import { Ingredient, IngredientMacros } from './types/addMeal.types'

  import { XfTextInput, XfIcon, XfButton } from 'xf-cmpt-lib'

  // ** Data **
  const router = useRouter()
  const mealStore = useMealStore()

  const { creatingMeal } = storeToRefs(mealStore)

  // ** Methods **
  const calculateMacros = (): IngredientMacros => {
    let macros: IngredientMacros = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    }

    creatingMeal.value.ingredients.forEach((ingredient: any) => {
      Object.keys(creatingMeal.value.macros).forEach((key) => {
        macros[key as keyof IngredientMacros] += parseInt(
          ingredient.macros[key]
        )
      })
    })

    creatingMeal.value.macros = macros

    return macros
  }

  // ** Computed **
  const calculatedMacros = computed<IngredientMacros>(calculateMacros)

  const formatIngredient = (ingredient: Ingredient): string => {
    const unit: string = ingredient.unit === 'unit' ? '' : ingredient.unit

    return `${ingredient.amount}${unit} ${ingredient.name}`
  }

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

<script></script>
