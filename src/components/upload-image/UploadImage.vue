<template>
  <div
    class="upload-image my-8 d-flex align-center justify-center"
    @click="initCamera"
  >
    <div
      v-show="img && !editingImage"
      class="w-100 h-100"
      style="position: relative"
    >
      <img
        class="w-100 h-100"
        style="z-index: 10; position: relative"
        :src="img"
        alt=""
      />
      <div class="d-flex upload-image__edit">
        <v-btn class="mr-2" color="blue" icon="" @click.stop="editImage">
          <span class="material-icons"> edit </span>
        </v-btn>
        <v-btn color="red" icon="" @click.stop="deleteImage">
          <span class="material-icons"> delete </span>
        </v-btn>
      </div>
    </div>

    <div v-show="!img || editingImage">
      Upload an Image
      <input
        ref="photo"
        type="file"
        accept="image/*"
        hidden
        @change="handleImageUpload"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { ref, defineComponent } from 'vue'

  export default defineComponent({
    name: 'UploadImage',
    props: {
      img: {
        type: String,
        default: '',
      },
    },
    setup(props, context) {
      const editingImage = ref<boolean>(false)
      const photo = ref<HTMLElement | null>(null)

      const initCamera = (): void => {
        if (photo.value) photo.value.click()
        editingImage.value = false
      }

      const editImage = (): void => {
        editingImage.value = true
        initCamera()
      }

      const deleteImage = (): void => {
        context.emit('img-upload', null)
      }

      const handleImageUpload = (event: Event): void => {
        const target = <HTMLInputElement>event.target
        const files: FileList | null = target.files
        if (files && files.length) createImage(files[0])
      }

      const createImage = (file: File): void => {
        const reader: FileReader = new FileReader()

        reader.onload = (e: ProgressEvent<FileReader>) =>
          context.emit('img-upload', e.target!.result)
        reader.readAsDataURL(file)
      }

      return {
        photo,
        initCamera,
        handleImageUpload,
        editImage,
        deleteImage,
        editingImage,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .upload-image {
    cursor: pointer;
    height: 410px;
    max-height: 410px;
    max-width: 410px;
    background: #ffffff0d;

    &__edit {
      position: absolute;
      top: 10px;
      z-index: 100;
      right: 10px;
    }
  }
</style>
