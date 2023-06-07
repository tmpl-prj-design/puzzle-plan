import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import ElementPlus from 'element-plus'
import i18n from './intl/index'

import App from './App.vue'
import GIcon from '@/components/global/g_icon/GIcon.vue'
import GDialog from '@/components/global/GDialog.vue'
import GDrawer from '@/components/global/GDrawer.vue'
import GEllipsis from '@/components/global/GEllipsis.vue'
import GPagination from '@/components/global/GPagination.vue'
import * as ElementIcon from '@/components/global/g_icon/element_icon.js'

import '@/assets/css/index.scss'
import 'animate.css'

const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(createPinia())
app.use(ElementPlus, { zIndex: 3000 })

// global cpt
app.component('GIcon', GIcon)
app.component('GDialog', GDialog)
app.component('GDrawer', GDrawer)
app.component('GEllipsis', GEllipsis)
app.component('GPagination', GPagination)
for (const [key, component] of Object.entries(ElementIcon)) {
  app.component(key, component)
}

app.mount('#app')
