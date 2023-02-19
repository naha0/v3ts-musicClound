<!--
 * @Author: naha0 780400335@qq.com
 * @Date: 2022-12-31 10:04:25
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-19 14:42:16
 * @FilePath: \v3ts1\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { computed } from 'vue';
import { zhCN } from 'naive-ui';
import { NConfigProvider, GlobalThemeOverrides } from 'naive-ui';
import { darkTheme } from 'naive-ui';
import { useMain } from '@/store/modules/MainStore';
import LayOut from '@/view/LayOut.vue';

console.log(123);

const MainStore = useMain();
const themeOverrides: GlobalThemeOverrides = {
  common: {
    baseColor: MainStore.getBaseColor,
    primaryColor: MainStore.getTextColor,
  },
  Button: {
    textColor: MainStore.getBaseColor,
  },
};
const themeVal = computed(() => (MainStore.theme == 'darkTheme' ? darkTheme : undefined));
</script>

<template>
  <n-config-provider :locale="zhCN" :theme-overrides="themeOverrides" :theme="themeVal">
    <n-loading-bar-provider>
      <div class="w-100vw">
        <n-message-provider>
          <n-dialog-provider>
            <lay-out></lay-out>
          </n-dialog-provider>
        </n-message-provider>
      </div>
    </n-loading-bar-provider>
  </n-config-provider>
  <router-view></router-view>
</template>

<style scoped lang="scss"></style>
