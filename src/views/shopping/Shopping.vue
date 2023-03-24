<template>
  <div>
    <div class="xf-flex xf-mb-4">
      <div class="xf-cursor-pointer xf-hover">
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
      <v-checkbox
        v-model="item.selected"
        v-for="(item, i) in shoppingList"
        :key="i"
        :label="`${item.amount}${formatUnit(item.unit)} ${item.name}`"
        hide-details
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onBeforeMount } from 'vue'
  import { ShoppingItem } from '@/stores/types/shopping.types'
  import { useShoppingStore } from '@/stores/shopping'
  import moment from 'moment'

  import { XfIcon } from 'xf-cmpt-lib'

  // ** Data **
  const shoppingStore = useShoppingStore()

  const shoppingList = ref<ShoppingItem[]>(shoppingStore.shopping)

  // ** Methods **
  const getMealIngredients = async (): Promise<void> => {
    await shoppingStore.getShoppingRecipes()
    shoppingList.value = shoppingStore.shopping
  }

  const formatUnit = (unit: string): string => {
    return unit === 'units' ? '' : unit
  }

  // ** Lifecycle **
  onBeforeMount(async () => {
    if (moment().day(0).format('YYYY-MM-DD') !== shoppingStore.date) {
      await getMealIngredients()
    }
  })
</script>
