<template>
  <div class="flex justify-center">
    <div class="card w-[300px] bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="card-title">Please wait!</div>
        <div>We are checking your browser.</div>
        <progress class="progress progress-info w-100" :value="progress" max="100"></progress>

        <div class="card-actions justify-end">
          <a :href="url" target="_blank" class="btn btn-primary btn-block normal-case" @click="onClick" :class="{'btn-disabled': remaining > 0}">
            <template v-if="remaining > 0">
              Skip in {{ remaining }} seconds
            </template>
            <template v-else>
              Skip
            </template>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue';
import { useInterval } from '@vueuse/core'
import { usePageLeave } from '@vueuse/core'

const props = defineProps({
  ads: {
    type: Object,
    required: true
  },
  click: {
    type: Object,
    required: true
  }
})

const isLeft = usePageLeave()
const emit = defineEmits(['skip'])

const state = reactive({
  link: window.link,
  clicked: false
})

const url = computed(() => {
  const url = new URL(props.ads.data.url);
  url.searchParams.append('click_id', props.click.token);
  return url.href;
})

const waitSeconds = 1;
const waitTime = waitSeconds * 1000;
const interval = 50;
const { counter, pause } = useInterval(interval, { controls: true })

const progress = computed(() => {
  return parseInt(((counter.value * interval) / waitTime) * 100);
})

const remaining = computed(() => {
  return Math.ceil(waitSeconds - (counter.value * interval / 1000));
})

const onClick = () => {
  state.clicked = true;
}

watch(isLeft, (value) => {
  if (!value && state.clicked) {
    emit('skip');
  }
})

watch(progress, (value) => {
  if (value >= 100) {
    pause();
  }
})
</script>

<style lang="scss" scoped></style>