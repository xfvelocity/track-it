<template>
  <div
    v-for="(meal, i) in mealList"
    :key="i"
    class="xf-flex xf-flex-align-items-center xf-mt-1 xf-p-4 xf-w-100 xf-bg-blue-darken-4"
  >
    {{ meal.name }}

    <div class="xf-flex xf-ml-auto">
      <xf-icon
        v-if="addIcon"
        src="icons/plus.svg"
        class="xf-mr-2 xf-cursor-pointer"
        fill="white"
        @click="addMeal(meal)"
      />

      <xf-icon
        src="icons/info.svg"
        class="xf-cursor-pointer"
        fill="white"
        @click="openInfoModal(meal)"
      />
    </div>
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

    <div class="xf-flex xf-mt-2">
      <xf-button
        v-if="showEdit"
        class="xf-ml-auto"
        background-colour="transparent"
        text-colour="blue"
        icon="icons/edit.svg"
        @click="$emit('edit', selectedMeal)"
      >
        Edit
      </xf-button>

      <xf-button
        :class="{ 'xf-ml-auto': !showEdit }"
        background-colour="transparent"
        text-colour="red"
        icon="icons/trash.svg"
        @click="onDelete"
      >
        Delete
      </xf-button>
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
