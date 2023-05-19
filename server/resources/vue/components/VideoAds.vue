<template>
  <div class="flex justify-center">
    <div class="card bg-base-100 shadow-xl h-[50vh] aspect-video">
      <video ref="playerRef" class="aspect-video"></video>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css'

const emit = defineEmits(['passed']);

const state = reactive({
  link: window.link
})

const playerRef = ref(null);

onMounted(() => {
  const player = new Plyr(playerRef.value, {
    controls: ['play-large'],
    ads: {
      tagUrl: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=",
      enabled: true,
    },
  });

  //listen event when ads is ended
  player.on('adscomplete', () => {
    emit('passed');
  });
});

</script>

<style lang="scss" scoped></style>