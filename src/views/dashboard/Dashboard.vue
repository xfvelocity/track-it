<template>
  <div class="dashboard">
    <!-- <div>
      <v-btn color="primary" @click="$router.push('add-workout')">
        Add Workout
      </v-btn>
    </div>
    <div class="my-4">
      <v-btn color="primary" @click="$router.push('meal-prep')">
        Meal prep
      </v-btn>
    </div> -->
    <div>
      <v-btn color="primary" @click="$router.push('/meal-prep/create-meal')"
        >Create Meal</v-btn
      >
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .dashboard {
    margin-top: 20px;
  }
</style>
