<template>
  <span class="SwitchButton">
    <span v-for="(item, i) in options" :key="i" :class="{active: item == value}" @click="change(item)">{{ item }}</span>
  </span>
</template>

<script>
export default {
  name: "SwitchButton",
  props: ["value", "options"],
  model: {
    prop: "value",
    event: "change",
  },
  computed: {},
  mounted() {},
  methods: {
    change(item) {
      if (item != this.value) {
        this.$emit("change", item);
      }
    }
  },
};
</script>

<style lang="scss" rel="style/scss" scoped>
.SwitchButton {
  display: inline-block;
  height: 27px;
  line-height: 27px;
  background: #000000;
  border: 1px solid rgba(0, 228, 228, 1);
  border-radius: 100px;
  font-size: 14px;
  color: #B9BEC9;
  span {
    display: inline-block;
    padding: 0 18px;
    border-radius: 100px;
    cursor: pointer;
  }
  .active {
    height: 25px;
    line-height: 25px;
    padding: 0 17px;
    color: #00FEF4;
    border: 1px solid #00e4e4;
    box-shadow: inset 0 0 8px 5px #458ea7;
  }
}
</style>