<template>
  <div class="flex justify-center">
    <div class="card w-[300px] bg-base-100 shadow-xl">
      <div class="h-[250px] flex flex-col justify-center align-middle">
        <iframe ref="frame" :src="`/banner/${ads.id}`" frameborder="0" width="100%" height="100%"></iframe>
      </div>
      <div class="card-body">
        <div class="card-title">Please wait!</div>
        <progress class="progress progress-info w-100"></progress>

        <div class="card-actions justify-end">
          <button class="btn btn-primary btn-block normal-case" @click="$emit('skip')">Skip Ads</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch, watchEffect } from 'vue';
import { useMousePressed, useMouseInElement, useActiveElement, useElementHover  } from '@vueuse/core'

const frame = ref(null);

const props = defineProps({
  ads: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['conversion', 'skip'])

const state = reactive({
  link: window.link
})

const activeElement = useActiveElement()

onMounted(() => {
  window.addEventListener('blur', () => {
    if(activeElement.value == frame.value){
      emit('conversion');
    }
  });
})
</script>

<style lang="scss" scoped></style>