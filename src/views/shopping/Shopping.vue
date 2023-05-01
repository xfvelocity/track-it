<template>
  <div class="xf-mb-4">
    <xf-icon class="xf-mr-1" src="icons/calendar.svg" fill="white" :size="16" />
    <span>This week</span>
  </div>

  <div>
    <xf-checkbox
      v-for="(item, i) in shopping"
      :key="i"
      v-model="item.selected"
      class="xf-mb-3"
      :label="formatIngredient(item)"
    />
  </div>
</template>

<script lang="ts" setup>
  import { useShoppingStore } from '@/stores/shopping'
  import { storeToRefs } from 'pinia'
  import { formatIngredient } from '@/helpers/utility'

  import { XfIcon, XfCheckbox } from 'xf-cmpt-lib'

  // ** Data **
  const shoppingStore = useShoppingStore()

  const { shopping } = storeToRefs(shoppingStore)
</script>
