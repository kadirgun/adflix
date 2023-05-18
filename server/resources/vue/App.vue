<template>
  <div class="flex flex-col justify-center align-center w-[100vw] h-[100vh]">
    <template v-if="!state.loading">
      <BannerAds v-if="state.ads?.type == 1" :ads="state.ads" @conversion="sendEvent" @skip="getAdvert" />
      <SoftwareAds v-else-if="state.ads?.type == 'software'" />
    </template>
    <Loader v-else />
  </div>
</template>

<script setup>
import BannerAds from '@/components/BannerAds.vue';
import SoftwareAds from '@/components/SoftwareAds.vue';
import Loader from '@/components/Loader.vue';
import { reactive } from 'vue';
import { useReCaptcha } from 'vue-recaptcha-v3';

const state = reactive({
  ads: {},
  loading: true,
  click: {}
})

const APP_URL = import.meta.env.VITE_APP_URL;

const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();

const init = async () => {
  const loaded = await recaptchaLoaded();
  if (loaded) {
    await createClick();
    await getAdvert();
  }
}

const createClick = async () => {
  const recaptcha = await executeRecaptcha('click');

  const response = await fetch(`${APP_URL}/clicks`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      recaptcha,
      link_id: window.link.id
    })
  });

  const click = await response.json();
  state.click = click;
}

const getAdvert = async () => {
  state.ads = {};
  state.loading = true;
  
  const response = await fetch(`${APP_URL}/advert`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: state.click.token
    })
  });

  const data = await response.json();

  if (data.id) {
    state.ads = data;
    state.loading = false;
  }
}

const sendEvent = async () => {
  const response = await fetch(`${APP_URL}/events`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: state.click.token,
      advert_id: state.ads.id,
    })
  })
}

init();

</script>

<style lang="css">
.grecaptcha-badge {
  display: none !important;
}
</style>