<template>
  <xf-text-input
    v-model="meal.name"
    colour="white"
    placeholder="Name"
    outlined
  />

  <h4 class="xf-mt-4 xf-mb-2">Ingredients</h4>
  <hr class="xf-bg-white" />

  <template v-if="meal.ingredients">
    <div v-for="(ingredient, i) in meal.ingredients" :key="i">
      {{ ingredient.name }}
    </div>
  </template>

  <p
    class="xf-p-1 xf-cursor-pointer xf-text-colour-blue xf-fw-600"
    @click="isNutrientModalOpen = true"
  >
    <xf-icon
      class="xf-mr-1"
      src="icons/plus.svg"
      fill="blue"
      style="padding-top: 2px"
    />
    Add ingredient
  </p>

  <xf-button
    class="xf-w-100 xf-mt-15"
    background-colour="green"
    @click="addMeal"
  >
    {{ editing ? 'Update' : 'Add Meal' }}
  </xf-button>

  <!-- <xf-modal
    class="ti-max-width xf-center-horizontal"
    v-model="isNutrientModalOpen"
    background-colour="bg"
    fullscreen
  >
    <h3>Add ingredient</h3>

    <div v-for="(ingredient, i) in []" :key="i">
      {{ ingredient }}
    </div>
  </xf-modal> -->
</template>

<script lang="ts" setup>
  import { onMounted, ref, computed } from 'vue'
  import { useMealStore } from '@/stores/meals'
  import { useConfigStore } from '@/stores/config'
  import { debounce } from '@/helpers/utility'
  import { mealBase } from '@/views/meal-plan/data/mealPlan.data'
  import { Meal, MealNutrients } from '@/views/meal-plan/types/mealPlan.types'

  import { XfTextInput, XfIcon, XfButton, XfModal } from 'xf-cmpt-lib'

  // ** Base **
  const props = defineProps<{
    editing?: boolean
    editingMeal?: Meal
  }>()

  // ** Emits **
  const emit = defineEmits(['return'])

  // ** Data **
  const configStore = useConfigStore()
  const mealStore = useMealStore()

  const meal = ref<Meal>(mealBase)
  const isNutrientModalOpen = ref<boolean>(false)

  const nutrientKeys: (keyof MealNutrients)[] = Object.keys(
    meal.value.nutrients
  ) as (keyof MealNutrients)[]
  const unitOptions: any[] = [
    { text: 'g', value: 'g' },
    { text: 'ml', value: 'ml' },
    { text: 'units', value: 'units' },
  ]

  // ** Computed **
  const ingredientsList = computed<any[]>(() =>
    mealStore.ingredients.map((ingredient: any) => ({
      title: ingredient.name,
      value: ingredient,
    }))
  )

  // ** Methods **
  const toggleIngredientsModal = (): void => {}
  const setSelectedIngredientNutrients = debounce(
    (val: any, index: number): void => {
      const matchingIngredient = ingredientsList.value.find(
        (ingredient) => ingredient.title === val.title
      )

      if (matchingIngredient) {
        meal.value.ingredients[index] = matchingIngredient.value
      }
    },
    300
  )

  const onFocus = (event: any): void => {
    event?.target?.select()
  }

  const addIngredient = (): void => {
    meal.value.ingredients.push({
      amount: null,
      unit: 'g',
      name: '',
      nutrients: {
        calories: null,
        protein: null,
        carbs: null,
        fat: null,
      },
    })
  }

  const deleteIngredient = (index: number): void => {
    if (meal.value.ingredients.length === 1) {
      meal.value.ingredients[index] = {
        amount: null,
        unit: 'g',
        name: '',
        nutrients: {
          calories: null,
          protein: null,
          carbs: null,
          fat: null,
        },
      }
    } else {
      meal.value.ingredients.splice(index, 1)
    }
  }

  const setMealNutrients = (): void => {
    meal.value.nutrients = {
      calories: null,
      protein: null,
      carbs: null,
      fat: null,
    }

    meal.value.ingredients.forEach((ingredient) => {
      nutrientKeys.forEach((key) => {
        if (meal.value.nutrients[key] && ingredient.nutrients[key]) {
          meal.value.nutrients[key]! += ingredient.nutrients[key]!
        } else {
          meal.value.nutrients[key] = ingredient.nutrients[key]
        }
      })
    })
  }

  const addMeal = async (): Promise<void> => {
    setMealNutrients()
    await mealStore[props.editing ? 'editRecipe' : 'addRecipe'](meal.value)

    configStore.$patch({
      color: '',
      text: `${meal.value.name} was ${props.editing ? 'updated' : 'created'}`,
      isVisible: true,
    })

    meal.value = { ...mealBase }
    emit('return')
  }

  // ** Lifecycle **
  onMounted(async () => {
    await mealStore.getIngredients()

    if (
      props.editing &&
      props.editingMeal &&
      Object.keys(props.editingMeal).length > 0
    ) {
      meal.value = props.editingMeal
    }
  })
</script>

<style lang="scss" scoped>
  .xf-create {
    &-ingredient {
      border-radius: 10px;
    }
  }
</style>
