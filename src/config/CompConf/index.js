import inputComponents from './inputComponents'
import selectComponents from './selectComponents'
import btnComponents from './btnComponents'
import layoutComponents from './layoutComponents'

const formCompList = [
  {
    label: '输入型组件',
    type: 'inputComponents',
    icon: 'components',
    list: inputComponents
  },
  {
    label: '选择型组件',
    type: 'selectComponents',
    icon: 'components',
    list: selectComponents
  },
  {
    label: '按钮型组件',
    type: 'btnComponents',
    icon: 'components',
    list: btnComponents
  },
  {
    label: '布局型组件',
    type: 'layoutComponents',
    icon: 'components',
    list: layoutComponents
  }
]

export { formCompList }
