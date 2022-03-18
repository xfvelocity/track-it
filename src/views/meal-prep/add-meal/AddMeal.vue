<template>
  <div class="add-meal">
    <div class="d-flex justify-space-between mb-4">
      <h2>Meals</h2>
      <v-btn
        color="primary"
        size="small"
        @click="$router.push('/meal-prep/create-meal')"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>

    <div class="d-flex flex-wrap justify-space-between">
      <v-card
        class="add-meal__card my-2 w-100"
        v-for="(meal, i) in mealList"
        :key="i"
      >
        <div class="d-flex align-center">
          <v-card-title class="text-ellipsis">{{ meal.name }}</v-card-title>
          <v-spacer />
          <div class="d-flex py-2 mr-2">
            <v-spacer />
            <v-btn
              class="mr-2"
              size="small"
              color="primary"
              @click="editMeal(meal)"
            >
              <v-icon color="white">mdi-pencil</v-icon>
            </v-btn>
            <v-btn color="red" size="small" @click="deleteMeal(meal)">
              <v-icon color="white">mdi-delete</v-icon>
            </v-btn>
          </div>
        </div>
      </v-card>
    </div>

    <Modal v-model="deleteConfirmModal" />
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

      const deleteMeal = (meal: Meal): void => {
        store.dispatch('delRecipe', meal)
      }

      onBeforeMount(getMeals)

      return {
        isOptionsShowing,
        deleteConfirmModal,
        editMeal,
        deleteMeal,
        mealList,
      }
    },
  })
</script>

<style lang="scss">
  .add-meal {
    &__card {
      background: #2b2066;
    }
  }
</style>
