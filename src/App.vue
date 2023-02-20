<!--
 * @Author: naha0 780400335@qq.com
 * @Date: 2022-12-31 10:04:25
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-20 15:53:57
 * @FilePath: \v3ts1\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { computed } from 'vue';
import { zhCN } from 'naive-ui';
import { NConfigProvider, GlobalThemeOverrides } from 'naive-ui';
import { darkTheme } from 'naive-ui';
import { useUserStore } from '@/store/modules/UserStore.js';
import LayOut from '@/view/LayOut.vue';

const userStore = useUserStore();
const themeOverrides: GlobalThemeOverrides = {
  common: {
    baseColor: userStore.getBaseColor,
    primaryColor: userStore.getTextColor,
  },
  Button: {
    textColor: userStore.getBaseColor,
  },
};
const themeVal = computed(() => (userStore.theme == 'darkTheme' ? darkTheme : undefined));
</script>

<template>
  <n-config-provider :locale="zhCN" :theme-overrides="themeOverrides" :theme="themeVal">
    <n-loading-bar-provider>
      <div class="w-screen">
        <n-message-provider>
          <n-dialog-provider>
            <lay-out></lay-out>
          </n-dialog-provider>
        </n-message-provider>
      </div>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style scoped lang="scss"></style>
