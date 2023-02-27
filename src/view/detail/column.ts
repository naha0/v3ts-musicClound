export interface IColumns{
  title:string;
  key:string;
  width:number
}

export const column = [
    {
      title: '音乐标题',
      key: 'name',
      width: 400,
    },
    {
      title: '歌手',
      key: 'arNameString',
      width: 300,
    },
    {
      title: '专辑',
      key: 'alNameString',
      width: 300,
    },
    {
      title: '时长',
      key: 'dt',
      width: 200,
    },
  ];