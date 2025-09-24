import {create} from "zustand";

export const useAuthState=create(( set)=>({
    authUser:{
        name:"Mostakem",
        id:123,
        age:25
    },
    isLoading: false,
    login:()=>{
        console.log("login function"); 
    }
}))