import store from '@/store'
import _ from 'lodash'

// const { drawViews, dragEl } = store.getters

const onDrawItemAdd = (evt, pItem) => {
  const addItem = _.cloneDeep(store.getters.dragEl)
  // 创建 id 和 key
  createIdAndKey(addItem)
  // 更新 DrawViews
  store.dispatch('DrawViewsAdd', { pItem, newIndex: evt.newIndex, addItem })
  // 更新 选中组件
  onChoose(addItem)
}

const onDrawItemRemove = (evt, pItem) => {
  // 移除 DrawItem
  store.dispatch('DrawViewsRemove', { pItem, oldIndex: evt.oldIndex })
}

const onDrawItemDragStart = (evt) => {
  store.dispatch('DragElChange', evt.item._underlying_vm_)
}
const onDrawItemDragEnd = (evt) => {
  store.dispatch('DragElReset')
}

const onDrawViewsUpdate = (evt, pItem) => {
  // console.log('evt', evt)
  const newIndex = evt.newIndex
  const oldIndex = evt.oldIndex
  const item = evt.item._underlying_vm_

  store.dispatch('DrawViewsSort', { pItem, newIndex, oldIndex, activeItem: item })
  // 更新 选中组件
  onChoose(item)
}

const onChoose = (item) => {
  store.dispatch('ActiveCompChange', item)
}

const createIdAndKey = (item) => {
  const config = item.__config__
  config.id = new Date().getTime()
  config.renderKey = `${config.id}`
  if (config.layout === 'colFormItem') {
    item.__vModel__ = `field${config.id}`
  } else if (['row', 'col'].includes(config.layout)) {
    config.componentName = `${config.layout}-${new Date().getTime()}`
    !Array.isArray(config.children) && (config.children = [])
    delete config.label // row/col 无需配置label属性
  }
  if (Array.isArray(config.children)) {
    config.children = config.children.map(childItem => createIdAndKey(childItem))
  }
  return item
}

const drawItemCopy = (item) => {
  store.dispatch('DrawItemCopy', item)
}

const drawItemDel = (item) => {
  store.dispatch('DrawItemDel', item)
  store.dispatch('ActiveCompReset')
}

export {
  onDrawItemAdd,
  onDrawItemRemove,
  onDrawItemDragStart,
  onDrawItemDragEnd,
  onDrawViewsUpdate,
  onChoose,
  drawItemCopy,
  drawItemDel
}
