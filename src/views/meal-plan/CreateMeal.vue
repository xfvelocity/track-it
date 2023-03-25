<template>
  <xf-text-input v-model="meal.name" colour="white" label="Meal name" />

  <h4 class="xf-mt-4 xf-mb-2 xf-text-center">Ingredients</h4>

  <div
    class="xf-create-ingredient xf-px-4 xf-mb-1 xf-border-grey-darken-2 xf-grid"
    v-for="(ingredient, i) in meal.ingredients"
    :key="i"
  >
    <xf-select
      class="xf-col-12"
      colour="white"
      :model-value="ingredient.name"
      :options="ingredientsList"
      autocomplete
      free-text
      label="Name"
      @update:model-value="setSelectedIngredientNutrients($event, i)"
    />

    <xf-text-input
      v-model="ingredient.amount"
      class="xf-col-8"
      colour="white"
      label="Amount"
      @focus="onFocus($event.target)"
    />

    <xf-select
      v-model="ingredient.unit"
      class="xf-col-4"
      :options="unitOptions"
      colour="white"
      label="Unit"
    />

    <xf-text-input
      v-for="(key, i) in nutrientKeys"
      :key="i"
      v-model="ingredient.nutrients[key]"
      class="xf-text-capitalize xf-col-6 xf-mb-1"
      :label="key"
      colour="white"
      @focus="onFocus($event.target)"
    />

    <xf-button
      class="xf-col-12 xf-w-100 xf-my-2"
      background-colour="red"
      @click="deleteIngredient(i)"
    >
      Remove ingredients
    </xf-button>
  </div>

  <xf-button
    class="xf-w-100 xf-my-2"
    background-colour="blue"
    @click="addIngredient"
  >
    Add Ingredient
  </xf-button>

  <xf-button
    class="xf-ml-auto xf-mt-10"
    background-colour="green"
    @click="addMeal"
  >
    {{ editing ? 'Update' : 'Add Meal' }}
  </xf-button>
</template>

<script lang="ts" setup>
  import { onMounted, ref, computed } from 'vue'
  import { Meal, MealNutrients } from './types/mealPlan.types'
  import { mealBase } from './data/mealPlan.data'
  import { useMealStore } from '@/stores/meals'
  import { useConfigStore } from '@/stores/config'
  import { debounce } from '@/helpers/utility'

  import { XfTextInput, XfSelect, XfButton } from 'xf-cmpt-lib'

  // ** Props **
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
