import {useMainStore} from '@/store/MainStore'
const MainStore = useMainStore()

export const useUser = () =>{
    const userPlayList = async () => {
        if(MainStore.profile.userId){
            return await MainStore.onUserPlaylistAction(MainStore.profile.userId)
        }
    }
    return {
        userPlayList
    }
}