<template>
  <div>
    <xf-icon class="xf-mr-2" src="icons/calendar.svg" fill="white" :size="16" />
    <span>This week</span>
  </div>

  <div class="xf-mt-6">
    <div v-for="(key, i) in keys" :key="i" class="xf-text-capitalize xf-mb-8">
      <div
        class="xf-flex xf-flex-align-items-center xf-cursor-pointer xf-mb-2"
        @click="addMeal(key)"
      >
        <h4 class="xf-text-capitalize">{{ key }}</h4>

        <xf-icon class="xf-ml-auto" src="icons/plus.svg" fill="white" />
      </div>

      <meal-card
        :meal-list="mealPlan[key]"
        :show-edit="false"
        @delete="deleteFromMealPlan"
      />
    </div>

    <div
      class="meals-nutrients ti-max-width xf-center-horizontal xf-flex xf-px-4 xf-flex-justify-content-between"
    >
      <div
        v-for="(macro, name, i) in mealPlan.macros"
        :key="i"
        class="meals-nutrients-item xf-text-center"
      >
        <p class="xf-text-capitalize xf-text-14 xf-fw-700 xf-mb-1">
          {{ name }}
        </p>

        <p class="xf-text-14">{{ macro }} / {{ nutrientGoals[name] }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router'
  import { useMealStore } from '@/stores/meals'
  import { useUserStore } from '@/stores/user'
  import { storeToRefs } from 'pinia'
  import { formatMealPlan, keys } from '@/helpers/utility'
  import { useShoppingStore } from '@/stores/shopping'
  import { doc, getFirestore, onSnapshot } from 'firebase/firestore'

  import { XfIcon } from 'xf-cmpt-lib'
  import MealCard from '@/components/meal-card/MealCard.vue'

  // ** Data **
  const userStore = useUserStore()
  const mealStore = useMealStore()
  const shoppingStore = useShoppingStore()
  const router = useRouter()

  const { mealPlan } = storeToRefs(mealStore)
  const { nutrientGoals } = storeToRefs(userStore)

  // ** Methods **
  const addMeal = (time: string): void => {
    mealStore.mealTime = time

    router.push('/add-meal')
  }

  const deleteFromMealPlan = async (meal: any): Promise<void> => {
    await mealStore.delFromMealPlan(meal.uuid)
  }

  // ** Firebase **
  const db = getFirestore()

  onSnapshot(doc(db, 'meal-plan', userStore.user.uid), (doc) => {
    mealPlan.value = formatMealPlan(doc.data())

    shoppingStore.setShopping()
  })
</script>

<style lang="scss" scoped>
  .meals {
    &-nutrients {
      position: absolute;
      bottom: 40px;
      left: 0;
      width: 100%;

      &-item {
        width: 70px;
      }
    }
  }
</style>
