<script>
import _ from 'lodash'
export default {
  props: {
    el: {
      type: Object,
      default: null
    }
  },
  data () {
    return {}
  },
  render: function (h) {
    const el = this.el
    const config = el.__config__
    const slot = el.__slot__
    const Tag = `${config.tag}`

    const text = slot && slot.default ? slot.default : ''
    const prepend = slot && slot.prepend ? <template slot="prepend">{slot.prepend}</template> : ''
    const append = slot && slot.append ? <template slot="append">{slot.append}</template> : ''

    let options = null
    if (slot && slot.options) {
      if (config.tag === 'el-select') {
        options = slot.options.map(item => {
          return <el-option label={item.label} value={item.value} disabled={item.disabled}></el-option>
        })
      } else if (config.tag === 'el-radio-group') {
        options = slot.options.map(item => {
          if (config.optionType === 'button') {
            return <el-radio-button label={item.value}>{item.label}</el-radio-button>
          } else {
            return <el-radio label={item.value} border={config.border}>{item.label}</el-radio>
          }
        })
      } else if (config.tag === 'el-checkbox-group') {
        options = slot.options.map(item => {
          if (config.optionType === 'button') {
            return <el-checkbox-button label={item.value}>{item.label}</el-checkbox-button>
          } else {
            return <el-checkbox label={item.value} border={config.border}>{item.label}</el-checkbox>
          }
        })
      } else {
        options = ''
      }
    }

    console.log('options', options)

    const attrs = _.cloneDeep(el)
    delete attrs.__config__
    delete attrs.__slot__

    return (
      <Tag
        value={config.defaultValue}
        placeholder={el.placeholder}
        on-input={event => { console.log('event', event); this.$emit('input', event) }}

        {...{
          attrs
        }}
      >
        {text}
        {options}
        {prepend}
        {append}
      </Tag>
    )
  }
}
</script>
