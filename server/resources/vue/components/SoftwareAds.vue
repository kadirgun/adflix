<template>
  <div class="flex justify-center">
    <div class="card w-[300px] bg-base-100 shadow-xl">
      <figure class="bg-orange-600">
        <div class="h-[250px] flex flex-col justify-center align-middle">
          <img src="https://w7.pngwing.com/pngs/521/255/png-transparent-computer-icons-data-file-document-file-format-others-thumbnail.png" alt="">
        </div>
      </figure>
      <div class="card-body">
       

        <div class="card-actions justify-end">
          <button class="btn btn-primary btn-block normal-case">Download {{ state.link.name }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';


const state = reactive({
  link: window.link
})

</script>

<style lang="scss" scoped>

</style>