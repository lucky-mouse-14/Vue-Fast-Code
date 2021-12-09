<script>
import VueDraggable from 'vuedraggable'
// import _ from 'lodash'
import { onDrawItemAdd, onDrawItemRemove, onDrawItemDragStart, onDrawItemDragEnd, onDrawViewsUpdate } from '@u/drawItemProps'
import Render from '@c/Render'

const components = {
  itemBtns (h, currentItem, drawViews) {
    const { itemCopy, itemDel } = this.$listeners
    // eslint-disable-next-line no-unused-expressions
    return [
      <div class="draw-item__btns">
        <span
          title="复制"
          class="draw-item__btn copy"
          onClick={event => { itemCopy(currentItem); event.stopPropagation() }}
        ><i class="el-icon-copy-document" />
        </span>
        <span
          title="删除"
          class="draw-item__btn delete"
          onClick={event => { itemDel(currentItem); event.stopPropagation() }}
        ><i class="el-icon-delete" />
        </span>
      </div>
    ]
  }
}

const layouts = {
  colFormItem (h, currentItem, drawViews) {
    const { activeItem } = this.$listeners
    const config = currentItem.__config__

    let className = 'draw-item draw-item__bg'
    if (this.activeId === config.id) className = className + ' active'
    if (this.itemBorder) className = className + ' border'

    let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null
    if (config.showLabel === false) labelWidth = '0'

    return (
      <el-col span={config.span}>
        <div class={className}>
          <el-form-item
            label={config.showLabel ? config.label : ''}
            label-width={labelWidth}
            required={config.required}
            nativeOnClick={event => { activeItem(currentItem); event.stopPropagation() }}>
            <Render key={config.renderKey} el={currentItem} on-input={event => { this.$set(config, 'defaultValue', event) }}></Render>
          </el-form-item>
          {components.itemBtns.apply(this, arguments)}
        </div>
      </el-col>
    )
  },
  row (h, currentItem, drawViews) {
    const { activeItem } = this.$listeners
    const config = currentItem.__config__

    let className = 'draw-item draw-item__border'
    if (this.activeId === config.id) className = className + ' active'
    if (this.itemBorder) className = className + ' border'

    const child = renderChildren.apply(this, arguments)

    return (
      <el-col span={config.span}>
        <el-row
          // gutter={config.gutter}
          class={className}
          nativeOnClick={event => { activeItem(currentItem); event.stopPropagation() }}>
          <span class="component-name">{config.componentName}</span>
          <VueDraggable
            value={config.children || []}
            element='div'
            class="row-wrapper"
            disabled={this.locked}
            forceFallback={true}
            animation={300}
            scroll={true}
            delay={100}
            ghostClass='customGhost'
            group="component"
            onAdd={ event => { onDrawItemAdd(event, currentItem) } }
            onRemove={ event => { onDrawItemRemove(event, currentItem) } }
            onUpdate={ event => { onDrawViewsUpdate(event, currentItem) } }
            onStart={ event => { onDrawItemDragStart(event) } }
            onEnd={ event => { onDrawItemDragEnd(event) } }
          >
            {child}
          </VueDraggable>
          {components.itemBtns.apply(this, arguments)}
        </el-row>
      </el-col>
    )
  }
}

function renderChildren (h, currentItem, drawViews) {
  const config = currentItem.__config__
  if (!Array.isArray(config.children)) return null
  return config.children.map((item, i) => {
    const layout = layouts[item.__config__.layout]
    if (!layout) {
      return layoutIsNotFound.call(this)
    }
    return layout.call(this, h, item, config.children)
  })
}

function layoutIsNotFound () {
  throw new Error(`没有与${this.currentItem.__config__.layout}匹配的layout`)
}

export default {
  name: 'DraggableItem',
  props: {
    currentItem: {
      type: Object,
      default: null
    },
    activeId: {
      type: Number,
      default: null
    },
    drawViews: {
      type: Array,
      default: null
    },
    itemBorder: {
      type: Boolean,
      default: false
    },
    locked: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  render: function (h) {
    const layout = layouts[this.currentItem.__config__.layout]
    if (!layout) {
      return layoutIsNotFound.call(this)
    }
    return layout.call(this, h, this.currentItem, this.drawViews)
  }
}
</script>
<style lang="scss" scoped>
// draw-item
.draw-item {
  position: relative;
  cursor: move;
  border-radius: 5px;
  padding: 10px;
  border: 1px dashed transparent;
  box-sizing: border-box;
  &.active.draw-item__bg {
    background-color: $bgColor;
  }
  &.active.draw-item__border {
    border-color: $--color-primary;
  }
  &.active > .draw-item__btns {
    display: block;
  }
  &.border {
    border-color: $--color-primary;
  }
  .el-form-item {
    margin: 0;
  }
  margin-bottom: 20px;
  .row-wrapper {
    min-height: 80px;
  }
}

// .draw-item__el {
//   border-radius: 5px;
//   padding: 10px;
//   border: 1px dashed transparent;
// }

.draw-item__border {
  border-color: #ccc;
}

// draw-item__btns
.draw-item__btns {
  display: block;
}
.draw-item__btns {
  display:none;
  position: absolute;
  top: 0; right: 0;
  font-size: 12px;
  margin-top: -12px;
  padding: 0 10px;
}
.draw-item__btn {
  display: inline-block;
  background-color: #fff;
  width: 22px;height: 22px;
  line-height: 22px;
  text-align: center;
  cursor: pointer;
  border-radius: 50%;
  border: 1px solid $--color-primary;
  color: $--color-primary;
  &.delete {
    border-color: $textRed;
    color: $textRed;
    &:hover {
      background-color: $textRed;
    }
  }
  &:hover {
    background-color: $--color-primary;
    color: #fff;
  }
}
.draw-item__btn + .draw-item__btn {
  margin-left: 15px;
}
</style>
