<template>
  <div class="create-recipe">
    <v-progress-linear class="mb-6" color="green" v-model="progress" />
    <div v-if="currentScreen === 1">
      <v-text-field
        v-model="meal.name"
        label="Name"
        :rules="[(v) => !v || 'Name is required']"
        required
      />
      <UploadImage class="my-6" :img="''" @img-upload="setImage" />
    </div>
    <div v-if="currentScreen === 2" class="my-8">
      <div class="d-flex align-center mb-2">
        <p>Ingredients</p>
        <v-spacer></v-spacer>
        <v-icon class="px-6 py-4 cursor-pointer" @click="addIngredient">
          mdi-plus
        </v-icon>
      </div>

      <SwipeActions
        class="d-flex align-center mb-4"
        v-for="(ingredient, i) in meal.ingredients"
        :key="i"
        @delete="deleteIngredient(i)"
      >
        <v-text-field
          style="width: 15%"
          label="Amount"
          class="mr-2"
          v-model.number="ingredient.amount"
          @focus="$event.target.select()"
        ></v-text-field>
        <v-text-field
          style="width: 10%"
          class="mr-2"
          label="Unit"
          v-model="ingredient.unit"
        ></v-text-field>
        <v-text-field
          style="width: 50%"
          class="mr-1"
          v-model="ingredient.name"
          label="Ingredient"
        ></v-text-field>
      </SwipeActions>

      <!-- <v-icon
          color="red"
          class="pl-4 pr-6 py-4 cursor-pointer"
          @click="deleteIngredient(i)"
        >
          mdi-close
        </v-icon> -->
    </div>
    <div v-if="currentScreen === 3">
      <p class="mb-6">Nutrients</p>
      <div
        class="d-flex align-center mb-4"
        v-for="(nutrientKey, i) in Object.keys(meal.nutrients)"
        :key="i"
      >
        <v-text-field
          class="text-capitalize"
          v-model.number="meal.nutrients[nutrientKey]"
          type="number"
          :label="nutrientKey"
          inputmode="decimal"
          @focus="$event.target.select()"
        ></v-text-field>
      </div>
    </div>
    <div class="d-flex mt-16">
      <v-btn
        v-if="currentScreen > 1"
        class="w-50 ma-2"
        color="primary"
        @click="backScreen"
      >
        <v-icon class="mr-1">mdi-arrow-left</v-icon>
        Back
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn class="ma-2" color="primary" @click="nextScreen">
        {{ currentScreen === 3 ? 'Add Meal' : 'Next' }}
        <v-icon v-if="currentScreen !== 3" class="ml-1">mdi-arrow-right</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
  import { Store, useStore } from 'vuex'
  import { onMounted, ref, defineComponent, computed } from 'vue'
  import SwipeActions from '../../../../components/swipe-actions/SwipeActions.vue'
  import UploadImage from '@/components/upload-image/UploadImage.vue'
  import { Meal } from './types/CreateMeal.types'
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
      })

      const progress = computed<number>(() => currentScreen.value * 33)

      onMounted((): void => {
        const editingMeal: Meal | null = store.state.recipe.editingMeal
        if (editingMeal) meal.value = editingMeal
      })

      const setImage = (img: string): void => {
        meal.value.img = img
      }

      const addIngredient = (): void => {
        meal.value.ingredients.push({
          amount: 0,
          unit: 'g',
          name: '',
        })
      }

      const deleteIngredient = (ingredientIndex: number): void => {
        meal.value.ingredients.splice(ingredientIndex, 1)
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
        --currentScreen.value
      }

      const nextScreen = (): void => {
        if (currentScreen.value === 3) addMeal()
        else ++currentScreen.value
      }

      return {
        meal,
        progress,
        currentScreen,
        deleteIngredient,
        addIngredient,
        backScreen,
        nextScreen,
        setImage,
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
