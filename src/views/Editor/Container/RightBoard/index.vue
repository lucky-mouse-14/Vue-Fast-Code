<template>
  <div class="flex-grow-0 flex-shrink-0 select-none right-board">
    <el-tabs v-model="currentTab" class="custom-tabs" primary stretch>
      <el-tab-pane label="组件属性" name="field"></el-tab-pane>
      <el-tab-pane label="表单属性" name="form"></el-tab-pane>
    </el-tabs>
    <div class="scrollBar right-content">
      <div class="relative right-content__body">
        <!-- 组件属性 -->
        <template v-if="currentTab === 'field'">
          <template v-if="activeEl">
            <!-- 文档链接按钮 -->
            <a class="text-center absolute document-link" target="_blank" :href="documentLink" title="查看组件文档"><i class="el-icon-link" /></a>
            <el-form label-width="100px" size="mini">
              <el-form-item v-if="activeEl.__config__.componentName!==undefined" label="组件名" label-position="right">
                {{ activeEl.__config__.componentName }}
              </el-form-item>
              <el-form-item v-if="activeEl.__vModel__!==undefined" label="字段名">
                <el-input v-model="activeEl.__vModel__" clearable placeholder="请输入字段名" />
              </el-form-item>

              <!-- config 属性 -->
              <el-form-item v-if="activeEl.__config__.label!==undefined" label="标题">
                <el-input v-model="activeEl.__config__.label" clearable placeholder="请输入标题" />
              </el-form-item>
              <el-form-item v-if="activeEl.placeholder!==undefined" label="占位提示">
                <el-input v-model="activeEl.placeholder" clearable placeholder="请输入占位提示" />
              </el-form-item>
              <el-form-item v-if="activeEl.__config__.span!==undefined" label="组件栅格">
                <el-slider v-model="activeEl.__config__.span" :step="1" :min="0" :max="24" :marks="{12: ''}"></el-slider>
              </el-form-item>
              <el-form-item v-if="activeEl.__config__.labelWidth!==undefined" label="标签宽度">
                <el-input v-model.number="activeEl.__config__.labelWidth" placeholder="请输入标签宽度" type="number" />
              </el-form-item>
              <el-form-item v-if="activeEl.__config__.showLabel !== undefined
                && activeEl.__config__.labelWidth !== undefined" label="显示标签"
              >
                <el-switch v-model="activeEl.__config__.showLabel" />
              </el-form-item>
              <el-form-item v-if="activeEl.__config__.required !== undefined" label="是否必填">
                <el-switch v-model="activeEl.__config__.required" />
              </el-form-item>

              <!-- style 属性-->
              <el-form-item v-if="activeEl.style&&activeEl.style.width!==undefined" label="组件宽度">
                <el-input v-model="activeEl.style.width" clearable placeholder="请输入组件宽度" />
              </el-form-item>

              <!-- slot 属性 -->
              <el-form-item v-if="activeEl.__slot__&&activeEl.__slot__.prepend!==undefined" label="前缀">
                <el-input v-model="activeEl.__slot__.prepend" clearable placeholder="请输入前缀" />
              </el-form-item>
              <el-form-item v-if="activeEl.__slot__&&activeEl.__slot__.append!==undefined" label="后缀">
                <el-input v-model="activeEl.__slot__.append" clearable placeholder="请输入后缀" />
              </el-form-item>

              <!-- 自定义 属性 -->
              <el-form-item v-if="activeEl.autosize !== undefined" label="最小行数">
                <el-input-number v-model="activeEl.autosize.minRows" :min="1" placeholder="最小行数" />
              </el-form-item>
              <el-form-item v-if="activeEl.autosize !== undefined" label="最大行数">
                <el-input-number v-model="activeEl.autosize.maxRows" :min="1" placeholder="最大行数" />
              </el-form-item>
              <el-form-item v-if="activeEl.min!== undefined" label="最小值">
                <el-input-number v-model="activeEl.min" placeholder="最小值" />
              </el-form-item>
              <el-form-item v-if="activeEl.max!== undefined" label="最大值">
                <el-input-number v-model="activeEl.max" placeholder="最大值" />
              </el-form-item>
              <el-form-item v-if="activeEl.step!== undefined" label="步长">
                <el-input-number v-model="activeEl.step" placeholder="步数" />
              </el-form-item>
              <el-form-item v-if="activeEl.precision!== undefined" label="精度">
                <el-input-number v-model="activeEl.precision" :min="0" placeholder="精度" />
              </el-form-item>
              <el-form-item v-if="activeEl['controls-position']!== undefined" label="按钮位置">
                <el-radio-group v-model="activeEl['controls-position']">
                  <el-radio-button label="">
                    默认
                  </el-radio-button>
                  <el-radio-button label="right">
                    右侧
                  </el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-if="activeEl['step-strictly']!== undefined" label="严格步数">
                <el-switch v-model="activeEl['step-strictly']" />
              </el-form-item>
              <el-form-item v-if="activeEl['prefix-icon']!==undefined" label="前图标">
                <el-input v-model="activeEl['prefix-icon']" placeholder="请输入前图标名称" clearable>
                  <el-button slot="append" icon="el-icon-thumb" @click="openIconsDialog('prefix-icon')">选择</el-button>
                </el-input>
              </el-form-item>
              <el-form-item v-if="activeEl['suffix-icon']!==undefined" label="后图标">
                <el-input v-model="activeEl['suffix-icon']" placeholder="请输入前图标名称" clearable>
                  <el-button slot="append" icon="el-icon-thumb" @click="openIconsDialog('prefix-icon')">选择</el-button>
                </el-input>
              </el-form-item>
              <el-form-item v-if="activeEl.maxlength !== undefined" label="最多输入">
                <el-input v-model.number="activeEl.maxlength" placeholder="请输入字符长度">
                  <template slot="append">
                    个字符
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item v-if="activeEl['show-word-limit'] !== undefined" label="输入统计">
                <el-switch v-model="activeEl['show-word-limit']" />
              </el-form-item>
              <el-form-item v-if="activeEl.clearable !== undefined" label="能否清空">
                <el-switch v-model="activeEl.clearable" />
              </el-form-item>
              <el-form-item v-if="activeEl.readonly !== undefined" label="是否只读">
                <el-switch v-model="activeEl.readonly" />
              </el-form-item>
              <el-form-item v-if="activeEl.disabled !== undefined" label="是否禁用">
                <el-switch v-model="activeEl.disabled" />
              </el-form-item>

            </el-form>
            <template v-if="Array.isArray(activeEl.__config__.regList)">
              <el-divider>正则校验</el-divider>
              <div
                v-for="(item, index) in activeEl.__config__.regList"
                :key="index"
                class="reg-item"
              >
                <span class="close-btn" @click="activeEl.__config__.regList.splice(index, 1)">
                  <i class="el-icon-close" />
                </span>
                <el-form-item label="表达式">
                  <el-input v-model="item.pattern" placeholder="请输入正则" />
                </el-form-item>
                <el-form-item label="错误提示" style="margin-bottom:0">
                  <el-input v-model="item.message" placeholder="请输入错误提示" />
                </el-form-item>
              </div>
              <div style="margin-left: 20px">
                <el-button icon="el-icon-circle-plus-outline" type="text" @click="activeEl.__config__.regList.push({pattern: '',message: ''})">
                  添加规则
                </el-button>
              </div>
            </template>
          </template>
          <div v-else class="text-center empty-info"><i class="el-icon-warning-outline" /> 请先选择要编辑的组件</div>
        </template>
        <!-- 表单属性 -->
        <template v-if="currentTab === 'form'">
          <!-- 文档链接按钮 -->
            <a class="text-center absolute document-link" target="_blank" href="https://element.eleme.cn/#/zh-CN/component/form" title="查看表单文档"><i class="el-icon-link" /></a>
          <el-form label-width="100px" size="mini">
            <el-form-item label="表单名">
              <el-input v-model="formConf.formRef"></el-input>
            </el-form-item>
            <el-form-item label="表单模型">
              <el-input v-model="formConf.formRef"></el-input>
            </el-form-item>
            <el-form-item label="校验模型">
              <el-input v-model="formConf.formModel"></el-input>
            </el-form-item>
            <el-form-item label="表单尺寸">
              <el-radio-group v-model="formConf.size">
                <el-radio-button label="medium">
                  中等
                </el-radio-button>
                <el-radio-button label="small">
                  较小
                </el-radio-button>
                <el-radio-button label="mini">
                  迷你
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="标签对齐">
              <el-radio-group v-model="formConf.labelPosition">
                <el-radio-button label="left">
                  左对齐
                </el-radio-button>
                <el-radio-button label="right">
                  右对齐
                </el-radio-button>
                <el-radio-button label="top">
                  顶部对齐
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="标签宽度">
              <el-input-number v-model.number="formConf.labelWidth" controls-position="right" :step="1" :min="0" :max="300" />
            </el-form-item>
            <el-form-item label="栅格间隔">
              <el-input-number v-model.number="formConf.gutter" controls-position="right" :step="1" :min="0" :max="100" />
            </el-form-item>
            <el-form-item label="禁用表单">
              <el-switch v-model="formConf.disabled"></el-switch>
            </el-form-item>
            <el-form-item label="表单按钮">
              <el-switch v-model="formConf.formBtns"></el-switch>
            </el-form-item>
          </el-form>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      currentTab: 'field'
    }
  },
  computed: {
    ...mapGetters(['activeEl', 'activeIndex', 'formConf']),
    documentLink () {
      return this.activeEl.__config__.document || ''
    }
  }
}
</script>
<style lang="scss" scoped>
.right-board {
  width: 365px;
}

.right-content {
  // margin-top: 10px;
  height: calc(100% - 30px);
  overflow-y: auto;
  overflow-x: hidden;
}

.right-content__body {
  min-height: 100%;
}
.document-link {
  background-color: $colorActive;
  display:block;
  border-bottom-right-radius: 5px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  color: white;
  top: 0;
  left: 0;
}

.empty-info {
  color: $colorActive;
  padding-top: 50px;
}

.el-form {
  padding: 12px;
}

.custom-tabs {
  ::v-deep .el-tabs__header {
    margin: 0;
  }
  ::v-deep .el-tabs__item {
    height: 30px;
    line-height: 30px;
  }
  ::v-deep .el-tabs__active-bar {
    height: calc(100% - 2px)!important;
    bottom: auto;
    top:0;
    z-index:0;
    background-color: $bgColor;
  }
}
</style>
