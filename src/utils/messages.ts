/*
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-02-18 21:29:48
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-18 21:30:11
 * @FilePath: \v3ts1\src\utils\messages.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { MessageOptions } from 'naive-ui';

export const onError = (message?: string, option?: MessageOptions) =>
  window.$message.error(message ? message : '出错了', option);

export const onSuccess = (message?: string, option?: MessageOptions) =>
  window.$message.success(message ? message : 'Nice~', option);

export const onWarning = (message?: string, option?: MessageOptions) =>
  window.$message.warning(message ? message : '注意', option);

export const onInfo = (message?: string, option?: MessageOptions) =>
  window.$message.info(message ? message : '提示', option);
