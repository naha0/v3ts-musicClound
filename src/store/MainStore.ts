import { defineStore } from "pinia";

const useMain = defineStore('main',{
    state:()=>({
        theme:''
    }),
    getters:{

    },
    actions:{
        changeTheme(val:string){
            console.log(val);
        }
    }
})

export default useMain