<template>
  <!-- TODO: Add details modal -->
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
      <div
        v-for="(ingredient, i) in ingredients"
        :key="i"
        class="add-ingredient-ingredient xf-py-2 xf-pl-1"
        @click="addIngredient(ingredient)"
      >
        <h5>{{ ingredient.name }}</h5>

        <xf-icon
          class="xf-ml-auto xf-mr-4"
          style="margin-top: 2px"
          :size="10"
          src="icons/info.svg"
          fill="white"
          @click.stop="toggleDetailsModal"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { useMealStore } from '@/stores/meals'
  import { useRouter } from 'vue-router'
  import { Ingredient } from './types/addMeal.types'

  import { XfTextInput, XfButton, XfIcon } from 'xf-cmpt-lib'

  // ** Data **
  const router = useRouter()
  const mealStore = useMealStore()

  const search = ref<string>('')
  const ingredients = ref<Ingredient[]>([])
  const isDetailsModalOpen = ref<boolean>(false)

  // ** Methods **
  const toggleDetailsModal = (): void => {
    isDetailsModalOpen.value = !isDetailsModalOpen.value
  }

  const addIngredient = (ingredient: Ingredient): void => {
    mealStore.creatingMeal.ingredients.push(ingredient)

    router.push('/add-meal/create-meal')
  }

  // ** Lifecycle **
  onMounted(async () => {
    ingredients.value = await mealStore.getIngredients()
  })
</script>

<style lang="scss" scoped>
  .add-ingredient {
    &-ingredient {
      border-bottom: 1px solid grey;
      display: flex;
      align-items: center;
    }

    &-create-btn {
      padding-right: 0 !important;
    }
  }
</style>
