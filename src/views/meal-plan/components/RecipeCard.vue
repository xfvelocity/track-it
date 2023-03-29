<template>
  <div
    v-for="(meal, i) in mealList"
    :key="i"
    class="recipe-card xf-mt-1 xf-px-4 xf-py-2 xf-bg-blue-darken-4"
    @click="openInfoModal(meal)"
  >
    {{ meal.name }}

    <xf-icon
      v-if="addIcon"
      src="icons/plus.svg"
      class="xf-ml-auto xf-cursor-pointer"
      fill="white"
      @click.stop="addMeal(meal)"
    />
  </div>

  <xf-modal
    v-model="infoModal"
    class="xf-text-colour-grey-darken-3"
    :max-width="350"
  >
    <div>
      <div class="xf-fw-600 xf-mb-2">Nutrients:</div>
      <p
        v-for="(value, name, i) in selectedMeal?.nutrients"
        :key="i"
        class="xf-my-0 xf-text-14 xf-text-capitalize"
      >
        {{ name }}: {{ value }}
      </p>
    </div>

    <div class="xf-mt-4">
      <div class="xf-fw-600 xf-mb-2">Ingredients:</div>
      <p
        v-for="(ingredient, i) in selectedMeal?.ingredients"
        :key="i"
        class="xf-my-0 xf-text-14 xf-text-capitalize"
      >
        {{ ingredient.amount }}{{ formatUnit(ingredient.unit) }}
        {{ ingredient.name }}
      </p>
    </div>

    <div class="xf-flex xf-mt-4">
      <xf-icon
        v-if="showEdit"
        src="icons/edit.svg"
        class="xf-mr-2"
        fill="blue"
        @click="$emit('edit', selectedMeal)"
      />

      <xf-icon
        :class="{ 'xf-ml-auto': !showEdit }"
        src="icons/trash.svg"
        fill="red"
        @click="$emit('edit', selectedMeal)"
      />
    </div>
  </xf-modal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { Meal } from '../types/mealPlan.types'

  import { XfModal, XfButton, XfIcon } from 'xf-cmpt-lib'

  // ** Props **
  withDefaults(
    defineProps<{
      mealList: Meal[]
      showEdit?: boolean
      addIcon?: boolean
    }>(),
    {
      showEdit: true,
    }
  )

  // ** Emits **
  const emit = defineEmits(['edit', 'delete', 'meal-added'])

  // ** Data **
  const infoModal = ref<boolean>(false)
  const selectedMeal = ref<Meal>()

  // ** Methods **
  const addMeal = (meal: Meal): void => {
    emit('meal-added', meal)
  }

  const openInfoModal = (meal: Meal): void => {
    selectedMeal.value = meal
    infoModal.value = true
  }

  const onDelete = (): void => {
    emit('delete', selectedMeal.value)
    infoModal.value = false
  }

  const formatUnit = (unit: string): string => {
    return unit === 'units' ? '' : unit
  }
</script>

<style lang="scss" scoped>
  .recipe-card {
    border-radius: 10px;
    width: 100%;
    display: flex;
    align-items: center;
  }
</style>
