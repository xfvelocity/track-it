<template>
  <div class="create-recipe pa-4">
    <v-progress-linear class="mb-6" color="green" v-model="progress" />

    <div v-if="currentScreen === 1">
      <v-text-field v-model="meal.name" label="Name" />
      <UploadImage class="my-6" :img="''" @img-upload="setImage" />
    </div>

    <div v-if="currentScreen === 2" class="mt-4 mb-8">
      <div class="d-flex align-center mb-4">
        <p>Ingredients</p>
        <v-spacer />
      </div>

      <div class="mb-4" v-for="(ingredient, i) in meal.ingredients" :key="i">
        <v-combobox
          v-model="ingredient.name"
          :items="ingredientsList"
          filter-keys="name"
          label="Ingredient"
          @update:modelValue="onIngredientUpdate($event, i)"
        />
        <div class="d-flex mt-2">
          <v-text-field
            class="mr-2"
            label="Amount"
            pattern="[0-9]*"
            v-model.number="ingredient.amount"
            @focus="onFocus($event.target)"
          />
          <v-select
            style="width: 20%"
            label="Unit"
            background-color="blue"
            v-model="ingredient.unit"
            :items="unitOptions"
          />
        </div>

        <div class="d-flex flex-wrap align-center my-2">
          <v-text-field
            v-for="(key, i) in nutrientKeys"
            :key="i"
            style="width: 45%"
            class="text-capitalize mb-1"
            :class="{ 'mr-2': i % 2 === 0 }"
            v-model.number="ingredient.nutrients[key]"
            :label="key"
            pattern="[0-9]*"
            inputmode="decimal"
            @focus="onFocus($event.target)"
          />
        </div>
        <v-btn
          color="error"
          text-color="white"
          size="x-small"
          class="cursor-pointer w-100"
          @click="deleteIngredient(i)"
        >
          Remove
        </v-btn>
      </div>

      <v-btn
        color="primary"
        text-color="white"
        size="x-small"
        class="cursor-pointer w-100"
        @click="addIngredient"
      >
        Add
      </v-btn>
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

<script lang="ts">
  import { Store, useStore } from 'vuex'
  import { onMounted, ref, defineComponent, computed, PropType } from 'vue'
  import { Meal, MealNutrients } from '../../types/mealPlan.types'

  import SwipeActions from '@/components/swipe-actions/SwipeActions.vue'
  import UploadImage from '@/components/upload-image/UploadImage.vue'
  import { mealBase } from '../../data/mealPlan.data'

  export default defineComponent({
    name: 'CreateMeal',
    components: {
      UploadImage,
      SwipeActions,
    },
    props: {
      editing: {
        type: Boolean,
        default: false,
      },
      editingMeal: {
        type: Object as PropType<Meal>,
        default: () => ({}),
      },
    },
    emits: ['return'],
    setup(props, context) {
      const store: Store<any> = useStore()
      const unitOptions: string[] = ['g', 'ml', 'units']

      const currentScreen = ref<number>(1)
      const meal = ref<Meal>(mealBase)

      const nutrientKeys: (keyof MealNutrients)[] = Object.keys(
        meal.value.nutrients
      ) as (keyof MealNutrients)[]

      const progress = computed<number>(() => currentScreen.value * 50)

      const ingredientsList = computed<any[]>(() =>
        store.state.recipe.ingredients.map((ingredient: any) => ({
          title: ingredient.name,
          value: ingredient,
        }))
      )

      onMounted(async () => {
        await store.dispatch('getIngredients')

        if (props.editing && Object.keys(props.editingMeal).length > 0) {
          meal.value = props.editingMeal
        }
      })

      const onIngredientUpdate = (val: any, index: number): void => {
        const matchingIngredient = ingredientsList.value.find(
          (ingredient) => ingredient.title === val
        )

        if (matchingIngredient) {
          meal.value.ingredients[index] = matchingIngredient.value
        }
      }

      const setImage = (img: string): void => {
        meal.value.img = img
      }

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
        const res = await store.dispatch(
          props.editing ? 'editRecipe' : 'addRecipe',
          meal.value
        )

        if (res) {
          store.commit('setSnackbar', {
            color: '',
            text: `${meal.value.name} was ${
              props.editing ? 'updated' : 'created'
            }`,
            isVisible: true,
          })

          meal.value = { ...mealBase }
          context.emit('return')
        }
      }

      const backScreen = (): void => {
        if (currentScreen.value === 1) context.emit('return')
        else --currentScreen.value
      }

      const nextScreen = (): void => {
        if (currentScreen.value === 2) addMeal()
        else ++currentScreen.value
      }

      return {
        meal,
        progress,
        currentScreen,
        nutrientKeys,
        unitOptions,
        ingredientsList,
        onIngredientUpdate,
        deleteIngredient,
        addIngredient,
        backScreen,
        nextScreen,
        setImage,
        onFocus,
      }
    },
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
