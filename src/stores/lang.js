import { ref } from 'vue'
import { defineStore } from 'pinia'
import { storage } from '@/utils/storage'
import { getDefaultLang } from '@/utils/broswer'

/**
 * 语言信息存储
 * @example
 * import { useLangStore } from '@/stores/lang'
 * const langStore = useLangStore()
 *
 * // 展示当前语言
 * console.log(langStore.lang)
 *
 * // 更换语言
 * langStore.setLang('zh')
 */
export const useLangStore = defineStore('lang', () => {
  const lang = ref(getDefaultLang())
  function setLang(curLang) {
    lang.value = curLang
    storage.set('lang', curLang)
  }
  return { lang, setLang }
})
