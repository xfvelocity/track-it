<template>
  <v-expansion-panels class="meal-expansion-panel">
    <v-expansion-panel
      class="meal-expansion-panel__panel my-1 w-100"
      v-for="(meal, i) in mealList"
      :key="i"
      :title="meal.name"
      @click="addMeal($event, meal)"
    >
      <v-expansion-panel-text>
        <div class="px-5 pt-2">
          <p
            v-for="(key, i) in Object.keys(meal.nutrients)"
            class="my-0 text-capitalize"
            style="font-size: 14px"
            :key="i"
          >
            {{ key }}: {{ meal.nutrients[key] }}
          </p>
        </div>

        <div class="d-flex mb-2">
          <v-spacer />
          <v-btn
            v-if="showEdit"
            variant="text"
            size="small"
            @click="$emit('edit', meal)"
          >
            Edit
            <v-icon color="white" class="ml-2"> mdi-pencil </v-icon>
          </v-btn>

          <v-btn variant="text" size="small" @click="toggleDeleteModal(meal)">
            Delete
            <v-icon color="white" class="ml-2"> mdi-delete </v-icon>
          </v-btn>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>

  <Modal
    v-model="deleteConfirmModal"
    action-buttons
    close-text="cancel"
    confirm-text="delete"
    @confirmed="$emit('delete', selectedMeal)"
  >
    <p>
      Are you sure you wish to delete:
      <span class="font-weight-medium">{{ selectedMeal?.name }}</span
      >?
    </p>
  </Modal>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref } from 'vue'
  import { Meal } from '../types/mealPlan.types'
  import Modal from '@/components/modal/Modal.vue'

  export default defineComponent({
    name: 'MealExpansionPanel',
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
    },
    emits: ['edit', 'delete', 'meal-added'],
    setup(props, context) {
      const deleteConfirmModal = ref<boolean>(false)
      const selectedMeal = ref<Meal>()

      const toggleDeleteModal = (meal: Meal): void => {
        selectedMeal.value = meal
        deleteConfirmModal.value = true
      }

      const addMeal = (event: any, meal: Meal): void => {
        if (
          event.srcElement.classList.contains('mdi-chevron-up') ||
          event.srcElement.classList.contains('mdi-chevron-down')
        )
          return

        context.emit('meal-added', meal)
      }

      return {
        addMeal,
        deleteConfirmModal,
        selectedMeal,
        toggleDeleteModal,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .meal-expansion-panel {
    &__panel {
      background: #2b2066;
    }

    :deep(.v-expansion-panel) {
      border-radius: 5px !important;
    }

    :deep(.v-expansion-panel-title) {
      padding: 0 20px !important;
      min-height: none;
    }

    :deep(.v-expansion-panel-text__wrapper) {
      padding: 0 !important;
    }
  }
</style>
