<template>
  <router-view />

  <bottom-nav @back="router.back()" />
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router'

  import BottomNav from '@/components/nav/BottomNav.vue'

  // ** Data **
  const router = useRouter()
</script>
