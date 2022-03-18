<template>
  <v-dialog v-model="modelValue" @click:outside="closeModal">
    <v-card class="pa-4">
      <slot />

      <div class="d-flex" v-if="actionButtons">
        <v-btn>Close</v-btn>
        <v-spacer />
        <v-btn>Submit</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Modal',
    props: {
      modelValue: {
        type: Boolean,
        default: false,
      },
      persistent: {
        type: Boolean,
        default: false,
      },
      actionButtons: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['update:modelValue'],
    setup(props, context) {
      const closeModal = (): void => {
        if (!props.persistent) {
          context.emit('update:modelValue')
        }
      }

      return {
        closeModal,
      }
    },
  })
</script>
