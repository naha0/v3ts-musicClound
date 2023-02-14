export interface IDataType<T = any>{
    code:number,
    result?:T,
    data?:T,
    message?:string
}