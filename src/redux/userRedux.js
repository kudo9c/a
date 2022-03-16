import {createSlice} from "@reduxjs/toolkit"

const userSlide = createSlice({
    name:"user",
    initialState:{
        currentUser: null,
        isFetching: false,
        error: false,
        userList: null
    },
    reducers:{
        loginStart:(state)=>{
            state.isFetching=true
            state.error = false
        },
        loginSuccess:(state, action)=>{
            state.isFetching = false
            state.currentUser=action.payload
        },
        loginFailure:(state)=>{
            state.isFetching = false
            state.error = true
        },
        logout: (state) => {
            state.currentUser= null;
            state.userList = null
        },
        //GET ALL USERS
        getUserStart:(state)=>{
            state.isFetching=true
            state.error = false
        },
        getUserSuccess:(state, action)=>{
            state.isFetching = false
            state.userList=action.payload
        },
        getUserFailure:(state)=>{
            state.isFetching = false
            state.error = true
        },
        //DELETE
        deleteUserStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        deleteUserSuccess: (state,action) => {
            state.isFetching = false
            state.userList.splice(state.userList.findIndex(item => item._id === action.payload),1)
        },
        deleteUserFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        //UPDATE
        updateUserStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        updateUserSuccess: (state,action) => {
            state.isFetching = false
            state.userList[state.userList.findIndex(item => item._id === action.payload.id)] = action.payload.user
        },
        updateUserFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
         //ADD
        addUserStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        addUserSuccess: (state,action) => {
            state.isFetching = false
            state.userList.push(action.payload)
        },
        addUserFailure: (state) => {
            state.isFetching = false
            state.error = true
        }
    }
})

export const {loginStart, loginSuccess, loginFailure, logout, getUserStart,getUserSuccess, getUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure
,updateUserStart,updateUserSuccess,updateUserFailure,
addUserStart,addUserSuccess,addUserFailure} = userSlide.actions
export default userSlide.reducer