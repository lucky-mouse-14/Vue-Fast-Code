<template>
  <div class="icon-dialog">
    <el-dialog
      v-bind="$attrs"
      v-on="$listeners"
      width="80%"
      :modal-append-to-body="false"
      top="100px"
      :destroy-on-close="true"
      @open="onOpen"
      @close="onClose"
    >
      <div slot="title" class="text-center dialaog-title">
        <el-input v-model="serachKey" size="mini" placeholder="请输入图标名称" prefix-icon="el-icon-search" clearable style="width: 50%;" @change="onSearch"></el-input>
      </div>
      <ul class="icons-ul">
        <li v-for="icon in iconsList||iconsArray" :key="icon" :class="active===icon?'active-item':''" @click="onSelect(icon)">
          <i :class="icon"></i>
          <span>{{ icon }}</span>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>
<script>
import iconsJson from '@config/IconsConf/icons.json'

export default {
  name: 'IconsDialog',
  props: {
    current: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      iconsList: null,
      serachKey: null,
      active: null
    }
  },
  computed: {
    iconsArray () {
      return iconsJson.map(name => `el-icon-${name}`)
    }
  },
  methods: {
    onOpen () {
      this.active = this.current
    },

    onClose (icon) {
      this.$emit('update:visible', false)
    },

    onSearch (e) {
      if (e) {
        this.iconsList = this.iconsArray.filter(name => name.indexOf(e) > -1)
      } else {
        this.iconsList = null
      }
    },

    onSelect (icon) {
      this.active = icon
      this.$emit('select', icon)
      this.onClose()
    }
  }
}
</script>
<style lang="scss" scoped>
.icons-ul {
  margin: 0;
  padding: 0;
  font-size: 0;
  li {
    list-style-type: none;
    text-align: center;
    font-size: 14px;
    display: inline-block;
    width: 16.66%;
    box-sizing: border-box;
    height: 108px;
    padding: 15px 6px 6px 6px;
    cursor: pointer;
    overflow: hidden;
    &:hover {
      background: #f2f2f2;
      color: #7a6df0;
    }
    &.active-item{
      background: #e1f3fb;
      color: #7a6df0
    }
    > i {
      font-size: 30px;
      line-height: 50px;
    }
    > span {
      display: block;
    }
  }
}
.icon-dialog {
  ::v-deep .el-dialog {
    border-radius: 8px;
    margin-bottom: 0;
    margin-top: 4vh !important;
    display: flex;
    flex-direction: column;
    max-height: 92vh;
    overflow: hidden;
    box-sizing: border-box;
    .el-dialog__header {
      padding-top: 14px;
    }
    .el-dialog__body {
      margin: 0 20px 20px 20px;
      padding: 0;
      overflow: auto;
    }
  }
}
</style>
