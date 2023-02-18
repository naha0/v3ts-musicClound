<!--
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-01-07 21:06:28
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-17 14:37:06
 * @FilePath: \v3ts1\src\components\Modal\BasicModal.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { ref, useAttrs, computed, unref } from "vue";
import { basicProps } from "./prop";
import { ModalProps } from "./type";

export interface ModalApi {
  isModal: boolean;
}

const emit = defineEmits(["on-ok", "on-close"]);
const attrs = useAttrs();
const isModal = ref<boolean>(true);
const subLoading = ref<boolean>(false);

const props = defineProps({ ...basicProps });

const getBindValue = computed(() => {
  console.log({ ...unref(props) });
  return {
    ...attrs,
    ...unref(props),
  };
});
console.log(getBindValue);

function closeModal() {
  isModal.value = false;
  subLoading.value = false;
  emit("on-close");
}
const handleSubmit = () => {
  subLoading.value = true;
  emit("on-ok");
};
defineExpose({
  isModal,
});
</script>

<template>
  <n-modal v-model:show="isModal" preset="dialog" title="Dialog">
    <template #header>
      <div class="w-full cursor-move" id="basic-modal-bar">
        {{ getBindValue.basicProps.title }}
      </div>
    </template>
    <template #default>
      <slot name="default"></slot>
    </template>
    <template #action v-if="!$slots.action">
      <n-space>
        <n-button @click="closeModal">取消</n-button>
        <n-button type="primary" @click="handleSubmit">{{
          getBindValue.subBtuText
        }}</n-button>
      </n-space>
    </template>
    <template #action v-else>
      <slot name="action"></slot>
    </template>
  </n-modal>
</template>

<style lang="scss" scoped></style>
