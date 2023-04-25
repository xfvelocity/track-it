<template>
  <div>
    <div
      class="xf-create-ingredient xf-px-4 xf-mb-1 xf-border-grey-darken-2 xf-grid"
      v-for="(ingredient, i) in meal.ingredients"
      :key="i"
    >
      <xf-select
        class="xf-col-12"
        colour="white"
        :model-value="ingredient.name"
        :options="ingredientsList"
        autocomplete
        free-text
        label="Name"
        @update:model-value="setSelectedIngredientNutrients($event, i)"
      />

      <xf-text-input
        v-model="ingredient.amount"
        class="xf-col-8"
        colour="white"
        label="Amount"
        @focus="onFocus($event.target)"
      />

      <xf-select
        v-model="ingredient.unit"
        class="xf-col-4"
        :options="unitOptions"
        colour="white"
        label="Unit"
      />

      <xf-text-input
        v-for="(key, i) in nutrientKeys"
        :key="i"
        v-model="ingredient.nutrients[key]"
        class="xf-text-capitalize xf-col-6 xf-mb-1"
        :label="key"
        colour="white"
        @focus="onFocus($event.target)"
      />

      <xf-button
        class="xf-col-12 xf-w-100 xf-my-2"
        background-colour="red"
        @click="deleteIngredient(i)"
      >
        Remove ingredients
      </xf-button>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
