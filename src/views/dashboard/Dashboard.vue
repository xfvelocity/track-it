<template>
  <div class="dashboard">
    <v-btn class="w-100" color="primary" @click="$router.push('/meal-prep')">
      Meal Prep
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
