import { defineStore } from "pinia";

const useMain = defineStore('main', {
    state: () => ({
        theme: '',
        login: {
            token: '',
            code: '',
            profile: {
                avatarUrl: '',
                nickname: '',
                userId: ''
            }
        }
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