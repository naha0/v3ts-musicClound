<script setup lang="ts">
import { ref, reactive, toRefs, toRef, watch } from "vue";

interface Tree{
  name:string,
  checked:boolean,
  children?:Tree[]
}
defineProps<{ msg?: string, data?:Tree[] }>();

const dom = ref<HTMLDivElement>();
const getValue = () => {
  console.log(dom.value?.innerText);
};
const count = ref(0);
// const loginForm = reactive({
//   name:'',
//   password:''
// })
// const submit = () =>{
//   console.log(loginForm);
// }
// const list:string[] = reactive([])
// reactive 不能直接赋值 否则破坏响应式对象
// 解决方案： 1. 数组 可以加push 加解构
// 2. 添加一个对象 把数组作为一个属性去解决
// const list = reactive<{
//   arr:string[]
// }>({
//   arr:[]
// })
// const input = ref('')
// const add = () =>{
//   // list.push(input.value)
//   // input.value = ''
//   setTimeout(()=>{
//     let res = ['a','b','c']
//     // list.push(...res)
//     list.arr = res
//     console.log(list);
//   },100)
// }
// const man = reactive({
//   name:"张三",
//   age:'12',
//   sex:"娜娜"
// })
// // const {name,age} = toRefs(man)
// const name = toRef(man,'name')
// console.log(name);
// const change = () =>{
//   name.value = '李四'
// }
// const message = reactive({
//   a: {
//     b: {
//       c: "张三",
//       d: "李四",
//     },
//   },
// });
// watch(
//   () => ({ ...message.a.b }),
//   (newValue, oldValue) => {
//     console.log(newValue, oldValue);
//   }
// );
const getCheckBox = (item:Tree,e:Event) => {
  console.log(item,e);
  if(!item.children&&item.checked==true){
    console.log('进入父节点',item);
    if(item.children){
      console.log(item);
      item.checked = false
    }
  }
}

</script>

<template>
  <h1>{{ msg }}</h1>
  <!-- <div ref="dom" @click="getValue">我是vue3</div> -->
  <!-- <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div> -->
  <div v-for="(item,index) in data" :key="index" class="ml-10" @click="getCheckBox(item,$event)">
    <input v-model="item.checked" type="checkbox" /><span>{{item.name}}</span>
    <HelloWorld v-if="item?.children?.length" :data="item?.children"></HelloWorld>
  </div>
  <!-- <div>
    <div>账号:
      <input v-model="loginForm.name" />
    </div>
    <div>密码:
      <input v-model="loginForm.password" />
    </div>
  </div>
  <button @click="submit">提交</button> -->
  <!-- ------- -->
  <!-- <ul>
    <li v-for="(item,index) in list.arr" :key="index">{{ item }}-{{ index }}</li>
  </ul>
  <input v-model="input" />
  <button @click="add">添加</button> -->
  <!-- ------- -->
  <!-- <div>{{name}}</div>
  <button @click="change">修改</button> -->
  <!-- ------------- -->
  <!-- <input type="text" v-model="message.a.b.c" />
  <input type="text" v-model="message.a.b.d" /> -->
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
