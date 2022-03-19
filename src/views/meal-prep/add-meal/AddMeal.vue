<template>
  <div class="add-meal">
    <div class="d-flex justify-space-between align-center mb-4">
      <h2>Meals</h2>
      <v-btn
        variant="text"
        size="small"
        @click="$router.push('/meal-prep/create-meal')"
      >
        Create Meal
        <v-icon class="ml-1">mdi-plus</v-icon>
      </v-btn>
    </div>

    <div class="d-flex flex-wrap justify-space-between">
      <v-expansion-panels>
        <v-expansion-panel
          class="add-meal__panel my-2 w-100"
          v-for="(meal, i) in mealList"
          :key="i"
          :title="meal.name"
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
              <v-btn variant="text" size="small" @click="editMeal(meal)">
                Edit
                <v-icon color="white" class="ml-2"> mdi-pencil </v-icon>
              </v-btn>

              <v-btn
                variant="text"
                size="small"
                @click="toggleDeleteModal(meal)"
              >
                Delete
                <v-icon color="white" class="ml-2"> mdi-delete </v-icon>
              </v-btn>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>

    <Modal
      v-model="deleteConfirmModal"
      action-buttons
      close-text="cancel"
      confirm-text="delete"
      @confirmed="deleteMeal"
    >
      <p>
        Are you sure you wish to delete:
        <span class="font-weight-medium">{{ selectedMeal?.name }}</span
        >?
      </p>
    </Modal>
  </div>
</template>

<script lang="ts">
  import router from '@/router'
  import { defineComponent, onBeforeMount, ref } from 'vue'
  import { Store, useStore } from 'vuex'
  import { Meal } from '../create-meal/types/CreateMeal.types'

  import Modal from '@/components/modal/Modal.vue'

  export default defineComponent({
    name: 'AddMeal',
    components: { Modal },
    setup() {
      const store: Store<any> = useStore()

      const isOptionsShowing = ref<boolean>(false)
      const deleteConfirmModal = ref<boolean>(false)
      const selectedMeal = ref<Meal>()
      const mealList = ref<Meal[]>([])

      const getMeals = async (): Promise<void> => {
        mealList.value = await store.dispatch('getRecipes')
      }

      const editMeal = (meal: Meal): void => {
        store.commit('setEditingMeal', {
          meal,
          currentScreen: 1,
          editing: true,
        })
        router.push('/meal-prep/create-meal')
      }

      const toggleDeleteModal = (meal: Meal) => {
        deleteConfirmModal.value = true
        selectedMeal.value = meal
      }

      const deleteMeal = (): void => {
        store.dispatch('delRecipe', selectedMeal.value)
      }

      onBeforeMount(getMeals)

      return {
        isOptionsShowing,
        deleteConfirmModal,
        selectedMeal,
        toggleDeleteModal,
        editMeal,
        deleteMeal,
        mealList,
      }
    },
  })
</script>

<style lang="scss">
  .add-meal {
    &__panel {
      background: #2b2066;
    }

    .v-expansion-panel {
      border-radius: 5px !important;

      &-title {
        padding: 0 20px !important;
        min-height: none;
      }

      &-text__wrapper {
        padding: 0 !important;
      }
    }
  }
</style>
