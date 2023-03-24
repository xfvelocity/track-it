<template>
  <xf-text-input
    v-model="logInDetails.email"
    label="Email"
    type="email"
    colour="grey"
  />

  <xf-text-input
    v-model="logInDetails.password"
    label="Password"
    :type="showPassword ? 'text' : 'password'"
    :append-icon="showPassword ? 'icons/eye.svg' : 'icons/eye-slash.svg'"
    colour="grey"
    @click:append="showPassword = !showPassword"
  />

  <xf-button
    class="xf-w-100 xf-mt-4"
    background-colour="blue-darken-2"
    @click="logIn"
  >
    Sign in
  </xf-button>
</template>

<script lang="ts" setup>
  import { signInEmailAccount } from '@/api/auth'
  import { ref } from 'vue'
  import { LogInForm } from './types/account.types'
  import { XfTextInput, XfButton } from 'xf-cmpt-lib'

  // ** Data **
  const showPassword = ref<boolean>(false)
  const logInDetails = ref<LogInForm>({
    email: '',
    password: '',
  })

  // ** Methods **
  const logIn = async (): Promise<void> => {
    const { email, password } = logInDetails.value

    signInEmailAccount(email, password)
  }
</script>
