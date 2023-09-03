<template>
  <div class="flex flex-col justify-center align-center w-[100vw] h-[100vh] relative">
    <div class="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
    <template v-if="!state.loading">
      <template v-if="state.link.protected">
        <PasswordCard @passed="onPasswordPassed" />
      </template>
      <template v-else>
        <BannerAds v-if="state.ads?.type == 1" :ads="state.ads" :click="state.click" @skip="getAdvert" />
        <SoftwareAds v-else-if="state.ads?.type == 'software'" />
        <VideoAds v-else-if="state.ads?.type == 2" @passed="getAdvert" />
        <DirectLinkAds v-else-if="state.ads?.type == 4" :ads="state.ads" :click="state.click" @skip="getAdvert" />
      </template>
    </template>
    <Loader v-else />
  </div>
</template>

<script setup>
import BannerAds from '@/components/BannerAds.vue';
import SoftwareAds from '@/components/SoftwareAds.vue';
import VideoAds from '@/components/VideoAds.vue';
import Loader from '@/components/Loader.vue';
import PasswordCard from '@/components/PasswordCard.vue';
import { reactive } from 'vue';
import { useReCaptcha } from 'vue-recaptcha-v3';
import DirectLinkAds from './components/DirectLinkAds.vue';
import { checkProxy } from './utils/proxy';
import client from './utils/client';

const state = reactive({
  ads: {},
  loading: true,
  click: {},
  link: window.link
})

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
  const isProxy = await checkProxy();
  
  const response = await client.post('/clicks', {
    recaptcha,
    link_id: window.link.id,
    proxy: isProxy
  })

  state.click = response.data;
}

const getAdvert = async () => {
  state.ads = {};
  state.loading = true;

  const response = await client.post('/advert', {
    token: state.click.token
  });

  const data = response.data;

  if (data.id) {
    state.ads = data;
    state.loading = false;
  }
}

const sendEvent = async () => {
  client.post('/events', {
    token: state.click.token,
    advert_id: state.ads.id,
  });
}

if (!state.link.protected) {
  init();
} else {
  state.loading = false;
}

const onPasswordPassed = () => {
  state.loading = true;
  state.link.protected = false;
  init();
}

</script>

<style lang="css">
.grecaptcha-badge {
  display: none !important;
}
</style>