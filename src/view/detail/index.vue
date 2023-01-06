<script setup lang="ts">
import { onMounted } from "vue";
import useMain from "@/store/MainStore";
import { useRouter } from "vue-router";
const MainStore = useMain();
const router = useRouter();
onMounted(() => {
  for (let i = 1; i < 10; i++) {
    const a = router.resolve({
      path: "/home",
    });
    console.log(a);
  }
});
const getTheme = (val: string) => {
  console.log(val);
};
</script>

<template>
  <div>
    <n-space align="center">
      <n-button color="#8a2be2" @click="getTheme('null')">
        <template #icon>
          <n-icon>
            <cash-icon />
          </n-icon>
        </template>
        亮色
      </n-button>
      <n-button color="#ff69b4" @click="getTheme('darkTheme')">
        <template #icon>
          <n-icon>
            <cash-icon />
          </n-icon>
        </template>
        暗色
      </n-button>
    </n-space>
  </div>
</template>

<style scoped lang="scss"></style>
