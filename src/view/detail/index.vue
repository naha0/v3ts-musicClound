<!--
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-01-06 16:08:26
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-27 15:04:35
 * @FilePath: \v3ts1\src\view\detail\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { computed } from 'vue';
import { useMainStore } from '@/store/modules/MainStore';
import { ILsitPlay } from '@/models/play';
import { formatArList, formatSongTime } from '@/utils/index';
import { column } from './column';
import { usePlay } from '@/hooks/usePlaySonglist'
import {useRouter} from 'vue-router'
import DataTable from '@/view/detail/components/DataTable.vue'
import DataComment from '@/view/detail/components/DataComment.vue'
const router = useRouter()
const MainStore = useMainStore();
const { playListDetail,playlistComment } = usePlay()
playListDetail(router.currentRoute.value.query.id as string)
playlistComment(router.currentRoute.value.query.id as string)
let newPlaylistDetail = computed(() =>
  MainStore.playlistDetail.map((item: any) => {
    let handlerPlaylistDetail: ILsitPlay = {
      ar: [],
      id: 0,
      name: '',
      dt: '',
      arNameString: '',
      alNameString: '',
    };
    handlerPlaylistDetail.id = item.id;
    handlerPlaylistDetail.name = item.name;
    handlerPlaylistDetail.arNameString = formatArList(item.ar);
    handlerPlaylistDetail.alNameString = item.al?.name;
    handlerPlaylistDetail.dt = formatSongTime(item.dt / 1000);
    return handlerPlaylistDetail;
  })
);
</script>

<template>
  <div>
    <n-tabs type="line" animated>
      <n-tab-pane name="oasis" tab="歌曲列表">
        <DataTable :columns="column" :tableData="newPlaylistDetail"></DataTable>
      </n-tab-pane>
      <n-tab-pane name="the beatles" tab="评论">
        <DataComment :commentData="MainStore.playlistComment" :itemHeight="80">
          <template #default="{data}">
            <n-card hoverable>
              <div class="flex">
                <img class="w-10 h-full rounded" :src="data.user.avatarUrl" />
                <div class="flex flex-col ml-4">
                  <div >
                  <span class="text-blue mr-2">{{ data.user.nickname }}:</span>
                  <span>{{ data.content }}</span>
                  </div>
                  <span class="text-gray-400">{{ data.timeStr }}</span>
                </div>
              </div>
            </n-card>
          </template>
        </DataComment>
      </n-tab-pane>
      <n-tab-pane name="jay chou" tab="收藏者">
        七里香
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<style scoped lang="scss"></style>
