import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { worker } from '@/mocks/browser.ts'

if (import.meta.env.DEV) {
  console.log('gw dev');
  worker.start();
}

const app = createApp(App)

app.use(router)

app.mount('#app')
