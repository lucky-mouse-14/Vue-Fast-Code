
import _ from 'lodash'

// 定义初始值
const defaultState = {
  activeEl: null,
  activeId: null
}

// state
const state = _.cloneDeep(defaultState)

const mutations = {
  SET_ACTIVECOMP: (state, item) => {
    state.activeEl = item
    state.activeId = item.__config__.id
  },
  SET_ACTIVECOMPRESET: (state) => {
    state.activeEl = null
    state.activeId = null
  }
}

const actions = {
  ActiveCompChange ({ commit }, args) {
    commit('SET_ACTIVECOMP', args)
  },
  ActiveCompReset ({ commit }) {
    commit('SET_ACTIVECOMPRESET')
  }
}

export default {
  state,
  mutations,
  actions
}
