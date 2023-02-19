<!--
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-01-07 09:32:40
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-19 14:29:24
 * @FilePath: \v3ts1\src\view\LayOut.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { CashOutline as CashIcon } from '@vicons/ionicons5';
import { useMain } from '@/store/modules/MainStore';
import { useDialog, NButton, NIcon, NGradientText } from 'naive-ui';
import { onMounted, h, computed } from 'vue';
import NavBar from '@/components/LayOut/NavBar/NavBar.vue';
import MainContent from '@/components/LayOut/MainContent.vue';
import FooterControl from '@/components/LayOut/FooterControl/FooterControl.vue';
import { onSuccess } from '@/utils/messages';

const dialog = useDialog();
const MainStore = useMain();

const inverted = computed(() => (MainStore.theme == 'darkTheme' ? false : true));
const buttonRender = () => {
  return h('div', null, [
    h(
      NButton,
      {
        ghost: true,
        color: 'rgb(197, 161, 161)',
        onClick: () => (MainStore.theme = 'null'),
        style: {
          margin: ' 0 10px 0 0',
        },
      },
      {
        default: () => '亮色',
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
        color: '#282c34',
        onClick: () => (MainStore.theme = 'darkTheme'),
      },
      {
        default: () => '暗色',
        icon: () =>
          h(NIcon, {
            component: CashIcon,
          }),
      }
    ),
    h(
      NGradientText,
      {
        type: 'warning',
        style: {
          display: 'block',
          margin: '15px 0 0 0',
        },
      },
      {
        default: '默认主题为亮色嗷',
      }
    ),
  ]);
};

onMounted(() => {
  dialog.success({
    title: '请选择主题颜色',
    content: buttonRender,
    positiveText: '确定',
    maskClosable: false,
    onEsc: () => {
      onSuccess('通过 esc 关闭');
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
.color {
  color: #5dc3fe;
}
</style>
