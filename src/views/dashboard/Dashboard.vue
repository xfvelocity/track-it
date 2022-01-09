<template>
  <div class="dashboard">
    <v-btn color="primary" @click="$router.push('/meal-prep/add-meal')">
      Add Meal
    </v-btn>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'MealPrep',
  })
</script>

<style lang="scss" scoped></style>
