<template>
  <div class="flex-grow-0 flex-shrink-0 select-none right-board">
    <!-- tabs -->
    <el-tabs v-model="currentTab" class="custom-tabs" primary stretch>
      <el-tab-pane label="组件属性" name="field"></el-tab-pane>
      <el-tab-pane label="表单属性" name="form"></el-tab-pane>
    </el-tabs>

    <!-- content -->
    <div class="right-content">
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
              <el-form-item
                v-if="activeEl.__config__.border !== undefined && activeEl.__config__.optionType === 'default'"
                label="是否带边框"
              >
                <el-switch v-model="activeEl.__config__.border" />
              </el-form-item>
              <el-form-item v-if="activeEl.__config__.tag === 'el-color-picker'" label="颜色格式">
                <el-select
                  v-model="activeEl['color-format']"
                  placeholder="请选择颜色格式"
                  :style="{ width: '100%' }"
                  clearable
                  @change="colorFormatChange"
                >
                  <el-option
                    v-for="(item, index) in colorFormatOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                v-if="activeEl.size !== undefined &&
                  (activeEl.__config__.optionType === 'button' ||
                    activeEl.__config__.border ||
                    activeEl.__config__.tag === 'el-color-picker' ||
                    activeEl.__config__.tag === 'el-button')"
                label="组件尺寸"
              >
                <el-radio-group v-model="activeEl.size">
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

              <!-- style 属性-->
              <el-form-item v-if="activeEl.style&&activeEl.style.width!==undefined" label="组件宽度">
                <el-input v-model="activeEl.style.width" clearable placeholder="请输入组件宽度" />
              </el-form-item>

              <!-- v-model 属性 -->
              <el-form-item v-if="activeEl.__vModel__!==undefined" label="默认值">
                <el-input
                  :value="setDefaultValue(activeEl.__config__.defaultValue)"
                  placeholder="请输入默认值"
                  @input="onDefaultValueInput"
                />
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
                  <el-button slot="append" icon="el-icon-thumb" @click="openIconsDialog('suffix-icon')">选择</el-button>
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

              <el-form-item v-if="activeEl['active-color'] !== undefined" label="开启颜色">
                <el-color-picker v-model="activeEl['active-color']" />
              </el-form-item>
              <el-form-item v-if="activeEl['inactive-color'] !== undefined" label="关闭颜色">
                <el-color-picker v-model="activeEl['inactive-color']" />
              </el-form-item>

              <el-form-item v-if="activeEl['active-text'] !== undefined" label="开启提示">
                <el-input v-model="activeEl['active-text']" placeholder="请输入开启提示" />
              </el-form-item>
              <el-form-item v-if="activeEl['inactive-text'] !== undefined" label="关闭提示">
                <el-input v-model="activeEl['inactive-text']" placeholder="请输入关闭提示" />
              </el-form-item>
              <el-form-item v-if="activeEl['active-value'] !== undefined" label="开启值">
                <el-input
                  :value="setDefaultValue(activeEl['active-value'])"
                  placeholder="请输入开启值"
                  @input="onSwitchValueInput($event, 'active-value')"
                />
              </el-form-item>
              <el-form-item v-if="activeEl['inactive-value'] !== undefined" label="关闭值">
                <el-input
                  :value="setDefaultValue(activeEl['inactive-value'])"
                  placeholder="请输入关闭值"
                  @input="onSwitchValueInput($event, 'inactive-value')"
                />
              </el-form-item>

              <el-form-item v-if="activeEl.__config__.showLabel !== undefined
                && activeEl.__config__.labelWidth !== undefined" label="显示标签"
              >
                <el-switch v-model="activeEl.__config__.showLabel" />
              </el-form-item>
              <el-form-item v-if="activeEl.branding !== undefined" label="品牌烙印">
                <el-switch v-model="activeEl.branding" />
              </el-form-item>
              <el-form-item v-if="activeEl['allow-half'] !== undefined" label="允许半选">
                <el-switch v-model="activeEl['allow-half']" />
              </el-form-item>
              <el-form-item v-if="activeEl['show-text'] !== undefined" label="辅助文字">
                <el-switch v-model="activeEl['show-text']" @change="() => {if (val) this.activeEl['show-score'] = false}" />
              </el-form-item>
              <el-form-item v-if="activeEl['show-score'] !== undefined" label="显示分数">
                <el-switch v-model="activeEl['show-score']" @change="() => {if (val) this.activeEl['show-text'] = false}" />
              </el-form-item>

               <el-form-item v-if="activeEl['show-stops'] !== undefined" label="显示间断点">
                <el-switch v-model="activeEl['show-stops']" />
              </el-form-item>
              <el-form-item v-if="activeEl.range !== undefined" label="范围选择">
                <el-switch v-model="activeEl.range" @change="(val) => {
                  this.$set(
                    this.activeEl.__config__,
                    'defaultValue',
                    val ? [this.activeEl.min, this.activeEl.max] : this.activeEl.min
                  )}" />
              </el-form-item>

               <el-form-item
                v-if="activeEl.type !== undefined && 'el-date-picker' === activeEl.__config__.tag"
                label="时间类型"
              >
                <el-select
                  v-model="activeEl.type"
                  placeholder="请选择时间类型"
                  :style="{ width: '100%' }"
                  @change="dateTypeChange"
                >
                  <el-option
                    v-for="(item, index) in dateOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>

              <el-form-item v-if="activeEl['range-separator'] !== undefined" label="分隔符">
                <el-input v-model="activeEl['range-separator']" placeholder="请输入分隔符" />
              </el-form-item>
              <el-form-item v-if="activeEl['picker-options'] !== undefined" label="时间段">
                <el-input
                  v-model="activeEl['picker-options'].selectableRange"
                  placeholder="请输入时间段"
                />
              </el-form-item>
              <el-form-item v-if="activeEl.format !== undefined" label="时间格式">
                <el-input
                  :value="activeEl.format"
                  placeholder="请输入时间格式"
                  @input="setTimeValue($event)"
                />
              </el-form-item>

              <el-form-item
                v-if="activeEl['icon']!==undefined && activeEl.__config__.tag === 'el-button'"
                label="按钮图标"
              >
                <el-input v-model="activeEl['icon']" placeholder="请输入按钮图标名称">
                  <el-button slot="append" icon="el-icon-thumb" @click="openIconsDialog('icon')">
                    选择
                  </el-button>
                </el-input>
              </el-form-item>
              <el-form-item
                v-if="activeEl.type !== undefined && activeEl.__config__.tag === 'el-button'"
                label="按钮类型"
              >
                <el-select v-model="activeEl.type" :style="{ width: '100%' }">
                  <el-option label="primary" value="primary" />
                  <el-option label="success" value="success" />
                  <el-option label="warning" value="warning" />
                  <el-option label="danger" value="danger" />
                  <el-option label="info" value="info" />
                  <el-option label="text" value="text" />
                </el-select>
              </el-form-item>
              <el-form-item
                v-if="activeEl.__config__.buttonText !== undefined"
                v-show="'picture-card' !== activeEl['list-type']"
                label="按钮文字"
              >
                <el-input v-model="activeEl.__config__.buttonText" placeholder="请输入按钮文字" />
              </el-form-item>
              <el-form-item
                v-if="activeEl.__config__.tag === 'el-button'"
                label="按钮文字"
              >
                <el-input v-model="activeEl.__slot__.default" placeholder="请输入按钮文字" />
              </el-form-item>

              <el-form-item v-if="activeEl.__config__.showLabel !== undefined
                && activeEl.__config__.labelWidth !== undefined" label="显示标签"
              >
                <el-switch v-model="activeEl.__config__.showLabel" />
              </el-form-item>
              <el-form-item v-if="activeEl.__config__.required !== undefined" label="是否必填">
                <el-switch v-model="activeEl.__config__.required" />
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

              <!-- 选项 选项组 -->
              <template v-if="['el-checkbox-group', 'el-radio-group', 'el-select'].indexOf(activeEl.__config__.tag) > -1">
                <el-divider>选项</el-divider>
                <vue-draggable
                  :list="activeEl.__slot__.options"
                  :animation="340"
                  class="draggable-wrap"
                  group="selectItem"
                  handle=".option-drag"
                >
                  <div v-for="(item, index) in activeEl.__slot__.options" :key="index" class="select-item">
                    <div class="select-line-icon option-drag">
                      <i class="el-icon-s-operation" />
                    </div>
                    <el-input v-model="item.label" placeholder="选项名" size="small" />
                    <el-input
                      placeholder="选项值"
                      size="small"
                      :value="item.value"
                      @input="setOptionValue(item, $event)"
                    />
                    <div class="close-btn select-line-icon" @click="activeEl.__slot__.options.splice(index, 1)">
                      <i class="el-icon-remove-outline" />
                    </div>
                  </div>
                </vue-draggable>
                <div style="margin-left: 20px;">
                  <el-button
                    style="padding-bottom: 0"
                    icon="el-icon-circle-plus-outline"
                    type="text"
                    @click="activeEl.__slot__.options.push({
                      label: '',
                      value: ''
                    })"
                  >
                    添加选项
                  </el-button>
                </div>
                <el-divider />
              </template>

              <!-- 选项 级联选择 表格 -->
              <template v-if="['el-cascader', 'el-table'].includes(activeEl.__config__.tag)">
                <el-divider>选项</el-divider>
                <el-form-item v-if="activeEl.__config__.dataType" label="数据类型">
                  <el-radio-group v-model="activeEl.__config__.dataType" size="small">
                    <el-radio-button label="dynamic">
                      动态数据
                    </el-radio-button>
                    <el-radio-button label="static">
                      静态数据
                    </el-radio-button>
                  </el-radio-group>
                </el-form-item>

                <template v-if="activeEl.__config__.dataType === 'dynamic'">
                  <el-form-item label="接口地址">
                    <el-input
                      v-model="activeEl.__config__.url"
                      :title="activeEl.__config__.url"
                      placeholder="请输入接口地址"
                      clearable
                    >
                      <el-select
                        slot="prepend"
                        v-model="activeEl.__config__.method"
                        :style="{width: '85px'}"
                      >
                        <el-option label="get" value="get" />
                        <el-option label="post" value="post" />
                        <el-option label="put" value="put" />
                        <el-option label="delete" value="delete" />
                      </el-select>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="数据位置">
                    <el-input
                      v-model="activeEl.__config__.dataPath"
                      placeholder="请输入数据位置"
                    />
                  </el-form-item>

                  <template v-if="activeEl.props && activeEl.props.props">
                    <el-form-item label="标签键名">
                      <el-input v-model="activeEl.props.props.label" placeholder="请输入标签键名" />
                    </el-form-item>
                    <el-form-item label="值键名">
                      <el-input v-model="activeEl.props.props.value" placeholder="请输入值键名" />
                    </el-form-item>
                    <el-form-item label="子级键名">
                      <el-input v-model="activeEl.props.props.children" placeholder="请输入子级键名" />
                    </el-form-item>
                  </template>
                </template>

                <!-- 级联选择静态树 -->
                <el-tree
                  v-if="activeEl.__config__.dataType === 'static'"
                  draggable
                  :data="activeEl.options"
                  node-key="id"
                  :expand-on-click-node="false"
                  :render-content="renderContent"
                />
                <div v-if="activeEl.__config__.dataType === 'static'" style="margin-left: 20px">
                  <el-button
                    style="padding-bottom: 0"
                    icon="el-icon-circle-plus-outline"
                    type="text"
                    @click="addTreeItem"
                  >
                    添加父级
                  </el-button>
                </div>
                <el-divider />
              </template>

              <!-- 规则 -->
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
                  <el-button icon="el-icon-circle-plus-outline" type="text" @click="addReg">
                    添加规则
                  </el-button>
                </div>
              </template>
            </el-form>

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

    <!-- iconDialog -->
    <IconsDialog :visible.sync="iconListVisible" :current="currentIconModel && activeEl ? activeEl[currentIconModel] : null" @select="(val) => activeEl[currentIconModel] = val"></IconsDialog>

    <tree-node-dialog :visible.sync="dialogVisible" title="添加选项" @commit="addNode" />

  </div>
</template>
<script>
import VueDraggable from 'vuedraggable'
import IconsDialog from '@c/IconsDialog'
import TreeNodeDialog from '@c/TreeNodeDialog'
import { isArray, isNumberStr } from '@u/index.js'
import { mapGetters } from 'vuex'
// import _ from 'lodash'

const dateTimeFormat = {
  date: 'yyyy-MM-dd',
  week: 'yyyy 第 WW 周',
  month: 'yyyy-MM',
  year: 'yyyy',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  daterange: 'yyyy-MM-dd',
  monthrange: 'yyyy-MM',
  datetimerange: 'yyyy-MM-dd HH:mm:ss'
}

export default {
  name: 'RightBoard',
  components: { VueDraggable, IconsDialog, TreeNodeDialog },
  data () {
    return {
      currentTab: 'field',
      iconListVisible: false,
      currentIconModel: null, // 当前元素 需要设置icon的对应属性名

      dialogVisible: false,
      currentNode: [],

      dateTypeOptions: [
        {
          label: '日(date)',
          value: 'date'
        },
        {
          label: '周(week)',
          value: 'week'
        },
        {
          label: '月(month)',
          value: 'month'
        },
        {
          label: '年(year)',
          value: 'year'
        },
        {
          label: '日期时间(datetime)',
          value: 'datetime'
        }
      ],
      dateRangeTypeOptions: [
        {
          label: '日期范围(daterange)',
          value: 'daterange'
        },
        {
          label: '月范围(monthrange)',
          value: 'monthrange'
        },
        {
          label: '日期时间范围(datetimerange)',
          value: 'datetimerange'
        }
      ],
      colorFormatOptions: [
        {
          label: 'hex',
          value: 'hex'
        },
        {
          label: 'rgb',
          value: 'rgb'
        },
        {
          label: 'rgba',
          value: 'rgba'
        },
        {
          label: 'hsv',
          value: 'hsv'
        },
        {
          label: 'hsl',
          value: 'hsl'
        }
      ],
      justifyOptions: [
        {
          label: 'start',
          value: 'start'
        },
        {
          label: 'end',
          value: 'end'
        },
        {
          label: 'center',
          value: 'center'
        },
        {
          label: 'space-around',
          value: 'space-around'
        },
        {
          label: 'space-between',
          value: 'space-between'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['activeEl', 'activeIndex', 'formConf']),
    documentLink () {
      return this.activeEl.__config__.document || ''
    },
    dateOptions () {
      if (
        this.activeEl.type !== undefined && this.activeEl.__config__.tag === 'el-date-picker'
      ) {
        if (this.activeEl['start-placeholder'] === undefined) {
          return this.dateTypeOptions
        }
        return this.dateRangeTypeOptions
      }
      return []
    }
  },
  methods: {
    setDefaultValue (val) {
      if (Array.isArray(val)) {
        return val.join(',')
      }
      // if (['string', 'number'].indexOf(typeof val) > -1) {
      //   return val
      // }
      if (typeof val === 'boolean') {
        return `${val}`
      }
      return val
    },

    onDefaultValueInput (str) {
      if (isArray(this.activeEl.__config__.defaultValue)) {
        // 数组
        this.$set(
          this.activeEl.__config__,
          'defaultValue',
          str.split(',').map(val => (isNumberStr(val) ? +val : val))
        )
      } else if (['true', 'false'].indexOf(str) > -1) {
        // 布尔
        this.$set(this.activeEl.__config__, 'defaultValue', JSON.parse(str))
      } else {
        // 字符串和数字
        this.$set(
          this.activeEl.__config__,
          'defaultValue',
          isNumberStr(str) ? +str : str
        )
      }
    },

    setOptionValue (item, val) {
      item.value = isNumberStr(val) ? +val : val
    },

    // 打开选择图标事件
    openIconsDialog (model) {
      console.log('model', model)
      this.iconListVisible = true
      this.currentIconModel = model
    },

    // 添加规则
    addReg () {
      this.activeEl.__config__.regList.push({ pattern: '', message: '' })
      console.log('reglist', this.activeEl.__config__.regList)
    },

    append (data) {
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      this.dialogVisible = true
      this.currentNode = data.children
    },
    remove (node, data) {
      this.activeEl.__config__.defaultValue = [] // 避免删除时报错
      const { parent } = node
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },

    addNode (data) {
      this.currentNode.push(data)
    },

    addTreeItem () {
      this.dialogVisible = true
      this.currentNode = this.activeEl.options
    },

    renderContent (h, { node, data, store }) {
      return (
        <div class="custom-tree-node">
          <span>{node.label}</span>
          <span class="node-operation">
            <i on-click={() => this.append(data)}
              class="el-icon-plus"
              title="添加"
            ></i>
            <i on-click={() => this.remove(node, data)}
              class="el-icon-delete"
              title="删除"
            ></i>
          </span>
        </div>
      )
    },

    colorFormatChange (val) {
      this.activeEl.__config__.defaultValue = null
      this.activeEl['show-alpha'] = val.indexOf('a') > -1
      this.activeEl.__config__.renderKey = +new Date() // 更新renderKey,重新渲染该组件
    },

    dateTypeChange (val) {
      this.setTimeValue(dateTimeFormat[val], val)
    },

    setTimeValue (val, type) {
      const valueFormat = type === 'week' ? dateTimeFormat.date : val
      this.$set(this.activeEl.__config__, 'defaultValue', null)
      this.$set(this.activeEl, 'value-format', valueFormat)
      this.$set(this.activeEl, 'format', val)
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
  background-color: $--color-primary;
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
  color: $--color-primary;
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

.draggable-wrap {padding: 0 12px;}
.select-item {
  display: flex;
  border: 1px dashed #fff;
  box-sizing: border-box;
  & .close-btn {
    cursor: pointer;
    color: #f56c6c;
  }
  & .el-input + .el-input {
    margin-left: 4px;
  }
}
.select-item + .select-item {
  margin-top: 4px;
}
.select-item.sortable-chosen {
  border: 1px dashed #409eff;
}
.select-line-icon {
  line-height: 32px;
  font-size: 22px;
  padding: 0 4px;
  color: #777;
}
.option-drag {
  cursor: move;
}

.reg-item {
  padding: 12px 6px;
  background: #f8f8f8;
  position: relative;
  border-radius: 4px;
  & + .reg-item {
    margin-top: 10px;
  }
  .close-btn {
    position: absolute;
    right: -6px;
    top: -6px;
    display: block;
    width: 16px;
    height: 16px;
    line-height: 16px;
    background: rgba(0,0,0,.2);
    border-radius: 50%;
    color: #fff;
    text-align: center;
    z-index: 1;
    cursor: pointer;
    font-size: 12px;
  }
}
</style>
