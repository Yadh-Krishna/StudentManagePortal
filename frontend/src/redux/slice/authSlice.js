import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const userAxios= axios.create({
    baseURL: "http://localhost:5213/user",
})

export const setAuthToken = (token)=>{
    if(token){
        userAxios.defaults.headers.common["Authorization"]=`Bearer ${token}`;
        localStorage.setItem("usertoken",token);
    }else{
        delete userAxios.defaults.headers.common["Authorization"];
        localStorage.removeItem("usertoken");
    }
}

export const loginUser= createAsyncThunk("/login",async(credential,{rejectWithValue})=>{
    try {
        
        // console.log("Create Response",credential);
        const response = await userAxios.post("/login", credential);        
        const {data,token}= response.data.userDat;
        console.log("Response from Server",token,data)    
        setAuthToken(token);        
        return {data,token};
    }catch(err){
        console.log("Response from server",err);
        return rejectWithValue(err.response?.data?.message||"Login Failed");
    }   
})

export const registerUser = createAsyncThunk("/register", async (userData, { rejectWithValue }) => {
  try {
    // delete userData.confirmPassword;
    const response = await userAxios.post("/register", userData);
    const { message, student } = response.data;      
    // console.log("Data from server", message, student);    
    // navigate('/user/login');
    return { message, student };
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Registration failed")
  }
});

const authSlice= createSlice({
    name:"auth",
    initialState:{
        user:null,
        token:null,
        isAuthenticated: false,
        loading:null,
        error:null,
    },
    reducers:{
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false
      state.error = null
      setAuthToken(null);
    },
        clearError: (state) => {
            state.error = null
        },
    },
     extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.isAuthenticated  = true;
        state.error=false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.student
        state.token = null;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const {logout,clearError}=authSlice.actions;
export default authSlice.reducer;