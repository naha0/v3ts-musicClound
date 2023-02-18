export interface IUserProfile{
    avatarUrl: string;
    nickname: string;
    userId: number;
}

export interface IUserPlaylist{
    name: string | null;
    id: number | null;
    coverImgUrl: string | null;
    userId:number | null;
}

export interface IUserPlaylistDetail extends IUserPlaylist{

}