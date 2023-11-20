<template>
  <div class="TitleTag" :style="'width:' + width + ';' + (height ? 'height:' + height + ';' : '')">
    <div class="tagTitle">
      <span>{{title}}</span>
    </div>
    <div class="tagContent">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TitleTag",
  props: {
    title: {
      type: String
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String
    }
  },
  computed: {},
  methods: {},
  mounted() {}
};
</script>

<style lang="scss" rel="style/scss" scoped>
.TitleTag {
  .tagTitle {
    background: url("../assets/img/titleBg.png") no-repeat;
    background-size: 100% 100%;
    height: 35px;
    line-height: 35px;
    font-size: 16px;
    color: #A0DCFF;
    font-weight: 900;
    span {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      &::before {
        content: "";
        margin-right: 8px;
        width: 13px;
        height: 13px;
        background: url("../assets/img/titleIcon.png") no-repeat;
      }
    }
  }
  .tagContent {
    position: relative;
    padding-top: 16px;
    height: calc(100% - 35px);
  }
}
</style>