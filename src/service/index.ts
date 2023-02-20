import hyRequest from "@/service/api";
// 获取轮播
export function getBanner() {
  return hyRequest.get({
    url:'/banner',
    method:'get'
  });
}
// 批量请求接口
// export function batchRequest(data: {
//   [key: string]: any
// }) {
//   return hyRequest.post('/batch', data);
// }
export * from './mv';
export * from './playlist';
export * from './songs';
export * from './login';
export * from './user';
export * from './search';
export * from './album';