<template>
  <div class="create-meal my-6">
    <v-text-field class="mb-6" v-model="meal.name" label="Name" />
    <div
      class="create-meal__upload-image mb-6 d-flex align-center justify-center"
    >
      Image placeholder
    </div>
    <div>
      <div class="d-flex align-center mb-4">
        <p>Ingredients</p>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="addIngredient">
          <span class="material-icons"> add </span>
        </v-btn>
      </div>

      <div
        class="d-flex align-center mb-4"
        v-for="(ingredient, i) in meal.ingredients"
        :key="i"
      >
        <v-text-field
          class="mr-4"
          v-model="ingredient.name"
          label="Ingredient"
          single-line
        ></v-text-field>
        <v-btn color="red" @click="deleteIngredient(i)">
          <span class="material-icons"> close </span>
        </v-btn>
      </div>
    </div>
    <div class="mt-6">
      <p class="mb-4">Nutrients</p>
      <div
        class="d-flex align-center mb-4"
        v-for="(nutrientKey, i) in Object.keys(meal.nutrients)"
        :key="i"
      >
        <v-text-field
          class="text-capitalize"
          v-model="meal.nutrients[nutrientKey]"
          :label="nutrientKey"
        ></v-text-field>
      </div>
    </div>
    <v-btn class="width100 mt-4" color="primary">Create Meal</v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const meal = ref<any>({
  name: "Protein Powder",
  img: null,
  ingredients: [
    {
      amount: 1,
      unit: null,
      name: "25g Protein Powder",
    },
  ],
  instructions: [""],
  nutrients: {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  },
});

const deleteIngredient = (ingredientIndex: number) => {
  meal.value.ingredients.splice(ingredientIndex, 1);
};

const addIngredient = () => {
  meal.value.ingredients.push({
    amount: null,
    unit: null,
    name: "",
  });
};
</script>

<style lang="scss" scoped>
.create-meal {
  &__upload-image {
    height: 200px;
    width: 100%;
    background: #ffffff1a;
  }
}
</style>
