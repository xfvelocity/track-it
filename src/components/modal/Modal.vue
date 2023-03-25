<template>
  <!-- TODO: UPDATE WITH XF-CMPT-LIB MODAL -->
  <v-dialog
    :model-value="modelValue"
    width="350"
    @click:outside="closeModal(!!persistent)"
  >
    <v-card :color="colour" class="pa-4">
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

<script lang="ts" setup>
  // ** Props **
  withDefaults(
    defineProps<{
      modelValue: boolean
      persistent?: boolean
      actionButtons?: boolean
      closeText?: string
      confirmText?: string
      colour?: string
    }>(),
    {
      closeText: 'Close',
      confirmText: 'Confirm',
      colour: 'white',
    }
  )

  // ** Emits **
  const emit = defineEmits(['update:modelValue', 'confirmed'])

  // ** Methods **
  const closeModal = (clickOutsidePersistent: boolean): void => {
    if (clickOutsidePersistent) return

    emit('update:modelValue')
  }

  const confirm = (): void => {
    emit('confirmed')
    closeModal(false)
  }
</script>
