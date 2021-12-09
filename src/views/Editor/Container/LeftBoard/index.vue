<template>
  <div class="flex-grow-0 flex-shrink-0 select-none left-board" @click="onActiveCompReset">
    <div class="left-board-body">
      <div class="components-list">
        <div v-for="(components, i) in componetnsList" :key="i" class="components-panel">
          <div class="components-label"><svg-icon :icon-class="`icon-components`" /> {{components.label}}</div>
          <vue-draggable
            :value="components.list"
            v-bind="dragOptions"
            class="flex flex-wrap flex-auto justify-between components-content"
            :clone="onDragClone"
            :move="onDragMove"
            @end="onDragEnd">
            <div
              v-for="(item, j) in components.list"
              :key="j"
              class="components-item">
              <div class="truncate components-body">
                <svg-icon :icon-class="`icon-${item.__config__.tagIcon}`" /> {{item.__config__.label}}
              </div>
            </div>
          </vue-draggable>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueDraggable from 'vuedraggable'

import { formCompList } from '@config/CompConf'

export default {
  name: 'LeftBoard',
  components: { VueDraggable },
  data () {
    return {}
  },
  computed: {
    componetnsList () {
      return formCompList
    },
    dragOptions () {
      return {
        element: 'div',
        forceFallback: true, // 如果设置为 true , 将不使用原生的html5拖放, 可以修改一些拖放中的样式
        animation: 200, // 动画时间, 单位:ms
        scroll: true, // 当排序容器是个可滚动的区域，拖放可以引起滚动
        sort: false,
        // ghostClass: 'customGhost',
        group: {
          name: 'component',
          put: false,
          pull: 'clone'
        }
      }
    }
  },
  methods: {
    // 拖拽元素 克隆回调
    onDragClone (evt) {
      // this.$store.dispatch('ActiveCompReset')
      this.$store.dispatch('DragElChange', evt)
    },
    // 拖拽元素 移动回调
    onDragMove (evt) {
      // console.log('drag move', evt)
    },

    // 拖拽结束事件
    onDragEnd (evt) {
      // console.log('drag end', evt)
      this.$store.dispatch('DragElReset')
    },

    onActiveCompReset () {
      this.$store.dispatch('ActiveCompReset')
    }
  }
}
</script>
<style lang="scss" scoped>
.left-board {
  width: 280px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px;
}
.components-panel{
  padding-bottom: 20px;
}
.components-item {
  width: 50%;
}
.components-label {
  font-size: 14px;
  margin: 6px 2px;
}
.components-body {
  margin: 2%;
  padding: 8px 10px;
  font-size: 12px;
  cursor: move;
  vertical-align: middle;
  background-color: $--color-primary--bg;
  border-radius: 3px;
  border: 1px solid $--color-primary--bg;
  &:hover {
    color: $--color-primary--active;
    border: 1px dashed $--color-primary;
  }
  .svg-icon {
    font-size: 14px;
  }
}

// drag ghost class
.customGhost {
  width: auto;
  text-align: center;
  .components-body {
    margin: 0;
  }
}
</style>
