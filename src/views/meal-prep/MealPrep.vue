<template>
  <div class="meal-prep">
    <div class="d-flex">
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="$router.push('/meal-prep/add-meal')">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'MealPrep',
  })
</script>

<style lang="scss" scoped></style>
