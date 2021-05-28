<template>
  <div class="editor">
    <Header></Header>
    <Container></Container>

    <FormDrawer :visible="run" />
    <JsonDrawer :visible="json" />
  </div>
</template>
<script>

import Header from './Header'
import Container from './Container'
import FormDrawer from '@c/FormDrawer'
import JsonDrawer from '@c/JsonDrawer'

import { mapGetters } from 'vuex'

export default {
  name: 'Editor',
  components: { Header, Container, FormDrawer, JsonDrawer },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['run', 'json'])
  }
}
</script>
