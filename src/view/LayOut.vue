<script setup lang="ts">
import { CashOutline as CashIcon } from "@vicons/ionicons5";
import useMain from "@/store/MainStore";
import { useMessage, useDialog, NButton, NIcon, NGradientText } from "naive-ui";
import { onMounted, h, computed } from "vue";
import NavBar from "@/components/LayOut/NavBar/NavBar.vue";
import MainContent from "@/components/LayOut/MainContent.vue";
import FooterControl from "@/components/LayOut/FooterControl/FooterControl.vue";
const dialog = useDialog();
const MainStore = useMain();
window.$message = useMessage();

const inverted = computed(() =>(MainStore.theme == "darkTheme" ? false : true));
const buttonRender = () => {
  return h("div", null, [
    h(
      NButton,
      {
        ghost: true,
        color: "rgb(197, 161, 161)",
        onClick: () => (MainStore.theme = "null"),
        style: {
          margin: " 0 10px 0 0",
        },
      },
      {
        default: () => "亮色",
        icon: () =>
          h(NIcon, {
            component: CashIcon,
          }),
      }
    ),
    h(
      NButton,
      {
        ghost: true,
        color: "#282c34",
        onClick: () => (MainStore.theme = "darkTheme"),
      },
      {
        default: () => "暗色",
        icon: () =>
          h(NIcon, {
            component: CashIcon,
          }),
      }
    ),
    h(
      NGradientText,
      {
        type: "warning",
        style: {
          display: "block",
          margin: "15px 0 0 0",
        },
      },
      {
        default: "默认主题为亮色嗷",
      }
    ),
  ]);
};

onMounted(() => {
  dialog.success({
    title: "请选择主题颜色",
    content: buttonRender,
    positiveText: "确定",
    maskClosable: false,
    onEsc: () => {
      window.$message.success("通过 esc 关闭");
    },
  });
});
</script>

<template>
  <div>
    <n-layout style="height: 100vh">
      <n-layout-header bordered>
        <nav-bar bordered></nav-bar>
      </n-layout-header>
      <main-content :getInverted="inverted"></main-content>
      <n-layout-footer bordered>
        <footer-control></footer-control>
      </n-layout-footer>
    </n-layout>
  </div>
</template>

<style scoped lang="scss">
.color{
  color:#5dc3fe
}
</style>
