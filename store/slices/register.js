import { useState } from 'react';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import Router from "next/router";
import { getUserAuthen } from '@/store/slices/authen'
import Swal from 'sweetalert2'

const initialState = {
    username:null,
    password:null,
    confirmed:null,
    resettoken:null,
    fname:null,
    lname:null,
    email:null,
    phone:null,
    isAuthenticate: false,
    token:null,
    isError:false,
    errorData: null,
    isSuccess:false,
    SuccessData: null,
    isLoading: false,
};

const slice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        authenPending(state,action){
            state.isLoading = true;
            state.isAuthenticate = false;
            state.token = null;
            state.isError = false;
            state.errorData = null;
            state.isSuccess = false;
            state.SuccessData = null;
        },
        resetAll(state,action){
            state.isLoading = false;
            state.isAuthenticate = false;
            state.token = null;
            state.isError = false;
            state.errorData = null;
            state.isSuccess = false;
            state.SuccessData = null;
            state.phone = null;
            state.username = null;
            state.password = null;
            state.confirmed = null;
            state.fname = null;
            state.lname = null;
            state.email = null;
            state.resettoken = null;
        },
        firstAdd(state,action){
            state.username = null;
            state.password = null;
            state.confirmed = null;
            state.isSuccess = false;
            state.SuccessData = null;
            state.errorData = null;
            state.isError = false;
        },
        addName(state, action) {
            state.username = action.payload;
        },
        addPassword(state, action) {
            state.password = action.payload;
        },
        addConfirmed(state, action) {
            state.confirmed = action.payload;
        },
        addToken(state, action) {
            state.resettoken = action.payload;
        },
        authenSuccess(state,action){
            state.isLoading = false;
            state.isSuccess = true;
            state.errorData = null;
            state.isError = false;
            state.resettoken = null;
            state.SuccessData = action.payload;
        },
        reFailed(state,action){
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.errorData = action.payload;
            state.SuccessData = null;
        },
      
    }
});

export const reducer = slice.reducer;

export const postRegis = (user, router) => async dispatch => {
    dispatch(slice.actions.authenPending())
   // console.log(user)
    axios.request({
        method: "POST",
        url: 'https://shopee-api.deksilp.com/api/createUser',
        data: user,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
     })
     .then(function (response) {
    
        if (response.status === 201) {

            dispatch(slice.actions.authenSuccess(response.data.message))
            dispatch(getUserAuthen(user))

            Swal.fire({
                title: 'เข้าสุ่ระบบสำเร็จ',
                icon: 'success',
                timer: 2000
              })
            
        } else {
        console.log(response, 'ไม่มี status 201')
        return Promise.reject(response);
        }
       
     })
     .catch((response) => {
       // console.log('@@@Login error :: ',JSON.stringify(response))
        dispatch(slice.actions.reFailed(response.msg))
       
     })
    
}

export default slice;
