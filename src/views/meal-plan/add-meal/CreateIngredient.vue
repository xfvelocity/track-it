<template>
  <h3 class="xf-mb-0">Create ingredient</h3>

  <div class="xf-grid xf-col-gap-3">
    <xf-text-input
      v-model="ingredient.name"
      class="xf-col-12"
      colour="white"
      label="Name"
    />

    <xf-text-input
      v-model="ingredient.amount"
      class="xf-col-6"
      colour="white"
      label="Amount"
    />

    <xf-select
      v-model="ingredient.unit"
      class="xf-col-6 create-ingredient-units"
      :options="unitOptions"
      colour="white"
      label="Unit"
    />

    <xf-text-input
      v-for="(key, i) in Object.keys(ingredient.macros)"
      :key="i"
      v-model="ingredient.macros[key as keyof IngredientMacros]"
      class="xf-text-capitalize xf-col-6 xf-mb-1"
      :label="key"
      colour="white"
    />
  </div>

  <xf-button
    class="xf-mt-4 xf-w-100"
    background-colour="blue"
    @click="createIngredient"
  >
    Create
  </xf-button>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useMealStore } from '@/stores/meals'
  import { Ingredient, IngredientMacros } from './types/addMeal.types'
  import { useRouter } from 'vue-router'

  import { XfTextInput, XfSelect, XfButton } from 'xf-cmpt-lib'

  // ** Data **
  const router = useRouter()
  const mealStore = useMealStore()

  const unitOptions = [
    { text: 'g', value: 'g' },
    { text: 'ml', value: 'ml' },
    { text: 'unit', value: 'unit' },
  ]

  const ingredient = ref<Ingredient>({
    name: '',
    amount: 0,
    unit: 'g',
    macros: {
      calories: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
    },
  })

  // ** Methods **
  const createIngredient = async (): Promise<void> => {
    await mealStore.createIngredient(ingredient.value)

    router.push('/add-meal/add-ingredient')
  }
</script>

<style lang="scss" scoped>
  .create-ingredient {
    &-units {
      position: relative;

      :deep(.xf-select) {
        position: absolute;
        bottom: 0;
        width: 100%;
      }
    }
  }
</style>
