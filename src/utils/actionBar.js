import { saveAs } from 'file-saver' // 保存文件插件
import ClipboardJS from 'clipboard' // 拷贝插件
import { MessageBox, Notification } from 'element-ui'

/**
 * 导出文件
 * @param {String} title - 对话框标题
 * @param {String} suffix - 文件后缀名
 * @param {String} codeStr - 文本代码
 */
export function outputFile (title, suffix, codeStr) {
  MessageBox.prompt('文件名', title, {
    inputValue: `${+new Date()}.${suffix}`,
    closeOnClickModel: false,
    inputPlaceholder: '请输入文件名'
  }).then(({ value }) => {
    if (!value) value = `${+new Date()}.${suffix}`
    const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, value)
  }).catch(error => error)
}

/**
 * 代码拷贝
 * @param {String} el - 元素 class 或 id
 * @param {String} codeStr - 代码文本
 */
export function codeCopy (el, codeStr) {
  const clipboard = new ClipboardJS(el, {
    text: function () {
      return codeStr
    }
  })
  clipboard.on('success', e => {
    Notification({
      title: '复制成功',
      message: '代码已复制到剪贴板',
      type: 'success'
    })
    clipboard.destroy()
  })
  clipboard.on('error', e => {
    console.log(this, '该浏览器不支持自动复制', 'warning')
    clipboard.destroy()
  })
}
