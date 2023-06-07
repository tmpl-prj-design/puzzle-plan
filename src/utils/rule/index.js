import { NameRegx } from './regex' // 表单规则

import i18n from '@/intl'
const { t } = i18n.global
/**
 * 表单校验规则，使用getformRules定义是为了满足国际化需要
 * @example const { taskNameRule, required } = getformRules()
 */

export const getformRules = () => {
  return {
    required: {
      required: true,
      message: '必填项', // t('c_rules.required'),
      trigger: ['change']
    },
    taskNameRule: {
      required: true,
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error('必填项'))
        } else if (!NameRegx.test(value)) {
          callback(new Error(t('不合规')))
        } else {
          callback()
        }
      },
      trigger: ['change']
    }
  }
}
