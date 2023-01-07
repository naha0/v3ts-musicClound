<script setup lang="ts">
import { computed } from "vue";
import { zhCN } from "naive-ui";
import { NConfigProvider, GlobalThemeOverrides } from "naive-ui";
import { darkTheme } from "naive-ui";
import useMain from "@/store/MainStore";
import LayOut from "@/view/LayOut.vue";
const MainStore = useMain();
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: MainStore.getTextColor,
    primaryColorHover:MainStore.getHoverColor
  },
  Button: {
    textColor: MainStore.getTextColor,
  },
};
const themeVal = computed(() =>
  MainStore.theme == "darkTheme" ? darkTheme : undefined
);
</script>

<template>
  <n-config-provider
    :locale="zhCN"
    :theme-overrides="themeOverrides"
    :theme="themeVal"
  >
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
