<template>
  <div class="create-recipe pa-4">
    <v-progress-linear class="mb-6" color="green" v-model="progress" />

    <div v-if="currentScreen === 1">
      <xf-text-input v-model="meal.name" label="Name" />
    </div>

    <div v-if="currentScreen === 2" class="mt-4 mb-8">
      <div class="d-flex align-center mb-4">
        <p>Ingredients</p>
      </div>

      <div class="mb-4" v-for="(ingredient, i) in meal.ingredients" :key="i">
        <xf-select
          :model-value="ingredient.name"
          :options="ingredientsList"
          autocomplete
          free-text
          label="Ingredient"
          @update:model-value="setSelectedIngredientNutrients($event, i)"
        />

        <div class="d-flex mt-2">
          <xf-text-input
            v-model="ingredient.amount"
            class="mr-2"
            label="Amount"
            pattern="[0-9]*"
            @focus="onFocus($event.target)"
          />

          <xf-select
            v-model="ingredient.unit"
            :options="unitOptions"
            style="width: 20%"
            label="Unit"
          />
        </div>

        <div class="d-flex flex-wrap align-center my-2">
          <xf-text-input
            v-for="(key, i) in nutrientKeys"
            :key="i"
            v-model.number="ingredient.nutrients[key]"
            class="text-capitalize mb-1"
            :class="{ 'mr-2': i % 2 === 0 }"
            style="width: 45%"
            :label="key"
            @focus="onFocus($event.target)"
          />
        </div>

        <xf-button
          color="error"
          text-color="white"
          size="x-small"
          class="cursor-pointer w-100"
          @click="deleteIngredient(i)"
        >
          Remove
        </xf-button>
      </div>

      <xf-button
        color="primary"
        text-color="white"
        size="x-small"
        class="cursor-pointer w-100"
        @click="addIngredient"
      >
        Add
      </xf-button>
    </div>

    <div class="d-flex mt-10">
      <v-btn color="primary" size="small" @click="backScreen">
        <v-icon v-if="currentScreen > 1" class="mr-1">mdi-arrow-left</v-icon>
        {{ currentScreen > 1 ? 'Back' : 'Return' }}
      </v-btn>
      <v-spacer />
      <v-btn
        color="success"
        text-color="white"
        size="small"
        @click="nextScreen"
      >
        {{ currentScreen === 2 ? (editing ? 'Update' : 'Add Meal') : 'Next' }}
        <v-icon v-if="currentScreen !== 2" class="ml-1">mdi-arrow-right</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, computed } from 'vue'
  import { Meal, MealNutrients } from './types/mealPlan.types'
  import { mealBase } from './data/mealPlan.data'
  import { useMealStore } from '@/stores/meals'
  import { useConfigStore } from '@/stores/config'
  import { debounce } from '@/helpers/utility'

  import { XfTextInput, XfIcon, XfSelect, XfButton } from 'xf-cmpt-lib'
  import { SelectOption } from 'xf-cmpt-lib/dist/types/app.types'

  // ** Props **
  const props = defineProps<{
    editing?: boolean
    editingMeal?: Meal
  }>()

  // ** Emits **
  const emits = defineEmits(['return'])

  // ** Data **
  const configStore = useConfigStore()
  const mealStore = useMealStore()

  const currentScreen = ref<number>(1)
  const meal = ref<Meal>(mealBase)

  const nutrientKeys: (keyof MealNutrients)[] = Object.keys(
    meal.value.nutrients
  ) as (keyof MealNutrients)[]
  const unitOptions: SelectOption[] = [
    { text: 'g', value: 'g' },
    { text: 'ml', value: 'ml' },
    { text: 'units', value: 'units' },
  ]

  // ** Computed **
  const progress = computed<number>(() => currentScreen.value * 50)

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
    emits('return')
  }

  const backScreen = (): void => {
    if (currentScreen.value === 1) emits('return')
    else --currentScreen.value
  }

  const nextScreen = (): void => {
    if (currentScreen.value === 2) addMeal()
    else ++currentScreen.value
  }

  // ** Lifecycle **
  onMounted(async () => {
    await mealStore.getIngredients()

    if (props.editing && Object.keys(props.editingMeal).length > 0) {
      meal.value = props.editingMeal
    }
  })
</script>

<style lang="scss" scoped>
  .create-recipe {
    .ingredient-add.v-btn,
    .ingredient-delete.v-btn {
      padding: 0px !important;
      min-width: 40px !important;
    }

    .ingredient-delete {
      .material-icons {
        color: rgb(255, 77, 77);
      }
    }
  }
</style>
