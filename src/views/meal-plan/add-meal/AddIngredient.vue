<template>
  <div>
    <div class="xf-flex-center-between xf-h-max-content xf-mb-4">
      <h4>Ingredients</h4>

      <xf-button
        class="xf-ml-auto create-ingredient-btn"
        background-colour="transparent"
        icon="icons/plus.svg"
        @click="router.push('/add-meal/create-ingredient')"
      >
        Create Ingredient
      </xf-button>
    </div>

    <xf-text-input
      v-model="search"
      colour="white"
      outlined
      placeholder="Search"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  import { XfTextInput, XfButton } from 'xf-cmpt-lib'

  // ** Data **
  const router = useRouter()

  const search = ref<string>('')
</script>

<style lang="scss" scoped>
  .create-ingredient-btn {
    padding-right: 0 !important;
  }
</style>
