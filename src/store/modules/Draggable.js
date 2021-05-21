
import _ from 'lodash'

// 定义初始值
const defaultState = {
  dragEl: null
}

// state
const state = _.cloneDeep(defaultState)

const mutations = {
  SET_DRAGELCHANGE: (state, data) => {
    state.dragEl = _.cloneDeep(data)
  },
  SET_DRAGELRESET: (state) => {
    state.dragEl = null
  }
}

const actions = {
  DragElChange ({ commit }, args) {
    commit('SET_DRAGELCHANGE', args)
  },
  DragElReset ({ commit }) {
    commit('SET_DRAGELRESET')
  }
}

export default {
  state,
  mutations,
  actions
}
