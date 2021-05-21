<template>
  <div class="editor">
    <Header></Header>
    <Container></Container>
  </div>
</template>
<script>

import Header from './Header'
import Container from './Container'

export default {
  name: 'Editor',
  components: { Header, Container },
  data () {
    return {}
  }
}
</script>
