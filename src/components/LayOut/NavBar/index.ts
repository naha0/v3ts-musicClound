export interface ModelType {
  phone: string | null
  password: string | null
  reenteredPassword: string | null
}

export interface IsearchKeyword{
  albums:any[],
  artists:any[],
  [key: string]:any[],
  playlists:any[],
  songs:any[]
}

export interface IhotSearchList{
  content:string,
  score:number,
  iconUrl:string | null,
  searchWord:string,
}

export interface IoptionList{ 
  label: string,
  value: string,
  disabled?: Boolean
}