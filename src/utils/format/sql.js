import useClipboard from 'vue-clipboard3'
import hljs from 'highlight.js/lib/core'
import sql from 'highlight.js/lib/languages/sql'
import { format } from 'sql-formatter'

hljs.registerLanguage('sql', sql) // 注册

const { toClipboard } = useClipboard()

/**
 * 格式化sql
 * @param {string} sql
 * @returns format sql
 */
export function formatSql(sql) {
  if (!sql) return
  try {
    return format(sql)
  } catch (error) {
    return sql
  }
}

/**
 * 复制函数
 * 复制内容/sql等，点击复制按钮，提示复制成功
 * 注意，需要在main.js中引入动画 'animate.css'
 * @param {String} copyData
 * @param {Dom} DomRef
 */
export async function copyContent(copyData, DomId) {
  try {
    await toClipboard(copyData)
  } catch (error) {
    // 当内容为空 或 复制出错时，重置剪切板内容为空
    navigator.clipboard.writeText('')
  }

  // 复制提示
  const Dom = document.querySelector('#' + DomId)
  const tipTxt = document.createElement('div')
  tipTxt.classList.add('animate__animated', 'animate__fadeOut', 'g-copied-tip')
  tipTxt.innerHTML = '复制成功!'
  tipTxt.addEventListener('animationend', () => {
    Dom.removeChild(tipTxt)
  })
  Dom.appendChild(tipTxt)
}

/**
 * 高亮sql
 * @param {string} sql
 * @returns hljsSql sql
 */
export function hljsSql(sqlCode) {
  // 第一种方式，组件使用
  // import hljsVuePlugin from '@highlightjs/vue-plugin'
  // const HighlightCpt = hljsVuePlugin.component
  // <HighlightCpt language="sql" :code="sqlCode" />

  // 第二种方式，根据hljs返回的内容，进行页面展示
  return hljs.highlight(sqlCode, { language: 'sql' }).value
}
