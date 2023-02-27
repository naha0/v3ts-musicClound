<!--
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-01-07 10:57:14
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-22 14:16:23
 * @FilePath: \v3ts1\src\components\LayOut\NavBar\NavBar.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { computed, ref, toRefs, watch, reactive, onMounted } from 'vue';
import { ChevronBack, ChevronForward, FlashOutline } from '@vicons/ionicons5';
import { AntCloudOutlined } from '@vicons/antd';
import { onSuccess, onError } from '@/utils/messages';
import { useUserStore } from '@/store/modules/UserStore';
import { useSongStore } from '@/store/modules/SongStore';
import { storeToRefs } from 'pinia';
import BasicModal, { ModalApi } from '@/components/Modal/BasicModal.vue';
import { ModelType, IsearchKeyword, IhotSearchList, IoptionList } from './index';
import { FormInst, FormItemInst, FormItemRule, useMessage, FormRules } from 'naive-ui';
import { getCellphone, getQrCode, getQrCodeImg, getQrCodeStatus } from '@/service/index';
import { getUserInfo, getUserDetail } from '@/service/user';
import { getSuggestSearchList, getHotSearchList } from '@/service/search';
import { setToken } from '@/utils/cookie';
import { throttle } from 'lodash';
import { usePlay } from '@/hooks/usePlaySonglist'

const MainStore = useUserStore();
const SongStore = useSongStore();
const { playListRecord } = usePlay()
const { profile } = storeToRefs(MainStore);
const circleUrl = 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg';
const modal = ref<ModalApi | null>(null);

const basicProps = {
  title: '登录',
};
const formRef = ref<FormInst | null>(null);
const rPasswordFormItemRef = ref<FormItemInst | null>(null);
const message = useMessage();
const modelRef = reactive<ModelType>({
  phone: null,
  password: null,
  reenteredPassword: null,
});
const rules: FormRules = {
  account: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('请输入手机号');
        } else if (!/^1[3-9]\d{9}$/.test(value)) {
          return new Error('请输入正确的手机号');
        }
        return true;
      },
      trigger: ['input', 'blur'],
    },
  ],
  password: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('请输入密码');
        } else if (!/^(?=.*[a-zA-Z])(?=.*\d)[^]{6,16}$/.test(value)) {
          return new Error('密码必须包含至少一个字母和一个数字，长度为6到16位');
        }
        return true;
      },
      trigger: ['input', 'blur'],
    },
  ],
  reenteredPassword: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: ['input', 'blur'],
    },
    {
      validator: validatePasswordStartWith,
      message: '两次密码输入不一致',
      trigger: 'input',
    },
    {
      validator: validatePasswordSame,
      message: '两次密码输入不一致',
      trigger: ['blur', 'password-input'],
    },
  ],
};
let unikey = '';
let qrImg = ref('');
type qrStatus = 800 | 801 | 802 | 803;
const status = ref<qrStatus>();
let timer: number;
const qrShow = ref<boolean>(false);
const isLoadingQrCodeImg = ref<boolean>(true);

function validatePasswordSame(rule: FormItemRule, value: string): boolean {
  return value === modelRef.password;
}
function validatePasswordStartWith(rule: FormItemRule, value: string): boolean {
  return (
    !!modelRef.password &&
    modelRef.password.startsWith(value) &&
    modelRef.password.length >= value.length
  );
}
// 校验密码输入
const handlePasswordInput = () => {
  if (modelRef.reenteredPassword)
    rPasswordFormItemRef.value?.validate({ trigger: 'password-input' });
};

// 是否登录
const isLogin = computed(() => {
  return profile.value.userId ? true : false;
});

// 登录
const goLogin = async (e: MouseEvent) => {
  console.log(123);
  qrShow.value = false;
  e.preventDefault();
  formRef.value?.validate(errors => {
    if (!errors) {
      onSuccess('验证成功');
    } else {
      onError('验证失败');
      return;
    }
  });
  const { phone, password } = toRefs(modelRef);
  const res = await getCellphone(phone.value as string, password.value as string);
  console.log(modelRef, phone, password);
  if (modal.value) modal.value.isModal = true;
};
// 切换登录方式
const changeQr = () => {
  qrShow.value = true;
  qrKey();
};

// 二维码登录
const qrKey = () => {
  getQrCode().then((res: any) => {
    unikey = res.data.unikey;
    qrCodeImg();
  });
};
const qrCodeImg = () => {
  getQrCodeImg(unikey).then((res: any) => {
    console.log(res);
    qrImg.value = res.data.qrimg;
    isLoadingQrCodeImg.value = false;
    loopCheckStatus();
  });
};
const loopCheckStatus = () => {
  timer = window.setInterval(() => {
    getQrCodeStatus(unikey).then((res: any) => {
      if (!modal.value?.isModal) window.clearInterval(timer);
      console.log(modal.value?.isModal);
      if (!timer) return;
      status.value = res.code;
      if (status.value === 803) {
        clearInterval(timer);
        message.success('授权登录成功');
        setToken(res.cookie, 7);
        timer = 0;
        getUser();
        return;
      }
      if (status.value === 800) {
        clearInterval(timer);
        message.warning('二维码已过期');
        timer = 0;
      }
      if (!modal.value?.isModal) return;
    });
  }, 1000);
};
// 获取账号信息
const getUser = async () => {
  let res: any = await getUserInfo();
  profile.value.avatarUrl = res.profile.avatarUrl;
  profile.value.nickname = res.profile.nickname;
  profile.value.userId = res.profile.userId;
  window.localStorage.setItem('user', JSON.stringify(profile.value));
  console.log(res);
  let res1: any = await getUserDetail(profile.value.userId);
};

const handleRefreshClick = () => {
  qrImg.value = '';
  status.value = undefined;
  qrKey();
};

// 退出登录
const getLogout = () => {};

// 热搜列表
let hotList = reactive<IhotSearchList[]>([]);
const getHotList = async () => {
  const { data } = await getHotSearchList();
  hotList = data.map((item: any) => {
    const { content, score, searchWord, iconUrl } = item;
    return {
      content,
      score,
      searchWord,
      iconUrl,
    };
  });
};
getHotList();
const renderLabel = () => {};

// 搜索建议
const searchKeyword = ref('');
let selectList = reactive<Array<any>>([]);
const listType = {
  songs: '单曲',
  artists: '歌手',
  albums: '专辑',
  playlists: '歌单',
};
const getSearchList = async (): Promise<any> => {
  try {
    const { result } = await getSuggestSearchList(searchKeyword.value);
    const { order } = result;
    let newArr;
    let albums: IoptionList[] = [
      {
        label: '专辑',
        value: '专辑',
        disabled: true,
      },
    ];
    let artists: IoptionList[] = [
      {
        label: '歌手',
        value: '歌手',
        disabled: true,
      },
    ];
    let songs: IoptionList[] = [
      {
        label: '单曲',
        value: '单曲',
        disabled: true,
      },
    ];
    let playlists: IoptionList[] = [
      {
        label: '歌单',
        value: '歌单',
        disabled: true,
      },
    ];

    order.forEach((item: string) => {
      newArr = result[item].map((i: any) => {
        if (item === 'songs') {
          let songsName = i.artists.map((item: any) => item.name).join(' ');
          songs.push({
            label: `${i.name} - ${songsName}`,
            value: `${i.name} - ${songsName}`,
            id: i.id,
          });
          console.log(songs);
        }
        if (item === 'albums') {
          albums.push({
            label: `${i.name} - ${i.artist.name}`,
            value: `${i.name} - ${i.artist.name}`,
            id: i.id,
          });
          console.log(albums);
        }
        if (item === 'artists') {
          artists.push({
            label: `${i.name}`,
            value: `${i.name}`,
            id: i.id,
          });
        }
        if (item === 'playlists') {
          playlists.push({
            label: `${i.name}`,
            value: `${i.name}`,
            id: i.id,
          });
        }
      });
    });
    console.log(newArr);
    selectList = [...songs, ...artists, ...albums, ...playlists];
    console.log(selectList);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

const songDetail = (value: string, option: any) => {
  playListRecord(value,option.id)
};
watch(searchKeyword, throttle(getSearchList, 300));
onMounted(() => {
  console.log(123);
  let user: any = JSON.parse(window.localStorage.getItem('user') || '');
  profile.value.avatarUrl = user.avatarUrl;
  profile.value.nickname = user.nickname;
  profile.value.userId = user.userId;
});
</script>

<template>
  <div class="relative h-15 flex justify-between padding mx-20 my-1 items-center">
    <div class="ml-6 w-45 cursor-pointer align-middle" @click="$router.push('/home')">
      <n-space class="items-center">
        <n-icon size="40">
          <AntCloudOutlined />
        </n-icon>
        <span>某易云音乐</span>
      </n-space>
    </div>
    <div class="flex items-center absolute left-1/4 h-60px text-center w-20">
      <n-space>
        <n-icon size="20" :component="ChevronBack" @click="$router.go(-1)" />
        <n-icon size="20" :component="ChevronForward" @click="$router.go(1)"
      /></n-space>
    </div>
    <n-space>
      <n-popselect
        trigger="hover"
        :options="selectList"
        v-model:value="searchKeyword"
        scrollable
        :on-update:value="songDetail"
      >
        <n-input v-model:value="searchKeyword" round placeholder="搜索" clearable>
          <template #suffix>
            <n-icon :component="FlashOutline" />
          </template>
        </n-input>
      </n-popselect>
    </n-space>
    <div class="flex justify-center leading-15 items-center">
      <div class="cursor-pointer flex justify-center items-center" @click="goLogin">
        <n-avatar
          round
          size="large"
          :src="isLogin ? profile.avatarUrl : circleUrl"
          class="text-#5dc3fe mr-2"
        />
        {{ isLogin ? profile.nickname : '未登录' }}
      </div>
      <div class="ml-2" @click="getLogout" v-if="profile.nickname">退出</div>
    </div>
  </div>
  <teleport to="body">
    <basic-modal :basicProps="basicProps" ref="modal" v-memo>
      <template #default>
        <n-form
          ref="formRef"
          :model="modelRef"
          :rules="rules"
          label-placement="left"
          label-width="80"
          label-align="left"
          v-if="!qrShow"
        >
          <n-form-item path="phone" label="手机号">
            <n-input v-model:value="modelRef.phone" @keydown.enter.prevent />
          </n-form-item>
          <n-form-item path="password" label="密码">
            <n-input
              v-model:value="modelRef.password"
              type="password"
              @input="handlePasswordInput"
              @keydown.enter.prevent
            />
          </n-form-item>
          <n-form-item ref="rPasswordFormItemRef" first path="reenteredPassword" label="重复密码">
            <n-input
              v-model:value="modelRef.reenteredPassword"
              :disabled="!modelRef.password"
              type="password"
              @keydown.enter.prevent
            />
          </n-form-item>
          <n-form-item>
            <span @click="changeQr">二维码登录</span>
          </n-form-item>
        </n-form>
        <n-spin :show="isLoadingQrCodeImg" v-if="qrShow">
          <div class="relative mt-5">
            <img
              class="mx-auto my-auto"
              v-show="!isLoadingQrCodeImg"
              width="200"
              height="200"
              :src="qrImg"
            />
            <!-- 图片加载时占位符 -->
            <div v-show="isLoadingQrCodeImg" style="width: 200px; height: 200px" />

            <!-- 二维码过期蒙层 -->
            <div
              v-if="status === 800"
              class="flex absolute inset-0 justify-center items-center bg-black/90"
            >
              <div class="text-white">
                <p>二维码已失效</p>
                <n-button size="small" type="primary" class="mt-4" @click="handleRefreshClick">
                  点击刷新
                </n-button>
              </div>
            </div>
          </div>
        </n-spin>
      </template>
      <template #action>
        <n-row :gutter="[0, 24]" v-if="!qrShow">
          <n-col :span="24">
            <div style="display: flex; justify-content: flex-end">
              <n-button :disabled="modelRef.phone === null" round type="primary" @click="goLogin">
                验证
              </n-button>
            </div>
          </n-col>
        </n-row></template
      >
    </basic-modal>
  </teleport>
</template>

<style lang="scss" scoped></style>
