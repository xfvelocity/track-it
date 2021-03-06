<template>
  <v-dialog :model-value="modelValue" @click:outside="closeModal(persistent)">
    <v-card :color="colour" class="pa-4" width="350">
      <slot />

      <div class="d-flex mt-4" v-if="actionButtons">
        <v-spacer />
        <v-btn
          size="small"
          color="red"
          variant="text"
          @click="closeModal(false)"
        >
          {{ closeText }}
        </v-btn>

        <v-btn size="small" color="primary" variant="text" @click="confirm">
          {{ confirmText }}
        </v-btn>
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
      closeText: {
        type: String,
        default: 'Close',
      },
      confirmText: {
        type: String,
        default: 'Confirm',
      },
      colour: {
        type: String,
        default: 'white',
      },
    },
    emits: ['update:modelValue', 'confirmed'],
    setup(props, context) {
      const closeModal = (clickOutsidePersistent: boolean): void => {
        if (clickOutsidePersistent) return

        context.emit('update:modelValue')
      }

      const confirm = (): void => {
        context.emit('confirmed')
        closeModal(false)
      }

      return {
        confirm,
        closeModal,
      }
    },
  })
</script>
