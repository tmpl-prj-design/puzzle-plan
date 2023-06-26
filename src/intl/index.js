import { createI18n } from 'vue-i18n'
import { ProductLangs, getDefaultLang } from './lang'

const i18n = createI18n({
  legacy: false, // 使用组合API需要
  allowComposition: true,
  locale: getDefaultLang(),
  fallbackLocale: 'zh',
  messages: ProductLangs
})

export default i18n
