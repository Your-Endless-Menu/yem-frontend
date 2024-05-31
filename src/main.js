import '@/assets/styles.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import 'vant/lib/index.css';

import { Locale } from 'vant';
import enUS from 'vant/es/locale/lang/en-US';
import axios from 'axios'

Locale.use('en-US', enUS);

const app = createApp(App)

axios.interceptors.request.use(
  function(config) {
    config.withCredentials = true;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

app.use(router)

app.use(VueCookies)

app.mount('#app')
