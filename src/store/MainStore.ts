import { defineStore } from "pinia";

const useMain = defineStore('main', {
    state: () => ({
        // 主题
        theme: '',
        token: '',
        // 用户信息
        profile: {
            avatarUrl: '',
            nickname: '',
            userId: 0
        },
        // 用户歌单
        userPlaylist:[]
    }),
    getters: {
        getTheme(): string {
            return this.theme
        },
        getTextColor(): string {
            return this.theme == "darkTheme" ?  '#ec4141': '#5dc3fe'
            // return this.theme == "darkTheme" ? 'yellow' : 'blue'

        },
        getBaseColor(): string {
            return this.theme == "darkTheme" ? 'ec4141' : '#d5d5d5'
        }
    },
    actions: {
    }
})

export default useMain