import { createSlice } from "@reduxjs/toolkit";
import { login, logout, signup, userCheck } from "./userAsyncThunks";

const initialState = {
    email : '',
    isAuthenticated : false,
    error:''
}
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setAuthenticated:(state,action)=>{
            state.isAuthenticated = action.payload
        },
        clearError:(state)=>{
            state.error = ''
        },
        setEmail:(state,action)=>{
            state.email = action.payload
        },
        setError:(state,action)=>{
            state.error = action.payload
        }
        
    },
    extraReducers :(builder)=>{
        builder
        .addCase(login.pending,(state)=>{
            state.status = 'loading'
            state.error = ''
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.status = 'fulfilled'
            state.isAuthenticated = true;
            state.email = action.payload.user.email

        })
        .addCase(login.rejected,(state,action)=>{
            state.status = 'rejected'
            state.error = action.payload
        })
        .addCase(userCheck.pending,(state,action)=>{
            state.status = 'rejected'
            state.error = ''
        })
        .addCase(userCheck.fulfilled,(state,action)=>{
            state.status = 'fulfilled'
            state.userExists = action.payload.userExists
            state.error = ''
        })
        .addCase(userCheck.rejected,(state,action)=>{
            state.status = 'rejected'
            state.error = action.payload.error
        })
        .addCase(signup.pending,(state)=>{
            state.status = 'pending'
            state.error = ''
        })
        .addCase(signup.fulfilled,(state)=>{
            state.status = 'pending'
            state.error = ''
        })
        .addCase(signup.rejected,(state,action)=>{
            console.log(action);
            state.status = 'rejected'
            state.error = action.payload
        })
        .addCase(logout.fulfilled,(state)=>{
            localStorage.removeItem('isAuthenticated')
            return initialState
        })
        .addCase(logout.rejected,(state,action)=>{
            console.log(state,action);
        })
}
})
export const {setAuthenticated,clearError,setEmail,setError} = authSlice.actions
export default authSlice.reducer