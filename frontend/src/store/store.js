import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/userAuthSlice";

const store = configureStore({
    reducer :{
        auth:authSlice,
    }
})

export default store