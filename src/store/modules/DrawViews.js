
import _ from 'lodash'
import formConf from '@config/FormConf'

const loopDel = (arr, id) => {
  arr.forEach((item, index) => {
    if (item.__config__.id === id) {
      return arr.splice(index, 1)
    }
    if (item.__config__.children) {
      loopDel(item.__config__.children, id)
    }
  })
}
const loopCopy = (arr, id) => {
  arr.forEach((item, index) => {
    if (item.__config__.id === id) {
      const _item = _.cloneDeep(item)
      _item.__config__.id = new Date().getTime()
      return arr.splice(index + 1, 0, _item)
    }
    if (item.__config__.children) {
      loopCopy(item.__config__.children, id)
    }
  })
}
const loopAdd = (arr, id, newIndex, addItem) => {
  arr.forEach((item) => {
    if (item.__config__.id === id) {
      return item.__config__.children.splice(newIndex, 0, addItem)
    }
    if (item.__config__.children) {
      loopAdd(item.__config__.children, id, newIndex, addItem)
    }
  })
}
const loopRemove = (arr, id, oldIndex) => {
  arr.forEach((item) => {
    if (item.__config__.id === id) {
      return item.__config__.children.splice(oldIndex, 1)
    }
    if (item.__config__.children) {
      loopRemove(item.__config__.children, id, oldIndex)
    }
  })
}
const loopUpdate = (arr, id, newIndex, oldIndex, activeItem) => {
  arr.forEach((item) => {
    if (item.__config__.id === id) {
      if (newIndex > oldIndex) {
        item.__config__.children.splice(newIndex + 1, 0, activeItem)
        item.__config__.children.splice(oldIndex, 1)
      } else {
        item.__config__.children.splice(oldIndex, 1)
        item.__config__.children.splice(newIndex, 0, activeItem)
      }
      return true
    }
    if (item.__config__.children) {
      loopUpdate(item.__config__.children, id, newIndex, oldIndex, activeItem)
    }
  })
}

// 定义初始值
const defaultState = {
  drawViews: [],
  formConf
}

// state
const state = _.cloneDeep(defaultState)

const mutations = {
  SET_DRAWVIEWSADD: (state, data) => {
    const { pItem, newIndex, addItem } = data
    if (pItem) loopAdd(state.drawViews, pItem.__config__.id, newIndex, addItem)
    else state.drawViews.splice(newIndex, 0, addItem)
  },
  SET_DRAWVIEWSREMOVE: (state, data) => {
    const { pItem, oldIndex } = data
    if (pItem) loopRemove(state.drawViews, pItem.__config__.id, oldIndex)
    else state.drawViews.splice(oldIndex, 1)
  },
  SET_DRAWVIEWSSORT: (state, data) => {
    const { pItem, newIndex, oldIndex, activeItem } = data
    console.log('vuex sort', pItem, newIndex, oldIndex, state.drawViews)
    if (pItem) loopUpdate(state.drawViews, pItem.__config__.id, newIndex, oldIndex, activeItem)
    else {
      if (newIndex > oldIndex) {
        state.drawViews.splice(newIndex + 1, 0, activeItem)
        state.drawViews.splice(oldIndex, 1)
      } else {
        state.drawViews.splice(oldIndex, 1)
        state.drawViews.splice(newIndex, 0, activeItem)
      }
    }
  },
  SET_DRAWITEMDEL: (state, item) => {
    console.log('vuex del', item)
    loopDel(state.drawViews, item.__config__.id)
  },
  SET_DRAWITEMCOPY: (state, item) => {
    console.log('vuex copy', item)
    loopCopy(state.drawViews, item.__config__.id)
  },
  SET_DRAWVIEWSCLEAR: (state) => {
    state.drawViews = []
  }
}

const actions = {
  DrawViewsAdd ({ commit }, args) {
    commit('SET_DRAWVIEWSADD', args)
  },
  DrawViewsRemove ({ commit }, args) {
    commit('SET_DRAWVIEWSREMOVE', args)
  },
  DrawViewsSort ({ commit }, args) {
    commit('SET_DRAWVIEWSSORT', args)
  },
  DrawItemDel ({ commit }, args) {
    commit('SET_DRAWITEMDEL', args)
  },
  DrawItemCopy ({ commit }, args) {
    commit('SET_DRAWITEMCOPY', args)
  },
  DrawViewsClear ({ commit }) {
    commit('SET_DRAWVIEWSCLEAR')
  }
}

export default {
  state,
  mutations,
  actions
}
