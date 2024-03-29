import {createSlice} from '@reduxjs/toolkit'
export const ClientAuth = createSlice  ({
    name:'Client',
    initialState: {
        Token : null ,
        userName:null,
        email : null ,
       role : null,
       isAdmin:null,
       userId:null
    } ,
    reducers: {
        clientLogin(state, action) {
            state.Token = action.payload.token;
            state.email = action.payload.email;
            state.userName = action.payload.username;
            state.role =action.payload.role
            state.isAdmin=action.payload.isAdmin
            state.userId=action.payload.userId

          },          
        clientLogout(state,action){
            state.Token =null,
             state.email = null,
            state.userName = null,
            state. role =false,
            state.isAdmin=null,
            state.userId=null
        }
       
    }
})

export const {clientLogin,clientLogout} =ClientAuth.actions

export const Clientreducer = ClientAuth.reducer