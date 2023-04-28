<template>
  <div
    v-for="(meal, i) in mealList"
    :key="i"
    class="meal-card xf-mt-1 xf-px-2 xf-py-1"
    @click="addMeal(meal)"
  >
    {{ meal.name }}

    <xf-icon
      class="xf-ml-auto xf-mr-4"
      style="margin-top: 2px"
      :size="10"
      src="icons/info.svg"
      fill="white"
      @click.stop="openInfoModal"
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
        v-if="!inMealPlan"
        src="icons/edit.svg"
        class="xf-mr-2"
        fill="blue"
        @click="$emit('edit', selectedMeal)"
      />

      <xf-icon
        :class="{ 'xf-ml-auto': inMealPlan }"
        src="icons/trash.svg"
        fill="red"
        @click="$emit('edit', selectedMeal)"
      />
    </div>
  </xf-modal>
</template>

<script lang="ts" setup>
  import { Meal } from '@/views/meal-plan/types/mealPlan.types'
  import { ref } from 'vue'

  import { XfModal, XfIcon } from 'xf-cmpt-lib'

  // ** Props **
  const props = withDefaults(
    defineProps<{
      mealList: Meal[]
      inMealPlan?: boolean
    }>(),
    {
      inMealPlan: false,
    }
  )

  // ** Emits **
  const emit = defineEmits(['edit', 'delete', 'meal-added'])

  // ** Data **
  const infoModal = ref<boolean>(false)
  const selectedMeal = ref<Meal>()

  // ** Methods **
  const addMeal = (meal: Meal): void => {
    if (!props.inMealPlan) {
      emit('meal-added', meal)
    }
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
  }
</style>
