<template>
  <v-card
    class="d-flex mt-1 pa-4 recipe-card w-100"
    v-for="(meal, i) in mealList"
    :key="i"
  >
    {{ meal.name }}

    <v-spacer />

    <v-icon
      v-if="addIcon"
      size="small"
      class="mr-2 cursor-pointer"
      @click="addMeal(meal)"
    >
      mdi-plus
    </v-icon>

    <v-icon class="cursor-pointer" size="small" @click="openInfoModal(meal)">
      mdi-information-outline
    </v-icon>
  </v-card>

  <Modal v-model="infoModal">
    <div>
      <div class="font-weight-medium mb-2">Nutrients:</div>
      <p
        v-for="(value, name, i) in selectedMeal?.nutrients"
        class="my-0 text-capitalize"
        style="font-size: 14px"
        :key="i"
      >
        {{ name }}: {{ value }}
      </p>
    </div>

    <div class="mt-4">
      <div class="font-weight-medium mb-2">Ingredients:</div>
      <p
        v-for="(ingredient, i) in selectedMeal?.ingredients"
        class="my-0 text-capitalize"
        style="font-size: 14px"
        :key="i"
      >
        {{ ingredient.amount }}{{ ingredient.unit }} {{ ingredient.name }}
      </p>
    </div>

    <div class="d-flex mt-4">
      <v-spacer />

      <v-btn
        v-if="showEdit"
        color="primary"
        variant="text"
        size="small"
        @click="$emit('edit', selectedMeal)"
      >
        Edit
        <v-icon color="primary" class="ml-1"> mdi-pencil </v-icon>
      </v-btn>

      <v-btn color="red" variant="text" size="small" @click="onDelete">
        Delete
        <v-icon color="red" class="ml-1"> mdi-delete </v-icon>
      </v-btn>
    </div>
  </Modal>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref } from 'vue'
  import { Meal } from '../types/mealPlan.types'
  import Modal from '@/components/modal/Modal.vue'

  export default defineComponent({
    name: 'RecipeCard',
    components: {
      Modal,
    },
    props: {
      mealList: {
        type: Array as PropType<Meal[]>,
        default: () => [],
      },
      showEdit: {
        type: Boolean,
        default: true,
      },
      addIcon: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['edit', 'delete', 'meal-added'],
    setup(props, context) {
      const infoModal = ref<boolean>(false)
      const selectedMeal = ref<Meal>()

      const addMeal = (meal: Meal): void => {
        context.emit('meal-added', meal)
      }

      const openInfoModal = (meal: Meal): void => {
        selectedMeal.value = meal
        infoModal.value = true
      }

      const onDelete = (): void => {
        context.emit('delete', selectedMeal.value)
        infoModal.value = false
      }

      return {
        selectedMeal,
        infoModal,
        onDelete,
        openInfoModal,
        addMeal,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .recipe-card {
    background: #2b2066;
  }
</style>
