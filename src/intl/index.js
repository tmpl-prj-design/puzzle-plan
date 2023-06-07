import { createI18n } from 'vue-i18n'
import { getDefaultLang } from '@/utils/broswer'

import en from './en'
import zh from './zh'

const i18n = createI18n({
  legacy: false, // 使用组合API需要
  allowComposition: true,
  locale: getDefaultLang(),
  fallbackLocale: 'zh',
  messages: {
    zh,
    en
  }
})

export default i18n
