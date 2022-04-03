<template>
  <div>
    <div class="mb-4">
      <v-menu>
        <template v-slot:activator="{ props }">
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
        </template>

        <v-date-picker
          :model-value="date"
          is-range
          class="mt-2"
          @dayclick="onDateChange"
        />
      </v-menu>
    </div>

    <div>
      <span v-for="(item, i) in shoppingList" :key="i">
        <v-checkbox v-model="item.selected" :label="item.name" hide-details />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onBeforeMount } from 'vue'
  import { DatePicker } from 'v-calendar'
  import { useStore } from 'vuex'
  import { ShoppingDateRange, ShoppingItem } from '@/store/types/shopping.types'

  export default defineComponent({
    name: 'Shopping',
    components: {
      DatePicker,
    },
    setup() {
      const store = useStore()

      const date = ref<ShoppingDateRange>()
      const shoppingList = ref<ShoppingItem[]>([])

      onBeforeMount(() => {
        shoppingList.value = store.getters.getShopping
        date.value = store.getters.getRange
      })

      const formatDate = (date: string | undefined): string => {
        if (!date) return ''

        const [year, month, day] = date.split('-')
        return `${day}/${month}`
      }

      const onDateChange = (): void => {
        store.commit('setRange', date.value)
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
