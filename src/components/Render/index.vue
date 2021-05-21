<script>
export default {
  name: 'Render',
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
    const Tag = `${this.el.__config__.tag}`
    return <Tag value={this.el.__config__.defaultValue} onInput={event => {
      this.$set(this.el.__config__, 'defaultValue', event)
    }}></Tag>
  }
}
</script>
