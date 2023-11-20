<template>
  <div id="container" ref="full-screen-container">
    <template v-if="ready">
      <slot></slot>
    </template>
  </div>
</template>

<script>
import { debounce } from "./utils";
export default {
  name: "Container",
  props: {
    options: {
      type: Object
    }
  },
  data() {
    return {
      width: {},
      height: {},
      originalWidth: {},
      originalHeight: {},
      dom: "",
      ready: false
    };
  },
  async mounted() {
    await this.initSize();
    this.updateSize();
    this.updateScale();
    window.addEventListener("resize", debounce(100, this.onResize));
    this.ready = true
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  computed: {},
  methods: {
    async onResize() {
      await this.initSize();
      this.updateScale();
    },
    initSize() {
      return new Promise((resolve) => {
        this.$nextTick(() => {
          const dom = this.$refs["full-screen-container"];
          //视口区域的样式
          //获取大屏的真实尺寸
          if (this.options) {
            this.width.value = this.options.width;
            this.height.value = this.options.height;
          } else {
            this.width.value = dom.clientWidth;
            this.height.value = dom.clientHeight;
          }
          this.dom = dom;
          // 获取画布尺寸
          if (!this.originalWidth.value || this.originalHeight.value) {
            this.originalWidth.value = window.screen.width;
            this.originalHeight.value = window.screen.height;
          }
        });
        resolve()
      })

    },
    updateSize() {
      if (!this.dom) {
        return
      }
      if (this.width.value && this.height.value) {
        this.dom.style.width = `${this.width.value}px`;
        this.dom.style.height = `${this.height.value}px`;
      } else {
        this.dom.style.width = `${this.originalWidth.value}px`;
        this.dom.style.height = `${this.originalHeight.value}px`;
      }
    },
    updateScale() {
      if (!this.dom) {
        return
      }
      // 获取真实的视口
      const currentWidth = document.body.clientWidth;
      const currentHeight = document.body.clientHeight;
      const realWidth = this.width.value || this.originalWidth.value;
      const realHeight = this.height.value || this.originalHeight.value;

      this.dom.style.transform = `scale(${currentWidth /
        realWidth}, ${currentHeight / realHeight})`;
    }
  }
};
</script>

<style lang="scss" rel="style/scss" scoped>
#container {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  transform-origin: left top;
  z-index: 999;
}
</style>
