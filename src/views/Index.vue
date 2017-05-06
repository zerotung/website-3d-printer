<template>
  <div class="hello">
    <div class="hello-wrap">
      <h1>智能云3d打印平台</h1>
      <mu-raised-button to="/print" label="现在开始打印"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  height: 600px;
  display: table;
  vertical-align:middle;
}
.hello-wrap {
  display: table-cell;  
  vertical-align:middle;
}
</style>
