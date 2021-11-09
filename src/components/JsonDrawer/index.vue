<template>
  <div class="json-drawer">
    <el-drawer v-bind="$attrs" v-on="$listeners" :destroy-on-close="false" :show-close="false" @opened="onOpen" @closed="onClosed" size="580px">
      <div class="flex flex-nowrap justify-start items-center text-center action-bar">
        <span class="bar-btn" @click="updateJson">
          <i class="el-icon-refresh-right" />
          更新代码
        </span>
        <span ref="copyBtn" class="bar-btn copy-btn" @click="onCopy">
          <i class="el-icon-document-copy" />
          复制JSON
        </span>
        <span class="bar-btn" @click="outputJson">
          <i class="el-icon-download" />
          导出JSON文件
        </span>
        <span class="bar-btn delete-btn" @click="$store.dispatch('JsonChange', false)">
          <i class="el-icon-circle-close" />
          关闭
        </span>
      </div>
      <div id="editorJson" class="json-editor" />
    </el-drawer>
  </div>
</template>
<script>
import * as MonacoEditor from 'monaco-editor'
import { outputFile, codeCopy } from '@u/actionBar'
import befautify from '@u/generator/js-befautify'
import { mapGetters } from 'vuex'
import _ from 'lodash'

const editorObj = {
  json: ''
}
const language = {
  json: 'json'
}

export default {
  name: 'JsonDrawer',
  data () {
    return {
      codeLoaded: false
    }
  },
  computed: {
    ...mapGetters(['drawViews', 'formConf'])
  },
  methods: {
    onOpen () {
      const formData = {
        fields: _.cloneDeep(this.drawViews),
        ...this.formConf
      }

      const jsCode = befautify(JSON.stringify(formData), 'js')

      this.setEditorValue('editorJson', 'json', jsCode)

      this.codeLoaded = true
    },

    onClosed () {
      this.codeLoaded = false
    },

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
      return editorObj.json.getValue()
    },

    updateJson () {
      try {
        const jsonCode = JSON.parse(this.generateCode())
        const drawViews = [...jsonCode.fields]
        delete jsonCode.fields
        const formConf = jsonCode
        this.$store.dispatch('DrawViewsUpdate', { drawViews, formConf })
      } catch (error) {
        this.$notify({
          title: '错误',
          message: 'JSON格式错误，请检查',
          type: 'error'
        })
      }
    },

    onCopy () {
      codeCopy('.copy-btn', this.generateCode())
    },

    outputJson () {
      outputFile('导出JSON文件', 'json', this.generateCode())
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-drawer__header {
  display: none;
}

.json-editor{
  height: calc(100vh - 33px);
}
@include action-bar;
</style>
