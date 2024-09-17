import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id:'',
    name: '', 
    email: '', 
    profile_pic_url: '', 
    token:'',
    onlineUsers:[],
    socketConnection:null
  };

const userSlice = createSlice({

    name:'user',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            const {name,email,profile_pic_url,_id} = action.payload
            state._id=_id
            state.name=name
            state.email=email
            state.profile_pic_url=profile_pic_url
        },
        setToken:(state,action)=>{
            state.token=action.payload
        },
        logOut:(state,action)=>{
            state.name = ''
            state.email='' 
            state.profile_pic_url= '' 
            state.token='' 
            state._id=''
            state.socketConnection=null
            state.onlineUsers=[]
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers=action.payload
        },
        setSocketConnection:(state,action)=>{
            state.socketConnection=action.payload
        }
    }
})

export const {setToken,setUser,logOut,setOnlineUsers,setSocketConnection} = userSlice.actions
export default userSlice.reducer
