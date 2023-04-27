<template>
  <div class="add-ingredient">
    <div class="xf-flex-center-between xf-h-max-content xf-mb-4">
      <h4>Ingredients</h4>

      <xf-button
        class="xf-ml-auto add-ingredient-create-btn"
        background-colour="transparent"
        icon="icons/plus.svg"
        @click="router.push('/add-meal/create-ingredient')"
      >
        Create Ingredient
      </xf-button>
    </div>

    <xf-text-input
      v-model="search"
      colour="white"
      outlined
      placeholder="Search"
    />

    <div class="xf-mt-4">
      <xf-expansion-panel
        :list="ingredients"
        text-colour="white"
        background-colour="blue-darken-4"
        secondary-text-colour="white"
        secondary-background-colour="blue-darken-3"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { useMealStore } from '@/stores/meals'
  import { useRouter } from 'vue-router'

  import { XfTextInput, XfButton, XfExpansionPanel } from 'xf-cmpt-lib'

  // ** Data **
  const router = useRouter()
  const mealStore = useMealStore()

  const search = ref<string>('')
  const ingredients = ref<any[]>([])

  // ** Lifecycle **
  onMounted(async () => {
    ingredients.value = await mealStore.getIngredients()
  })
</script>

<style lang="scss" scoped>
  .add-ingredient {
    &-card {
      border-radius: 3px;
    }

    &-create-btn {
      padding-right: 0 !important;
    }
  }
</style>
