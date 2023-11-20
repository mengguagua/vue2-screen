<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Nunito+Sans');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family:"Nunito Sans";
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
ol,
ul {
  list-style: none;
}
</style>
