<template>
  <div class="create-meal my-8">
    <v-text-field v-model="meal.name" label="Name" />
    <div
      class="create-meal__upload-image my-8 d-flex align-center justify-center"
      @click="initCamera"
    >
      <img
        v-if="meal.img"
        class="w-100 h-100"
        style="z-index: 10"
        :src="meal.img"
        alt=""
      />
      <div v-else>
        Upload an Image
        <input
          ref="photo"
          type="file"
          accept="image/*"
          hidden
          @change="handleImageUpload"
        />
      </div>
    </div>

    <div class="my-8">
      <div class="d-flex align-center mb-6">
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
          v-model="meal.ingredients[i]"
          label="Ingredient"
          single-line
        ></v-text-field>
        <v-btn color="red" @click="deleteIngredient(i)">
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
        ></v-text-field>
      </div>
    </div>
    <v-btn class="w-100 my-6 pa-6" color="primary">Create Meal</v-btn>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const photo = ref<HTMLElement | null>(null)

  const meal = ref<any>({
    name: '',
    img: null,
    ingredients: [''],
    instructions: [],
    nutrients: {
      calories: null,
      protein: null,
      carbs: null,
      fat: null,
    },
  })

  const initCamera = () => {
    if (photo && photo.value) photo.value.click()
  }

  const handleImageUpload = (event: any) => {
    const files = event.target.files || event.dataTransfer.files
    if (files.length) createImage(files[0])
  }

  const createImage = (file: any) => {
    var image = new Image()
    var reader = new FileReader()

    reader.onload = (e: ProgressEvent<FileReader>) =>
      (meal.value.img = e.target!.result)
    reader.readAsDataURL(file)
  }

  const deleteIngredient = (ingredientIndex: number) => {
    meal.value.ingredients.splice(ingredientIndex, 1)
  }

  const addIngredient = () => {
    meal.value.ingredients.push('')
  }
</script>

<style lang="scss" scoped>
  .create-meal {
    &__upload-image {
      cursor: pointer;
      height: 400px;
      width: 400px;
      background: #ffffff0d;
    }
  }
</style>
