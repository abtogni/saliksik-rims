/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import router from '../router'
import VueDatePicker from '@vuepic/vue-datepicker';
import { createPinia } from 'pinia'
import '@vuepic/vue-datepicker/dist/main.css'

// Types
import type { App } from 'vue'

const pinia = createPinia()

export function registerPlugins(app: App) {
  app
    .use(pinia)
    .use(vuetify)
    .use(router)
    .component('VueDatePicker', VueDatePicker);
}
