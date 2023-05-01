<template>
  <xf-text-input
    v-if="editingMeal"
    v-model="meal.name"
    colour="white"
    placeholder="Name"
    outlined
  />
  <h3 v-else>{{ meal.name }}</h3>

  <h4 class="xf-mt-4 xf-mb-2">Ingredients</h4>
  <hr class="xf-bg-white" />

  <template v-if="meal.ingredients">
    <div v-for="(ingredient, i) in meal.ingredients" :key="i" class="xf-pl-1">
      <p>{{ formatIngredient(ingredient) }}</p>
    </div>
  </template>

  <p
    v-if="editingMeal"
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

  <div class="meal-card-details-macros xf-px-2">
    <div v-for="(nutrient, name, i) in meal" :key="i" class="xf-text-center">
      <p class="xf-text-capitalize xf-text-14 xf-fw-700 xf-mb-1">
        {{ name }}
      </p>

      <p class="xf-text-14">{{ nutrient }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { formatIngredient } from '@/helpers/utility'
  import { useRouter } from 'vue-router'

  import { XfTextInput, XfIcon } from 'xf-cmpt-lib'

  // ** Props **
  defineProps<{
    meal: any
    editingMeal?: boolean
  }>()

  // ** Data **
  const router = useRouter()
</script>

<style lang="scss" scoped>
  .meal-card-details {
    &-macros {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }
</style>
