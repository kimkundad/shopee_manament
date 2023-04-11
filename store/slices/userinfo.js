import React, { useState } from 'react';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import Router from "next/router";


const initialState = {
    isLoading: false,
    data:null,
    dataBiller:null,
    isError:false,
    errorData: null,
};

const slice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        getUserPending(state,action){
            state.isLoading = true;
            state.data = null;
            state.isError = false;
            state.errorData = null;
        },
        getUserSuccess(state,action){
            state.isLoading = false;
            state.data = action.payload;
        },
        getUserFailed(state,action){
            state.isLoading = false;
            state.isError = true;
            state.errorData = action.payload;
        },
        userReset(state,action){
            state.isLoading = false;
            state.data = null;
            state.isError = false;
            state.errorData = null;
        },
        nameChange(state,action){
            // state.data = {...action.payload}
            state = {
                ...state,
               data: action.payload
            }
        }
    }
});

export const reducer = slice.reducer;


export const getUserInfo = (router) => async (dispatch, getState) => {
    dispatch(slice.actions.getUserPending())

    const { authen }  = getState()
    
    axios.request({
        method: "GET",
        url: 'https://shopee-api.deksilp.com/api/auth/user-profile',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization":`Bearer ${authen.token}`
        },
     })
     .then(function (response) {
       //  console.log(response)
        if (response.status == 200) {
            console.log('มีข้อมูลนะ')
          //  location.href = '/profile';  
           dispatch(slice.actions.getUserSuccess(response.data))
        
        } else {
        console.log('ไม่มี status 200')
        router.push('/error')
        }
     })
     .catch((response) => {
        console.log(response)
        dispatch(slice.actions.getUserFailed(JSON.stringify(response)))
     })

}


export default slice;
