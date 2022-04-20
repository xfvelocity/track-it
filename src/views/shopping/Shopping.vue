<template>
  <div>
    <div class="mb-4">
      <v-menu>
        <template v-slot:activator="{ props }">
          <div class="d-flex">
            <div class="cursor-pointer" v-bind="props">
              <span class="date-box">
                <v-icon class="mr-1" size="small">mdi-calendar</v-icon>
                {{ formatDate(date?.start) }}
              </span>

              <v-icon class="mx-2" size="small" color="white">
                mdi-arrow-right
              </v-icon>

              <span class="date-box">
                <v-icon class="mr-1" size="small">mdi-calendar</v-icon>
                {{ formatDate(date?.end) }}
              </span>
            </div>

            <v-spacer />

            <v-icon class="cursor-pointer" @click="onDateChange">
              mdi-refresh
            </v-icon>
          </div>
        </template>

        <v-date-picker
          v-model="date"
          is-range
          class="mt-2"
          @dayclick="onDateChange"
        />
      </v-menu>
    </div>

    <div>
      <span v-for="(item, i) in shoppingList" :key="i">
        <v-checkbox
          v-model="item.selected"
          :label="`${item.amount}${item.unit} ${item.name}`"
          hide-details
        />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { DatePicker } from 'v-calendar'
  import { useStore } from 'vuex'
  import { ShoppingDateRange, ShoppingItem } from '@/store/types/shopping.types'
  import moment from 'moment'

  export default defineComponent({
    name: 'Shopping',
    components: {
      DatePicker,
    },
    setup() {
      const store = useStore()

      const date = ref<ShoppingDateRange>(store.getters.getRange)
      const shoppingList = ref<ShoppingItem[]>(store.getters.getShopping)

      const onDateChange = (): void => {
        if (!date.value) return

        date.value = {
          start: moment(date.value.start).format('YYYY-MM-DD'),
          end: moment(date.value.end).format('YYYY-MM-DD'),
        }

        store.commit('setRange', date.value)
        store.commit('setShopping', [])

        getMealIngredients()
      }

      const formatDate = (date: string): string => {
        const [year, month, day] = date.split('-')
        return `${day}/${month}`
      }

      const getMealIngredients = async (): Promise<void> => {
        if (!date.value) return

        const { start, end } = date.value

        let currentDate = moment(start)
        const stopDate = moment(end)

        while (currentDate <= stopDate) {
          await store.dispatch(
            'getShoppingRecipes',
            moment(currentDate).format('YYYY-MM-DD')
          )
          currentDate = moment(currentDate).add(1, 'days')
        }

        shoppingList.value = store.getters.getShopping
      }

      return {
        date,
        shoppingList,
        formatDate,
        onDateChange,
      }
    },
  })
</script>
