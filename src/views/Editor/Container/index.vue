<template>
  <div class="flex flex-nowrap justify-between items-stretch editor__container">
    <LeftBoard></LeftBoard>
    <CenterBoard></CenterBoard>
    <RightBoard></RightBoard>
  </div>
</template>
<script>

import LeftBoard from './LeftBoard'
import CenterBoard from './CenterBoard'
import RightBoard from './RightBoard'

export default {
  name: 'EditorContainer',
  components: { LeftBoard, CenterBoard, RightBoard },
  data () {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.editor__container {
  height: calc(100vh - 40px);
}
</style>
