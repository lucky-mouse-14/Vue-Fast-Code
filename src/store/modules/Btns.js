
import _ from 'lodash'

// 定义初始值
const defaultState = {
  run: false,
  json: false,
  compBorder: false,
  locked: false
}

// state
const state = _.cloneDeep(defaultState)

const mutations = {
  SET_RUN: (state, value) => {
    state.run = !!value
  },
  SET_JSON: (state, value) => {
    state.json = !!value
  },
  SET_COMPBORDER: (state, value) => {
    state.compBorder = !!value
  },
  SET_LOCKED: (state, value) => {
    state.locked = !!value
  }
}

const actions = {
  RunChange ({ commit }, args) {
    commit('SET_RUN', args)
  },
  JsonChange ({ commit }, args) {
    commit('SET_JSON', args)
  },
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
