<template>
  <div>
    <div class="mb-4">
      <v-menu>
        <template v-slot:activator="{ props }">
          <div class="cursor-pointer" v-bind="props">
            <span class="date-box">
              <v-icon class="mr-1" size="small">mdi-calendar</v-icon>
              {{ formatDate(date.start) }}
            </span>

            <v-icon class="mx-2" size="small" color="white">
              mdi-arrow-right
            </v-icon>

            <span class="date-box">
              <v-icon class="mr-1" size="small">mdi-calendar</v-icon>
              {{ formatDate(date.end) }}
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
  import { defineComponent, ref } from 'vue'
  import { DatePicker } from 'v-calendar'

  export default defineComponent({
    name: 'Shopping',
    components: {
      DatePicker,
    },
    setup() {
      const date = ref<any>({
        start: '2022-04-01',
        end: '2022-04-07',
      })
      const shoppingList = ref<any[]>([
        {
          unit: 'g',
          amount: 20,
          name: 'Protein powder',
          selected: false,
        },
      ])

      const formatDate = (date: string): string => {
        const [year, month, day] = date.split('-')
        return `${day}/${month}`
      }

      const onDateChange = (date: any): void => {
        console.log(date)
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
