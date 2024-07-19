// import { createSlice } from "@reduxjs/toolkit";
// import { fetchBanner } from "./moviesAsyncThunks";

// const initialState = {
//     loading:false,
//     error:'',
//     banner:[]
// }
// const moviesSlice = createSlice({
//     name:'movieDatabase',
//     initialState,
//     reducers:{
//         setLoading:(state,action)=>{
//             state.loading = action.payload
//         },
//         setError:(state,action)=>{
//             state.error = action.payload
//         }
//     },
//     extraReducers:(builders)=>{
//         builders.addCase(fetchBanner.pending,(state,action)=>{
//             state.loading = true 
//             state.error = ''
//             state.banner = []
//         })
//         .addCase(fetchBanner.fulfilled,(state,action)=>{
//             console.log(action);
//             state.loading=false
//             state.banner=action.payload
//         })
//         .addCase(fetchBanner.rejected,(state,action)=>{
//             state.loading = false; 
//             state.banner = []
//             state.error = action.payload || 'Error fetching data';
//         })


//     }

// })



// export default moviesSlice.reducer