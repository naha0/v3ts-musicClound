export interface IArNameList{
    id:number;
    name:string;
    [propName: string]: any;
}

export interface IListRecord{
    songId:number;
    songName:string;
    playUrl:string;
    playTime:number;
    cover:string;
    arNameString:string;
}