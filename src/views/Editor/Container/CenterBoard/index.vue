<template>
  <div class="flex-auto select-none center-board" @click="onActiveCompReset">
    <div class="draw-board">
      <el-row :gutter="formConf.gutter" class="drawing-board">
        <vue-draggable
          :value="drawViews"
          v-bind="dragOptions"
          tag="el-form"
          class="draw-views"
          :component-data="elTagData"
          @add="onDrawItemAdd"
          @remove="onDrawItemRemove"
          @update="onDrawViewsUpdate"
          @start="onDrawItemDragStart"
          @end="onDrawItemDragEnd">
            <DraggableItem
              v-for="(item) in drawViews"
              :key="item.renderKey"
              :current-item="item"
              :active-id="activeId"
              :draw-views="drawViews"
              :item-border="compBorder"
              :locked="locked"
              @activeItem="onChoose"
              @itemCopy="drawItemCopy"
              @itemDel="drawItemDel">
            </DraggableItem>
        </vue-draggable>
      </el-row>
      <div v-if="!drawViews.length" class="text-center empty-info"><i class="el-icon-warning" />从左侧拖入组件</div>
    </div>
  </div>
</template>
<script>
// import _ from 'lodash'
import VueDraggable from 'vuedraggable'
import { onDrawItemAdd, onDrawItemRemove, onDrawItemDragStart, onDrawItemDragEnd, onDrawViewsUpdate, onChoose, drawItemCopy, drawItemDel } from '@u/drawItemProps'

import { mapGetters } from 'vuex'
import DraggableItem from '@c/DraggableItem'

export default {
  components: { VueDraggable, DraggableItem },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['drawViews', 'formConf', 'activeId', 'dragEl', 'compBorder', 'locked']),
    dragOptions () {
      return {
        element: 'div',
        forceFallback: true, // 如果设置为 true , 将不使用原生的html5拖放, 可以修改一些拖放中的样式
        animation: 300, // 动画时间, 单位:ms
        scroll: true, // 当排序容器是个可滚动的区域，拖放可以引起滚动
        sort: true,
        delay: 100,
        disabled: this.locked,
        ghostClass: 'customGhost',
        group: 'component'
      }
    },
    elTagData () {
      return {
        props: {
          elTagData: this.formConf.elTagData,
          labelPosition: this.formConf.labelPosition,
          labelWidth: this.formConf.labelWidth + 'px',
          size: this.formConf.size,
          disabled: this.formConf.disabled
        }
      }
    }
  },
  methods: {
    onDrawItemAdd,
    onDrawItemRemove,
    onDrawItemDragStart,
    onDrawItemDragEnd,
    onDrawViewsUpdate,
    onChoose,
    drawItemCopy,
    drawItemDel,

    onActiveCompReset () {
      this.$store.dispatch('ActiveCompReset')
    }
  }
}
</script>
<style lang="scss" scoped>
.flip-list {
  transition: transform 1s;
}

.center-board {
  border-left: 1px solid #f1e8e8;
  border-right: 1px solid #f1e8e8;
}
.draw-board {
  height: 100%;
  padding: 20px 10px;
  box-sizing: border-box;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
}
.draw-views {
  min-height: 100%;
}
.drawing-board {
  height: 100%;
}
.empty-info {
  position:absolute;
  top: 50%;
  height:50px; width: 100%;
  line-height: 50px;
  margin-top: -25px;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 5px;
  color: $colorActive;
}
</style>
