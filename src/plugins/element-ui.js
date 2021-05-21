import Vue from 'vue'

import ElementUI from 'element-ui'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import zhLocale from 'element-ui/lib/locale/lang/zh-CN' // 中文

import '@themes/element-variables.scss'

Vue.use(ElementUI, { zhLocale })
