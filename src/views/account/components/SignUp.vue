<template>
  <Form v-slot="{ validate }" :validation-schema="validationSchema">
    <Field
      v-model="signUpdetails.email"
      name="email"
      v-slot="{ field, errors }"
    >
      <v-text-field
        v-bind="field"
        class="mb-4"
        type="email"
        label="Email"
        :error-messages="errors"
        @keydown.enter="signUp(validate)"
      />
    </Field>

    <Field
      v-model="signUpdetails.password"
      name="password"
      v-slot="{ field, errors }"
    >
      <v-text-field
        v-bind="field"
        label="Password"
        class="mb-4"
        :type="showPassword ? 'text' : 'password'"
        :error-messages="errors"
        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="showPassword = !showPassword"
        @keydown.enter="signUp(validate)"
      />
    </Field>

    <v-text-field
      v-model="confirmPassword"
      name="confirmPassword"
      :type="showPassword ? 'text' : 'password'"
      label="Confirm Password"
      class="mb-4"
      :error-messages="matchingPasswordError"
      :disabled="!signUpdetails.password"
      :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append-inner="showPassword = !showPassword"
      @input="validateMatchingPassword"
      @keydown.enter="signUp(validate)"
    />

    <v-btn
      class="w-100 py-6"
      color="blue-darken-2"
      text-color="white"
      @click="signUp(validate)"
    >
      Sign up
    </v-btn>
  </Form>
</template>

<script lang="ts">
  import { createEmailAccount } from '@/api/auth'
  import { defineComponent, ref } from 'vue'
  import { SignUpForm } from '../types/account.types'
  import { Field, ErrorMessage, Form, ValidationResult } from 'vee-validate'
  import { validationSchema } from '../../../helpers/utility'

  export default defineComponent({
    name: 'SignUp',
    components: {
      Field,
      ErrorMessage,
      Form,
    },
    setup() {
      const confirmPassword = ref<string>('')
      const matchingPasswordError = ref<[] | string>([])
      const showPassword = ref<boolean>(false)
      const signUpdetails = ref<SignUpForm>({
        email: '',
        password: '',
      })

      const signUp = async (validateFn: Function): Promise<void> => {
        const valid: ValidationResult = await validateFn()
        const isPasswordMatching: [] | string = validateMatchingPassword()

        if (
          valid.valid &&
          Array.isArray(isPasswordMatching) &&
          isPasswordMatching.length === 0
        ) {
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

      return {
        signUpdetails,
        confirmPassword,
        validationSchema,
        matchingPasswordError,
        showPassword,
        signUp,
        validateMatchingPassword,
      }
    },
  })
</script>
