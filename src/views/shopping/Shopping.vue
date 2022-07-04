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
  import { useStore } from 'vuex'
  import { ShoppingItem } from '@/store/types/shopping.types'
  import moment from 'moment'

  export default defineComponent({
    name: 'Shopping',
    setup() {
      const store = useStore()

      const shoppingList = ref<ShoppingItem[]>(store.getters.getShopping)

      onBeforeMount(async () => {
        if (moment().day(0) !== store.state.shopping.date) {
          await getMealIngredients()
        }
      })

      const getMealIngredients = async (): Promise<void> => {
        let thisSunday = moment().day(0)

        store.commit('setShopping', [])

        // Get this week by comparing this sunday by next sunday
        while (thisSunday <= moment().day(7)) {
          await store.dispatch(
            'getShoppingRecipes',
            moment(thisSunday).format('YYYY-MM-DD')
          )
          thisSunday = moment(thisSunday).add(1, 'days')
        }

        store.commit('setShoppingLastUpdated', moment().day(0))

        shoppingList.value = store.getters.getShopping
      }

      const formatUnit = (unit: string): string => {
        return unit === 'units' ? '' : unit
      }

      return {
        shoppingList,
        formatUnit,
        getMealIngredients,
      }
    },
  })
</script>
