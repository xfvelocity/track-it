<template>
  <div
    class="upload-image my-8 d-flex align-center justify-center"
    @click="initCamera"
  >
    <img v-if="img" class="w-100 h-100" style="z-index: 10" :src="img" alt="" />
    <div v-else>
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
      const photo = ref<HTMLElement | null>(null)

      const initCamera = () => {
        if (photo && photo.value) photo.value.click()
      }

      const handleImageUpload = (event: Event) => {
        const target = <HTMLInputElement>event.target
        const files: FileList | null = target.files
        if (files && files.length) createImage(files[0])
      }

      const createImage = (file: File) => {
        const reader: FileReader = new FileReader()

        reader.onload = (e: ProgressEvent<FileReader>) =>
          context.emit('img-upload', e.target!.result)
        reader.readAsDataURL(file)
      }

      return {
        photo,
        initCamera,
        handleImageUpload,
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
  }
</style>
