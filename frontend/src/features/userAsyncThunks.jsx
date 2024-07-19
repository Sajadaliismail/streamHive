import { createAsyncThunk } from "@reduxjs/toolkit";
const port = process.env.REACT_APP_CORS;
export const login = createAsyncThunk(
    'auth/login',
    async (userData,{rejectWithValue,dispatch})=>{
        console.log(port);
        console.log(process.env);
        try {
            const response = await fetch(`${port}/login`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(userData),
            })
            console.log(response)
            const data = await response.json()
            if(!response.ok){
               return rejectWithValue(data.error)
            }
            localStorage.setItem('isAuthenticated',JSON.stringify(true))
            return data
        } catch (error) {
            console.log(error);
            rejectWithValue(error.error)
        }
    }
)

export const userCheck = createAsyncThunk(
    'auth/usercheck',
    async (userData)=>{
        try {
            const response = await fetch(`${port}/checkuser`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(userData),
            })
            const data = await response.json()
            return data
        } catch (error) {

        }
    }
)

export const signup = createAsyncThunk(
    'auth/signup',
    async (userData,{rejectWithValue})=>{
        try {
         const response = await fetch(`${port}/signup`,{
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(userData)
         })
         const data = await response.json()
        if(data.error){
            return rejectWithValue(data.error)
        }
         return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.error)
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async ()=>{
        try {
            const response =await fetch(`${port}/logout`,{
                method:'POST'
            })
            const data = await response.json()
            console.log(data);
            return data
        } catch (error) {
            console.log(error);
        }
    }
)