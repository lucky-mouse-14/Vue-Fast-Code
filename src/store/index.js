import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

import DrawViews from './modules/DrawViews'
import ActiveComp from './modules/ActiveComp'
import Draggable from './modules/Draggable'
import Btns from './modules/Btns'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    DrawViews,
    ActiveComp,
    Draggable,
    Btns
  },
  getters
})

export default store
