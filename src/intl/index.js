import { createI18n } from 'vue-i18n'
import { ProductLangs } from './lang'
import { store } from '@/stores/lang'

const i18n = createI18n({
  legacy: false, // 使用组合API需要
  allowComposition: true,
  locale: store.lang,
  fallbackLocale: 'zh',
  messages: ProductLangs
})

export default i18n
