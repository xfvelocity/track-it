<template>
  <div>
    <div class="d-flex mb-4">
      <div>
        <v-icon class="mr-1" size="small">mdi-calendar</v-icon>
        This week
      </div>

      <v-spacer />

      <v-icon class="cursor-pointer" @click="getMealIngredients">
        mdi-refresh
      </v-icon>
    </div>

    <div>
      <span v-for="(item, i) in shoppingList" :key="i">
        <v-checkbox
          v-model="item.selected"
          :label="`${item.amount}${formatUnit(item.unit)} ${item.name}`"
          hide-details
        />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onBeforeMount } from 'vue'
  import { ShoppingItem } from '@/stores/types/shopping.types'
  import moment from 'moment'
  import { useShoppingStore } from '@/stores/shopping'

  export default defineComponent({
    name: 'Shopping',
    setup() {
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

      return {
        shoppingList,
        formatUnit,
        getMealIngredients,
      }
    },
  })
</script>
