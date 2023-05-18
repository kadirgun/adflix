import { createApp } from 'vue';
import App from '@/App.vue';
import { VueReCaptcha } from 'vue-recaptcha-v3'
import '@/app.css';

const app = createApp(App)
app.use(VueReCaptcha, {
  siteKey: import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY,
})
app.mount('#app');