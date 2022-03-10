<template>
  <div class="create-recipe">
    <v-progress-linear class="mb-6" color="green" v-model="progress" />

    <div v-if="currentScreen === 1">
      <v-text-field v-model="meal.name" label="Name" />
      <UploadImage class="my-6" :img="''" @img-upload="setImage" />
    </div>

    <div v-if="currentScreen === 2" class="mt-4 mb-8">
      <div class="d-flex align-center mb-4">
        <p>Ingredients</p>
        <v-spacer />
        <v-icon class="py-4 cursor-pointer" @click="addIngredient">
          mdi-plus
        </v-icon>
      </div>

      <div class="mb-4" v-for="(ingredient, i) in meal.ingredients" :key="i">
        <div class="d-flex mb-2">
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
        <v-text-field v-model="ingredient.name" label="Ingredient" />
        <v-btn
          color="error"
          text-color="white"
          size="small"
          class="mt-2 cursor-pointer w-100"
          @click="deleteIngredient(i)"
        >
          Remove
        </v-btn>
      </div>
    </div>

    <div v-if="currentScreen === 3">
      <p class="mb-4">Nutrients</p>
      <div
        class="d-flex align-center mb-2"
        v-for="(key, i) in nutrientKeys"
        :key="i"
      >
        <v-text-field
          class="text-capitalize"
          v-model.number="meal.nutrients[key]"
          type="number"
          :label="key"
          pattern="[0-9]*"
          inputmode="decimal"
          @focus="onFocus($event.target)"
        />
      </div>
    </div>
  </div>

  <div class="d-flex mt-8">
    <v-btn class="w-50 ma-2" color="primary" @click="backScreen">
      <v-icon v-if="currentScreen > 1" class="mr-1">mdi-arrow-left</v-icon>
      {{ currentScreen > 1 ? 'Back' : 'Return' }}
    </v-btn>
    <v-spacer />
    <v-btn class="ma-2" color="success" text-color="white" @click="nextScreen">
      {{ currentScreen === 3 ? 'Add Meal' : 'Next' }}
      <v-icon v-if="currentScreen !== 3" class="ml-1">mdi-arrow-right</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
  import { Store, useStore } from 'vuex'
  import { onMounted, ref, defineComponent, computed } from 'vue'
  import SwipeActions from '../../../../components/swipe-actions/SwipeActions.vue'
  import UploadImage from '@/components/upload-image/UploadImage.vue'
  import { Meal, MealNutrients } from './types/CreateMeal.types'
  import router from '@/router'

  export default defineComponent({
    name: 'CreateMeal',
    components: {
      UploadImage,
      SwipeActions,
    },
    setup() {
      const currentScreen = ref<number>(1)
      const store: Store<any> = useStore()

      const meal = ref<Meal>({
        name: '',
        img: '',
        ingredients: [
          {
            amount: null,
            unit: 'g',
            name: '',
          },
        ],
        instructions: [],
        nutrients: {
          calories: null,
          protein: null,
          carbs: null,
          fat: null,
        },
      })

      const nutrientKeys: (keyof MealNutrients)[] = Object.keys(
        meal.value.nutrients
      ) as (keyof MealNutrients)[]
      const unitOptions: string[] = ['g', 'ml']

      const progress = computed<number>(() => currentScreen.value * 33)

      onMounted((): void => {
        const editingMeal: Meal | null = store.state.recipe.editingMeal
        if (editingMeal) meal.value = editingMeal
      })

      const setImage = (img: string): void => {
        meal.value.img = img
      }

      const onFocus = (event: any): void => {
        event.target.select()
      }

      const addIngredient = (): void => {
        meal.value.ingredients.push({
          amount: 0,
          unit: 'g',
          name: '',
        })
      }

      const deleteIngredient = (index: number): void => {
        if ((meal.value.ingredients.length = 1)) {
          meal.value.ingredients[index] = {
            amount: 0,
            unit: 'g',
            name: '',
          }
        } else {
          meal.value.ingredients.splice(index, 1)
        }
      }

      const addMeal = async (): Promise<void> => {
        let res: any

        if (store.state.recipe.editingMeal) {
          res = await store.dispatch('editRecipe', meal.value)

          if (res) {
            store.commit('setSnackbar', {
              color: 'green',
              text: `${meal.value.name} was updated`,
              isVisible: true,
            })
          }
        } else {
          res = await store.dispatch('addRecipe', meal.value)

          if (res) {
            store.commit('setSnackbar', {
              color: 'green',
              text: `${meal.value.name} was added`,
              isVisible: true,
            })

            meal.value = {
              name: '',
              img: '',
              ingredients: [
                {
                  amount: 0,
                  unit: 'g',
                  name: '',
                },
              ],
              instructions: [],
              nutrients: {
                calories: 0,
                protein: 0,
                carbs: 0,
                fat: 0,
              },
            }
          }
        }

        if (res) router.push('/meal-prep/add-meal')
      }

      const backScreen = (): void => {
        if (currentScreen.value === 1) router.push('/meal-prep/add-meal')
        else --currentScreen.value
      }

      const nextScreen = (): void => {
        if (currentScreen.value === 3) addMeal()
        else ++currentScreen.value
      }

      return {
        meal,
        progress,
        currentScreen,
        nutrientKeys,
        unitOptions,
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
