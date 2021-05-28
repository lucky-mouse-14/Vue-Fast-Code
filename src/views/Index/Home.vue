<template>
  <div class="home">
    <div class="flex flex-row flex-wrap justify-center items-center height100vh cards">
      <el-card class="text-center">
        <div class="logo">
          <el-image
            style="width: 100px; height: 100px"
            src="https://i.loli.net/2021/05/28/8Dzskt1wgYKvrLj.png"
            fit="fit"></el-image>
        </div>
        <div class="content">
          <p>FAST-FORM-CODE</p>
          <el-button type="primary" size="mini" @click="$router.push({name: 'Editor'})">进入</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style lang="scss" scoped>

</style>
