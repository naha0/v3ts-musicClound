import { defineStore } from "pinia";

const useMain = defineStore('main', {
    state: () => ({
        theme: ''
    }),
    getters: {
        getTheme(): string {
            return this.theme
        },
        getTextColor(): string {
            return this.theme == "darkTheme" ? '#5dc3fe' : '#ec4141'
        },
        getHoverColor(): string {
            return this.theme == "darkTheme" ? '#000' : '#000'
        }
    },
    actions: {
    }
})

export default useMain