
import _ from 'lodash'

// 定义初始值
const defaultState = {
  compBorder: false,
  locked: false
}

// state
const state = _.cloneDeep(defaultState)

const mutations = {
  SET_COMPBORDER: (state, value) => {
    state.compBorder = !!value
  },
  SET_LOCKED: (state, value) => {
    state.locked = !!value
  }
}

const actions = {
  CompBorderChange ({ commit }, args) {
    commit('SET_COMPBORDER', args)
  },
  LockedChange ({ commit }, args) {
    commit('SET_LOCKED', args)
  }
}

export default {
  state,
  mutations,
  actions
}
