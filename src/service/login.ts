import hyRequest from "@/service/api";

// 手机号登录
export function getCellphone(phone:string,password:string) {
  return hyRequest.get({
    url:'/login/cellphone',
    params:{
      phone,
      password,
      timestamp:`${new Date().getTime()}`
    }
  });
}
//二维码 key 生成接口
export function getQrCode() {
  return hyRequest.get('/login/qr/key?timestamp=' + new Date().getTime());
}
// 二维码生成
export function getQrCodeImg(key:string) {
  return hyRequest.get(`/login/qr/create?key=${key}&timestamp=${new Date().getTime()}&qrimg=true`);
}
// 二维码检查扫码状态
export function getQrCodeStatus(key:string) {
  return hyRequest.get(`/login/qr/check?key=${key}&timestamp=${new Date().getTime()}`);
}
// 退出登录
export function logout() {
  return hyRequest.get('/logout?timestamp=' + new Date().getTime());
}