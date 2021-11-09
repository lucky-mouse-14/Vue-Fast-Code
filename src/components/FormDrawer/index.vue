<template>
  <div>
    <el-drawer size="100%" :withHeader="false" v-bind="$attrs" v-on="$listeners" :destroy-on-close="false" :show-close="false" @opened="onOpen" @closed="onClosed">
      <el-row style="height: 100%;">
        <el-col :md="24" :lg="12" class="left-editor" v-loading="!codeLoaded" element-loading-text="代码加载中" element-loading-background="rgba(0, 0, 0, 0.8)">
          <div class="left-editor__header">
            <!-- 标签 -->
            <div class="flex flex-wrap flex-auto justify-start flex-grow-0 flex-shrink-0 select-none editor-tabs">
              <div :class="['editor-tab', activeTab==='html' ? 'active' : '']" @click="onChangeTab('html')">
                <span>
                  <i :class="[activeTab==='html' ? 'el-icon-edit-outline' : 'el-icon-document']" />
                  template
                </span>
              </div>
              <div :class="['editor-tab', activeTab==='js' ? 'active' : '']" @click="onChangeTab('js')">
                <span>
                  <i :class="[activeTab==='js' ? 'el-icon-edit-outline' : 'el-icon-document']" />
                  script
                </span>
              </div>
              <div :class="['editor-tab', activeTab==='css' ? 'active' : '']" @click="onChangeTab('css')">
                <span>
                  <i :class="[activeTab==='css' ? 'el-icon-edit-outline' : 'el-icon-document']" />
                  css
                </span>
              </div>
            </div>
            <!-- 设置 -->
            <div class="flex flex-wrap flex-auto justify-end flex-grow-0 flex-shrink-0 select-none left-editor__btns">
              <span class="left-editor__btn resource" title="资源引用" @click="resourceVisible = true">
                <el-badge :is-dot="resource.length>0">
                  <i class="el-icon-document" />
                </el-badge>
              </span>
            </div>
          </div>
          <div v-show="activeTab==='html'" id="editorHtml" class="tab-editor" />
          <div v-show="activeTab==='js'" id="editorJs" class="tab-editor" />
          <div v-show="activeTab==='css'" id="editorCss" class="tab-editor" />
        </el-col>
        <el-col :md="24" :lg="12" class="right-preview">
          <div class="flex flex-nowrap justify-start items-center text-center action-bar">
            <span class="bar-btn delete-btn" @click="runCode">
              <i class="el-icon-refresh-right" />
              更新代码
            </span>
            <span class="bar-btn output-btn" @click="outputVue">
              <i class="el-icon-download" />
              导出Vue文件
            </span>
            <span class="bar-btn copy-btn" @click="onCopy">
              <i class="el-icon-document-copy" />
              复制代码
            </span>
            <span class="bar-btn close-btn" @click="$store.dispatch('RunChange', false)">
              <i class="el-icon-circle-close" />
              关闭
            </span>
          </div>
          <iframe v-show="iframeLoaded" ref="previewPage" class="preview-wrap" :src="iframeSrc" frameborder="0" @load="onPreviewLoad"></iframe>
          <div v-show="!iframeLoaded" v-loading="true" class="preview-wrap" element-loading-text="预览加载中" />
        </el-col>
      </el-row>
    </el-drawer>
    <ResourceDialog :visible.sync="resourceVisible" :origin-resource="resource" @save="setResource"></ResourceDialog>
  </div>
</template>
<script>
import ResourceDialog from '@c/ResourceDialog'
import { mapGetters } from 'vuex'
import _ from 'lodash'
import * as MonacoEditor from 'monaco-editor'
import { outputFile, codeCopy } from '@u/actionBar'
import { makeUpHtml, vueTemplate, vueScript, vueStyle } from '@u/generator/html'
import { makeUpJs } from '@u/generator/js'
import { makeUpCss } from '@u/generator/css'
import befautify from '@u/generator/js-befautify'
// eslint-disable-next-line camelcase
// import { js_beautify, css_beautify, html_beautify } from 'js-beautify'

const editorObj = {
  html: null,
  js: null,
  css: null
}
const language = {
  html: 'html',
  js: 'javascript',
  css: 'css'
}

export default {
  name: 'FormDrawer',
  components: { ResourceDialog },
  data () {
    return {
      activeTab: 'html',

      scripts: [],
      links: [],

      resourceVisible: false,

      monaco: null,
      iframeSrc: null,
      codeLoaded: false,
      iframeLoaded: false
    }
  },
  computed: {
    ...mapGetters(['drawViews', 'formConf']),
    resource () {
      return this.links.concat(this.scripts)
    }
  },
  created () {
  },
  beforeDestroy () {
    for (const type in editorObj) {
      editorObj[type].dispose()
    }
  },
  methods: {

    setEditorValue (id, type, codeStr) {
      if (editorObj[type]) {
        editorObj[type].setValue(codeStr)
      } else {
        editorObj[type] = MonacoEditor.editor.create(document.getElementById(id), {
          value: codeStr,
          theme: 'vs-dark',
          language: language[type],
          automaticLayout: true
        })
      }
    },

    generateCode () {
      const html = befautify(vueTemplate(editorObj.html.getValue()), 'html')
      const script = befautify(vueScript(editorObj.js.getValue()), 'js')
      const style = befautify(vueStyle(editorObj.css.getValue()), 'css')
      return befautify(html + script + style, 'html')
    },

    onOpen () {
      const formData = {
        fields: _.cloneDeep(this.drawViews),
        ...this.formConf
      }
      const type = 'file'
      const _htmlCode = makeUpHtml(formData, type)
      const _jsCode = makeUpJs(formData, type)
      const _cssCode = makeUpCss(formData)

      const htmlCode = befautify(_htmlCode, 'html')
      const jsCode = befautify(_jsCode, 'js')
      const cssCode = befautify(_cssCode, 'css')

      this.setEditorValue('editorHtml', 'html', htmlCode)
      this.setEditorValue('editorJs', 'js', jsCode)
      this.setEditorValue('editorCss', 'css', cssCode)

      this.codeLoaded = true
      this.iframeSrc = 'preview.html'
    },

    onClosed () {
      this.iframeSrc = null
      this.codeLoaded = false
      this.iframeLoaded = false
    },

    onChangeTab (current) {
      this.activeTab = current
    },

    onPreviewLoad () {
      if (this.codeLoaded) this.runCode()
    },

    runCode () {
      const postData = {
        type: 'refreshFrame',
        data: {
          html: editorObj.html.getValue(),
          css: editorObj.css.getValue(),
          js: editorObj.js.getValue().replace('export default', ''),
          scripts: this.scripts,
          links: this.links
        }
      }
      this.$refs.previewPage.contentWindow.postMessage(
        postData
      )
      this.iframeLoaded = true
    },

    setResource (list) {
      console.log('list', list)
      const scripts = []
      const links = []
      list.forEach(item => {
        if (item.indexOf('.css') !== -1) links.push(item)
        else if (item.indexOf('.js') !== -1) scripts.push(item)
      })
      this.scripts = scripts
      this.links = links
    },

    outputVue () {
      outputFile('导出Vue文件', 'vue', this.generateCode())
    },

    onCopy () {
      codeCopy('.copy-btn', this.generateCode())
    }
  }
}
</script>

<style lang="scss" scoped>
.left-editor__header {
  position: relative;
}
.left-editor__btns {
  position: absolute;
  top:0; right:0;
  bottom: 0;
}
.left-editor__btn {
  padding: 5px 10px;
  font-size: 17px;
  cursor: pointer;
  &.resource {
    color: #a9f122;
  }
}

.left-editor {
  position: relative;
  height: 100%;
  background: #1e1e1e;
  overflow: hidden;
}
.editor-tabs {
  font-size: 15px;
  font-weight: 600;
}
.editor-tab {
  cursor: pointer;
  height: 33px;line-height: 33px;
  padding: 0 26px;
  color: #888a8e;
    background-color: #363636;
  & + .editor-tab {
    margin-left: 10px;
  }
  &.active {
    color: #fff;
    background-color: transparent;
  }
  .el-icon-edit-outline {color: #f1fa8c;}
  .el-icon-document {color: #a95812;}
}
.tab-editor {
  position: absolute;
  top:33px;
  left: 0; right: 0; bottom: 0;
  font-size: 14px;
}
.setting{
  position: absolute;
  right: 15px;
  top: 3px;
  color: #a9f122;
  font-size: 18px;
  cursor: pointer;
  z-index: 1;
}

.right-preview {
  height: 100%;
  .preview-wrap {
    height: calc(100vh - 33px);
    width: 100%;
    overflow: auto;
    box-sizing: border-box;
    padding: 12px;
  }
}
@include action-bar;
</style>
