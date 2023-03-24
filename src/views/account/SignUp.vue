<template>
  <xf-text-input
    v-model="signUpdetails.email"
    type="email"
    label="Email"
    colour="grey"
    @keydown.enter="signUp"
  />

  <xf-text-input
    v-model="signUpdetails.password"
    label="Password"
    colour="grey"
    :type="showPassword ? 'text' : 'password'"
    :append-icon="showPassword ? 'icons/eye.svg' : 'icons/eye-slash.svg'"
    @click:append="showPassword = !showPassword"
    @keydown.enter="signUp"
  />

  <xf-text-input
    v-model="confirmPassword"
    name="confirmPassword"
    :type="showPassword ? 'text' : 'password'"
    label="Confirm Password"
    colour="grey"
    :disabled="!signUpdetails.password"
    :append-icon="showPassword ? 'icons/eye.svg' : 'icons/eye-slash.svg'"
    @click:append="showPassword = !showPassword"
    @input="validateMatchingPassword"
    @keydown.enter="signUp"
  />

  <xf-button
    class="xf-w-100 xf-mt-4"
    background-colour="blue-darken-2"
    @click="signUp"
  >
    Sign up
  </xf-button>
</template>

<script lang="ts" setup>
  import { createEmailAccount } from '@/api/auth'
  import { ref } from 'vue'
  import { SignUpForm } from './types/account.types'
  import { XfTextInput, XfButton } from 'xf-cmpt-lib'

  // ** Data **
  const confirmPassword = ref<string>('')
  const matchingPasswordError = ref<[] | string>([])
  const showPassword = ref<boolean>(false)
  const signUpdetails = ref<SignUpForm>({
    email: '',
    password: '',
  })

  // ** Methods **
  const signUp = async (): Promise<void> => {
    const isPasswordMatching: [] | string = validateMatchingPassword()

    if (Array.isArray(isPasswordMatching) && isPasswordMatching.length === 0) {
      const { email, password } = signUpdetails.value

      createEmailAccount(email, password)
    }
  }

  const validateMatchingPassword = (): [] | string => {
    if (signUpdetails.value.password && confirmPassword.value) {
      const isMatching: [] | string =
        signUpdetails.value.password === confirmPassword.value
          ? []
          : "Password doesn't match"
      matchingPasswordError.value = isMatching

      return isMatching
    } else {
      matchingPasswordError.value = "Password doesn't match"
      return "Password doesn't match"
    }
  }
</script>
