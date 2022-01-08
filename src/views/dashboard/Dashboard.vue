<template>
  <div class="dashboard">
    <div>
      <v-btn color="primary" @click="$router.push('/meal-prep/add-meal')"
        >Add Meal</v-btn
      >

      <SwipeActions @delete="del">
        <v-card color="background" class="pa-4">
          <v-card-title>Test swipe</v-card-title>
        </v-card>
      </SwipeActions>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import SwipeActions from '../../components/swipe-actions/SwipeActions.vue'

  export default defineComponent({
    name: 'MealPrep',
    components: {
      SwipeActions,
    },
    setup() {
      const del = () => {
        console.log('delete')
      }

      return {
        del,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
