<template>
  <Form v-slot="{ validate }" :validation-schema="validationSchema">
    <Field v-model="logInDetails.email" name="email" v-slot="{ field, errors }">
      <v-text-field
        v-bind="field"
        class="mb-4"
        label="Email"
        type="email"
        :error-messages="errors"
        @keydown.enter="logIn(validate)"
      />
    </Field>

    <Field
      v-model="logInDetails.password"
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
        @keydown.enter="logIn(validate)"
      />
    </Field>

    <v-btn
      class="w-100"
      color="blue-darken-2"
      text-color="white"
      @click="logIn(validate)"
    >
      Sign in
    </v-btn>
  </Form>
</template>

<script lang="ts">
  import { Field, ErrorMessage, Form, ValidationResult } from 'vee-validate'
  import { signInEmailAccount } from '@/api/auth'
  import { defineComponent, ref } from 'vue'
  import { LogInForm } from '../types/account.types'
  import { validationSchema } from '../../../helpers/utility'

  export default defineComponent({
    name: 'LogIn',
    components: {
      Field,
      ErrorMessage,
      Form,
    },
    setup() {
      const showPassword = ref<boolean>(false)
      const logInDetails = ref<LogInForm>({
        email: '',
        password: '',
      })

      const logIn = async (validateFn: Function): Promise<void> => {
        const valid: ValidationResult = await validateFn()

        if (valid.valid) {
          const { email, password } = logInDetails.value

          signInEmailAccount(email, password)
        }
      }

      return {
        logInDetails,
        showPassword,
        validationSchema,
        logIn,
      }
    },
  })
</script>
