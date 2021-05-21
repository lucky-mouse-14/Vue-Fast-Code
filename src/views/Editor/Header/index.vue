<template>
  <div class="flex flex-nowrap flex-row justinfy-between items-center text-center editor__header">
    <div class="flex-initial flex flex-nowrap flex-row justinfy-between items-center header__left">
      <div class="logo"><svg-icon :icon-class="`logo`" class="logo-icon" /></div>
      <span>FASTCODE</span>
    </div>
    <div class="flex-auto header__center">
      <div class="flex flex-nowrap flex-row justify-center items-center header__btns">
        <div class="header__btn" title="运行"><svg-icon :icon-class="`btn-dev`" /></div>
        <div class="header__btn" title="查看JSON"><svg-icon :icon-class="`btn-json`" /></div>
        <div class="header__btn" title="导出Vue文件"><svg-icon :icon-class="`btn-output`" /></div>
        <div class="header__btn" title="复制代码"><svg-icon :icon-class="`btn-code`" /></div>
        <div class="header__btn" title="清空" @click="onClear"><svg-icon :icon-class="`btn-clear`" /></div>
        <div class="header__btn" title="更多"><svg-icon :icon-class="`btn-more`" />
          <div class="header__subbtns">
            <div class="flex flex-nowrap flex-row justify-between items-center text-left header__subbtn">
              <span>显示边框</span>
              <el-switch :value="compBorder" inactive-color="rgba(255,255,255,.2)" @change="onChangeCompBorder" />
            </div>
            <div class="flex flex-nowrap flex-row justify-between items-center text-left header__subbtn">
              <span>锁住画板</span>
              <el-switch :value="locked" inactive-color="rgba(255,255,255,.2)" @change="onChangeLocked" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-initial header__right">
      <div class="flex flex-nowrap flex-row justify-end items-center header__btns">
        <div class="header__btn" title="退出" @click="onOut"><svg-icon :icon-class="`btn-out`" /></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['compBorder', 'locked'])
  },
  methods: {
    // 清空
    onClear () {
      this.$store.dispatch('DrawViewsClear')
    },

    // 退出
    onOut () {
      this.$router.push({ name: 'Home' })
    },

    // onChangeCompBorder
    onChangeCompBorder (e) {
      this.$store.dispatch('CompBorderChange', e)
    },

    // onChangeLocked
    onChangeLocked (e) {
      this.$store.dispatch('LockedChange', e)
    }
  }
}
</script>
<style lang="scss" scoped>
.editor__header {
  height: 40px;
  color: #efefef;
  background-color: #1d1e1f;
}
.header__left {
  width: 280px;
  padding: 0 20px;
  .logo {
    height: 30px;width: 30px;
    line-height: 30px;
    border-radius: 50%;
    color: #fff;
    background-color: $colorActive;
    font-size: 18px;
  }
  span {
    margin-left: 10px;
    font-size: 20px;
    font-weight:600;
  }
}
.header__right {
  width: 365px;
  padding: 0 20px;
  box-sizing: border-box;
}
.header__center {
  padding:0 20px;
  box-sizing: border-box;
}

.header__btn {
  font-size: 22px;
  width: 50px; height: 40px;
  line-height: 40px;
  cursor: pointer;
  position: relative;
  @include transform(all, .3s);
  &:hover {
    background-color: $colorActive;
    .header__subbtns {
      display: block;
    }
  }
}
// header__subbtns
.header__subbtns {
  display: none;
  position: absolute;
  overflow: hidden;
  left:0;
  top: 100%;
  margin-left: -50px;
  font-size: 12px;
  z-index: 2;
  width: 150px;
  padding-top: 4px;
  .header__subbtn {
    height: 30px;
    color: #efefef;
    background-color: #1d1e1f;
    padding: 2px 10px;
    border-radius: 4px;
    & + .header__subbtn {
      margin-top: 2px;
    }
    &:hover {
      background-color: #4d4e4f;
    }
  }
  &::before {
    content: "";
    border-top: 4px transparent dashed;
    border-left: 4px transparent dashed;
    border-right: 4px transparent dashed;
    border-bottom: 4px #1d1e1f solid;
    position: absolute;
    top: -4px;
    left: 50%;
    margin-left: -4px;
  }
}
</style>
