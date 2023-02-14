<script setup lang="ts">
import { computed, ref, toRefs, watch, reactive } from "vue";
import { ChevronBack, ChevronForward, FlashOutline } from "@vicons/ionicons5";
import { AntCloudOutlined } from "@vicons/antd";
import useMain from "@/store/MainStore";
import { storeToRefs } from "pinia";
import BasicModal, { ModalApi } from "@/components/Modal/BasicModal.vue";
import {
  ModelType,
  IsearchKeyword,
  IhotSearchList,
  IoptionList,
} from "./index";
import {
  FormInst,
  FormItemInst,
  FormItemRule,
  useMessage,
  FormRules,
} from "naive-ui";
import { getCellphone } from "@/service/login";
import { getSuggestSearchList, getHotSearchList } from "@/service/search";
import { throttle } from "lodash";

const MainStore = useMain();
const { login } = storeToRefs(MainStore);
const circleUrl = "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg";
const modal = ref<ModalApi | null>(null);

const basicProps = {
  title: "登录",
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
          return new Error("请输入手机号");
        } else if (!/^1[3-9]\d{9}$/.test(value)) {
          return new Error("请输入正确的手机号");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
  password: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("请输入密码");
        } else if (!/^(?=.*[a-zA-Z])(?=.*\d)[^]{6,16}$/.test(value)) {
          return new Error("密码必须包含至少一个字母和一个数字，长度为6到16位");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
  reenteredPassword: [
    {
      required: true,
      message: "请再次输入密码",
      trigger: ["input", "blur"],
    },
    {
      validator: validatePasswordStartWith,
      message: "两次密码输入不一致",
      trigger: "input",
    },
    {
      validator: validatePasswordSame,
      message: "两次密码输入不一致",
      trigger: ["blur", "password-input"],
    },
  ],
};

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
    rPasswordFormItemRef.value?.validate({ trigger: "password-input" });
};

// 是否登录
const isLogin = computed(() => {
  return login.value.profile.userId ? true : false;
});

// 登录
const goLogin = async (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      message.success("验证成功");
    } else {
      message.error("验证失败");
      return;
    }
  });
  console.log(modelRef, 1);
  const {phone,password} = toRefs(modelRef)
  const res = await getCellphone(phone.value as string,password.value as string)
  console.log(modelRef,phone,password
  );
  if (modal.value) modal.value.isModal = true;
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
const renderLabel = () =>{

}

// 搜索建议
const searchKeyword = ref("");
let selectList = reactive<Array<any>>([]);
const listType = {
  songs: "单曲",
  artists: "歌手",
  albums: "专辑",
  playlists: "歌单",
};
const getSearchList = async (): Promise<any> => {
  try {
    const { result } = await getSuggestSearchList(searchKeyword.value);
    const { order } = result;
    let newArr;
    let albums: IoptionList[] = [
      {
        label:'专辑',
        value:'专辑',
        disabled:true
      }
    ];
    let artists: IoptionList[] = [
      {
        label:'歌手',
        value:'歌手',
        disabled:true
      }
    ];
    let songs: IoptionList[] = [
      {
        label:'单曲',
        value:'单曲',
        disabled:true
      }
    ];
    let playlists: IoptionList[] = [
      {
        label:'歌单',
        value:'歌单',
        disabled:true
      }
    ];
    
    order.forEach((item:string) => {
      newArr = result[item].map((i: any) => {
        if(item === 'songs'){
          let songsName = i.artists.map((item:any) => item.name).join(' ')
          songs.push({
            label: `${i.name} - ${songsName}`,
            value: `${i.name} - ${songsName}`,
          })
          console.log(songs);
        }
        if (item === "albums") {
          albums.push({
            label: `${i.name} - ${i.artist.name}`,
            value: `${i.name} - ${i.artist.name}`,
          });
          console.log(albums);
        }
        if (item === "artists") {
          artists.push({
            label: `${i.name}`,
            value: `${i.name}`,
          });
        }
        if (item === "playlists") {
          playlists.push({
            label: `${i.name}`,
            value: `${i.name}`,
          });
        }
      });
    });
    console.log(newArr);
    selectList = [...songs,...artists,...albums,...playlists]
    console.log(selectList);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};
watch(searchKeyword, throttle(getSearchList, 300));
</script>

<template>
  <div
    class="relative h-59px flex justify-between padding mx-20 my-1 leading-10"
  >
    <div
      class="ml-6 w-45 cursor-pointer align-middle"
      @click="$router.push('/home/hi')"
    >
      <n-space>
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
        v-if="searchKeyword"
      >
        <n-input
          v-model:value="searchKeyword"
          round
          placeholder="搜索"
          clearable
        >
          <template #suffix>
            <n-icon :component="FlashOutline" />
          </template>
        </n-input>
      </n-popselect>

    </n-space>
    <div class="flex justify-center leading-15">
      <div class="cursor-pointer" @click="goLogin">
        <n-avatar
          round
          size="large"
          :src="isLogin ? login.profile.avatarUrl : circleUrl"
        />
        {{ isLogin ? login.profile.nickname : "未登录" }}
      </div>
      <div class="ml-20px" @click="getLogout">退出</div>
    </div>
  </div>
  <teleport to="body">
    <basic-modal :basicProps="basicProps" ref="modal">
      <template #default>
        <n-form
          ref="formRef"
          :model="modelRef"
          :rules="rules"
          label-placement="left"
          label-width="80"
          label-align="left"
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
          <n-form-item
            ref="rPasswordFormItemRef"
            first
            path="reenteredPassword"
            label="重复密码"
          >
            <n-input
              v-model:value="modelRef.reenteredPassword"
              :disabled="!modelRef.password"
              type="password"
              @keydown.enter.prevent
            />
          </n-form-item>
        </n-form>
      </template>
      <template #action>
        <n-row :gutter="[0, 24]">
          <n-col :span="24">
            <div style="display: flex; justify-content: flex-end">
              <n-button
                :disabled="modelRef.phone === null"
                round
                type="primary"
                @click="goLogin"
              >
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
