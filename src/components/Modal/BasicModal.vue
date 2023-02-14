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
