<template>
  <div>
    <div class="xf-flex xf-mb-4">
      <div>
        <xf-icon
          class="xf-mr-1"
          src="icons/calendar.svg"
          fill="white"
          :size="16"
        />
        <span>This week</span>
      </div>

      <xf-icon
        class="xf-hover xf-ml-auto xf-cursor-pointer"
        src="icons/rotate.svg"
        fill="white"
        :size="16"
        @click="getMealIngredients"
      />
    </div>

    <div>
      <xf-checkbox
        v-for="(item, i) in shopping"
        :key="i"
        v-model="item.selected"
        class="xf-mb-3"
        :label="`${item.amount}${formatUnit(item.unit)} ${item.name}`"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onBeforeMount } from 'vue'
  import { useShoppingStore } from '@/stores/shopping'
  import { storeToRefs } from 'pinia'
  import moment from 'moment'

  import { XfIcon, XfCheckbox } from 'xf-cmpt-lib'

  // ** Data **
  const shoppingStore = useShoppingStore()

  const { shopping, date } = storeToRefs(shoppingStore)

  // ** Methods **
  const getMealIngredients = async (): Promise<void> => {
    await shoppingStore.getShoppingRecipes()
    shopping.value = shoppingStore.shopping
  }

  const formatUnit = (unit: string): string => {
    return unit === 'units' ? '' : unit
  }

  // ** Lifecycle **
  onBeforeMount(async () => {
    if (moment().day(0).format('YYYY-MM-DD') !== date.value) {
      await getMealIngredients()
    }
  })
</script>
