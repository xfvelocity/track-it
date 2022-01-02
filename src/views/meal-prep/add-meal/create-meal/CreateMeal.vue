<template>
  <div class="create-recipe">
    <v-text-field v-model="meal.name" label="Name" />
    <!-- <UploadImage :img="meal.img" @img-upload="setImage" /> -->
    <div class="my-8">
      <div class="d-flex align-center mb-2">
        <p>Ingredients</p>
        <v-spacer></v-spacer>
        <v-btn
          class="ingredient-add"
          color="transparent"
          @click="addIngredient"
        >
          <span class="material-icons"> add </span>
        </v-btn>
      </div>

      <div
        class="d-flex align-center mb-4"
        v-for="(ingredient, i) in meal.ingredients"
        :key="i"
      >
        <v-text-field
          class="mr-1"
          v-model="meal.ingredients[i]"
          label="Ingredient"
          single-line
        ></v-text-field>
        <v-btn
          class="ingredient-delete"
          color="transparent"
          @click="deleteIngredient(i)"
        >
          <span class="material-icons"> close </span>
        </v-btn>
      </div>
    </div>
    <div>
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
    <v-btn class="w-100 my-6 pa-6" color="primary" @click="addMeal"
      >Create Meal</v-btn
    >
  </div>
</template>

<script lang="ts">
  import { Store, useStore } from 'vuex'
  import { onMounted, ref, defineComponent } from 'vue'
  import UploadImage from '@/components/upload-image/UploadImage.vue'
  import { Recipe } from './types/CreateMeal.types'

  export default defineComponent({
    name: 'CreateMeal',
    components: {
      UploadImage,
    },
    setup(props, context) {
      const store: Store<any> = useStore()
      const meal = ref<Recipe>({
        name: '',
        img: '',
        ingredients: [''],
        instructions: [],
        nutrients: {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
        },
      })

      onMounted(() => {
        const editingMeal: Recipe | null = store.state.recipe.editingMeal
        if (editingMeal) meal.value = editingMeal
      })

      const setImage = (img: string): void => {
        meal.value.img = img
      }

      const deleteIngredient = (ingredientIndex: number): void => {
        meal.value.ingredients.splice(ingredientIndex, 1)
      }

      const addIngredient = (): void => {
        meal.value.ingredients.push('')
      }

      const addMeal = async (): Promise<void> => {
        if (store.state.recipe.editingMeal) {
          const res = await store.dispatch('editRecipe', meal.value)

          if (res) {
            store.commit('setSnackbar', {
              color: 'green',
              text: `${meal.value.name} was updated`,
              isVisible: true,
            })
          }
        } else {
          const res = await store.dispatch('addRecipe', meal.value)

          if (res) {
            store.commit('setSnackbar', {
              color: 'green',
              text: `${meal.value.name} was added`,
              isVisible: true,
            })

            meal.value = {
              name: '',
              img: '',
              ingredients: [''],
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
      }

      return {
        meal,
        setImage,
        deleteIngredient,
        addIngredient,
        addMeal,
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
