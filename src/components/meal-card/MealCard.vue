<template>
  <div
    v-for="(meal, i) in mealList"
    :key="i"
    class="meal-card xf-mt-1 xf-py-1"
    @click="openInfoModal(meal)"
  >
    <span class="xf-pl-1">{{ meal.name }}</span>
  </div>

  <xf-modal
    v-model="infoModal"
    background-colour="bg"
    fullscreen
    :max-width="350"
  >
    <div class="meal-card-modal-container xf-mt-4">
      <meal-card-details :meal="selectedMeal" />

      <div class="meal-card-modal-btns xf-grid xf-gap-1 xf-mt-auto">
        <xf-button
          v-if="showEdit"
          class="xf-col-6"
          content-class="xf-w-100"
          background-colour="blue"
          icon="icons/edit.svg"
          disabled
          @click="$emit('edit', selectedMeal)"
        >
          Edit
        </xf-button>

        <xf-button
          :class="showEdit ? 'xf-col-6' : 'xf-col-12'"
          content-class="xf-w-100"
          background-colour="red-darken-2"
          icon="icons/trash.svg"
          @click="onDelete"
        >
          Delete
        </xf-button>

        <xf-button
          v-if="showAddMeal"
          class="xf-mt-1 xf-col-12"
          content-class="xf-w-100"
          background-colour="green-darken-2"
          icon="icons/plus.svg"
          @click="addMeal(selectedMeal)"
        >
          Add
        </xf-button>
      </div>
    </div>

    <bottom-nav @back="infoModal = false" />
  </xf-modal>
</template>

<script lang="ts" setup>
  import { Meal } from '@/views/meal-plan/types/mealPlan.types'
  import { ref } from 'vue'

  import { XfModal, XfButton } from 'xf-cmpt-lib'
  import BottomNav from '../nav/BottomNav.vue'
  import MealCardDetails from './MealCardDetails.vue'

  // ** Props **
  defineProps<{
    mealList: Meal[]
    showAddMeal?: boolean
    showEdit?: boolean
  }>()

  // ** Emits **
  const emit = defineEmits(['edit', 'delete', 'meal-added'])

  // ** Data **
  const infoModal = ref<boolean>(false)
  const selectedMeal = ref<any>()

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
  .meal-card {
    border-bottom: 1px solid grey;
    display: flex;
    width: 100%;
    align-items: center;

    &-modal {
      &-container {
        position: relative;
        height: 100%;
      }

      &-btns {
        position: absolute;
        bottom: 100px;
      }
    }
  }
</style>
