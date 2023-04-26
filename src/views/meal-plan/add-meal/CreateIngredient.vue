<template>
  <h3 class="xf-mb-0">Create ingredient</h3>

  <div class="xf-grid">
    <xf-text-input
      v-model="ingredient.name"
      class="xf-col-12"
      colour="white"
      label="Name"
    />

    <xf-text-input
      v-model="ingredient.amount"
      class="xf-col-7"
      colour="white"
      label="Amount"
    />

    <xf-select
      v-model="ingredient.unit"
      class="xf-col-5 create-ingredient-units"
      :options="unitOptions"
      colour="white"
      label="Unit"
    />

    <xf-text-input
      v-for="(key, i) in Object.keys(ingredient.macros)"
      :key="i"
      v-model="ingredient.macros[key]"
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

  import { XfTextInput, XfSelect, XfButton } from 'xf-cmpt-lib'

  // ** Data **
  const unitOptions = [{ text: 'g', value: 'g' }]

  const ingredient = ref<any>({
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

  const createIngredient = (): void => {
    console.log(ingredient.value)
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
