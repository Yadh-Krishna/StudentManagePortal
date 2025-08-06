;import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const adminAxios= axios.create({
    baseURL: 'http://localhost:5213/admin',
})

const setAdminToken=(token)=>{
      if(token){
        adminAxios.defaults.headers.common["Authorization"]=`Bearer ${token}`;
        localStorage.setItem("admintoken",token);
    }else{
        delete adminAxios.defaults.headers.common["Authorization"];
        localStorage.removeItem("admintoken");
    }
}

export const adminLogin=createAsyncThunk('/login',async(formData,{rejectWithValue})=>{
    try{
        console.log("Form Data ",formData);
        const response= await adminAxios.post('/login',formData);
        const {data,token}=response.data.obj;
        console.log("data FRom Server", token,data);
        setAdminToken(token);       
        return {data,token};
    }catch(err){
        console.log(err)
    }
})
const adminSlice=createSlice({
    name:"admin",
    initialState:{
        error:null,
        loading:false,
        adminUser:null,
        users:[],
         total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
        searchTerm: "", 
        token:null
    },
    reducers:{
        clearError:(state)=>{
            state.error=null;
        },
        extraReducers:(builders)=>{
            builders
            .addCase(adminLogin.pending,(state)=>{
                state.loading=true;
                state.error=null;
            })
            .addCase(adminLogin.fulfilled,(state,action)=>{
                state.error=null;
                state.loading=false;
                state.adminUser=action.payload.data;
                state.token = action.payload.token;
            })
            .addCase(adminLogin.rejected,(state,action)=>{
                state.error=action.payload;
                state.loading=false;                
            })

        }
    }
})

export const {clearError} = adminSlice.actions;
export default adminSlice.reducer;