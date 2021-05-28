import Vue from 'vue'

// import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import axios from 'axios'
import '@/plugins/element-ui.js'

Vue.prototype.$axios = axios

Vue.config.debug = false
Vue.config.devtools = false
Vue.config.productionTip = false

const $previewApp = document.getElementById('previewApp')

console.log('$previewApp', $previewApp)

window.addEventListener('message', init, false)

function init (event) {
  if (event.data.type === 'refreshFrame') {
    const code = event.data.data

    // css 资源链接
    const links = buildLinks(code.links)
    // js 资源链接
    const scripts = buildScripts(code.scripts)

    $previewApp.innerHTML = `${links}<style>${code.css}</style><div id="app"></div>${scripts}`

    const attrs = ''

    newVue(attrs, code.js, code.html)
  }
}

function buildLinks (links) {
  let result = ''
  if (links && links.length) {
    links.forEach(url => {
      result += `<link href="${url}" rel="stylesheet">`
    })
  }
  return result
}

function buildScripts (scripts) {
  let result = ''
  if (scripts && scripts.length) {
    scripts.forEach(src => {
      result += `<srcipt src="${src}" type="text/javascript"></script>`
    })
  }
  return result
}

function newVue (attrs, main, html) {
  // eslint-disable-next-line no-eval
  main = eval(`(${main})`)
  main.template = `${html}`
  new Vue({
    components: {
      child: main
    },
    data () {
      return {
        visable: true
      }
    },
    template: `<div class="container"><child ${attrs} /></div>`
  }).$mount('#app')
}

// new Vue({
//   render: h => h(App)
// }).$mount('#previewApp')
