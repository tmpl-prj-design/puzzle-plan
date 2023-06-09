import E_ZH from 'element-plus/lib/locale/lang/zh-cn'
import E_EN from 'element-plus/lib/locale/lang/en'

import P_ZH from './langs/zh'
import P_EN from './langs/en'

// 语言映射
const LangZh = 'zh',
  LangEn = 'en'
export const Langs = [LangZh, LangEn]

const LangMaps = new Map([
  ['zh', LangZh],
  ['zh-cn', LangZh],
  ['en', LangEn],
  ['en-us', LangEn]
])

// Element 组件库语言
export const ElementLangs = {
  [LangZh]: E_ZH,
  [LangEn]: E_EN
}

// 产品 内置语言
export const ProductLangs = {
  [LangZh]: P_ZH,
  [LangEn]: P_EN
}

// 获取产品默认语言 localStorage > broswer > 'zh'
export function getDefaultLang() {
  const getBroswerLang = () => {
    if (navigator.languages) return navigator.languages[0]
    return navigator.language || navigator.userLanguage
  }
  const broswerLang = getBroswerLang().toLowerCase()
  return window.localStorage.getItem('lang') || LangMaps.get(broswerLang) || 'zh'
}
