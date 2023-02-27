<!--
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-02-23 14:22:39
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-24 16:59:37
 * @FilePath: \v3ts1\src\view\detail\components\DataTable.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="">
    <n-data-table
      :single-line="false"
      :bordered="false"
      :columns="columns"
      :data="tableData"
      :max-height="1000"
      virtual-scroll
    />
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { IColumns } from '../../detail/column';
import { ILsitPlay } from '@/models/play';
const props = defineProps({
  columns: {
    type: Array as PropType<IColumns[]>,
    required: true,
  },
  tableData: {
    type: Object as PropType<ILsitPlay[]>,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
