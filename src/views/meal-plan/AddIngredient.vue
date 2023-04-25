<template>
  <div>
    <h4>Ingredients</h4>

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
  import { XfTextInput } from 'xf-cmpt-lib'

  // ** Data **
  const search = ref<string>('')
</script>

<style lang="scss" scoped></style>
