<script setup lang="ts">
import { ref } from 'vue';
import { zhCN } from 'naive-ui';
import { NConfigProvider, GlobalThemeOverrides } from 'naive-ui'
import { darkTheme } from 'naive-ui'
import type { GlobalTheme } from 'naive-ui'
import useMain from '@/store/MainStore';
  const themeOverrides: GlobalThemeOverrides = {
    common: {
      primaryColor: '#FF0000'
    },
    Button: {
      textColor: '#FF0000'
    }
  }
const themeVal = ref<GlobalTheme | null>(null)

</script>

<template>
  <n-config-provider :locale="zhCN" :theme-overrides="themeOverrides" :theme="themeVal">
    <n-loading-bar-provider>
      <div class="w-100vw">
        <n-message-provider>
          <n-dialog-provider>
            <router-view></router-view>
          </n-dialog-provider>
        </n-message-provider>
      </div>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style scoped lang="scss">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.text {
  @apply text-yellow-600 w-screen bg-zinc-900;
}
</style>
