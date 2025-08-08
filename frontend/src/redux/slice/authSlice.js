import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { toast } from "react-toastify";

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

export const updateProfile= createAsyncThunk('/update',async(formData,{rejectWithValue})=>{
    try{
        // console.log("Form Data from modal ",formData);
        const response = await userAxios.put("/update",formData);
        const data= response.data.student;
        // console.log("Response from Server ",data);
        return data;
    }catch(err){
      console.log("Response from server",err);
        return rejectWithValue(err.response?.data?.message||"Updation of Data failed");
    }
})

export const loginUser= createAsyncThunk("/login",async(credential,{rejectWithValue})=>{
    try {
        
        // console.log("Create Response",credential);
        const response = await userAxios.post("/login", credential);        
        const {data,token}= response.data.userDat;      
        setAuthToken(token);        
        return {data,token};
    }catch(err){
        console.log("Response from server",err);
        return rejectWithValue(err.response?.data?.message||"Login Failed");
    }   
})


    export const updateProfileImage = createAsyncThunk(
        '/upload',async (formData, thunkAPI) => {
            try {
                // console.log("Form Data ", formData);
            const res = await userAxios.put('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            const result= res.data;
            console.log("Respose from sercver ", result);
            // toast.success(res.data.message);
            return res.data.profileimageurl;
            } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Upload failed");
            }
        }
        );

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
       setUser: (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      },
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
        state.isAuthenticated=true;
        state.token = action.payload.token;
        state.isAuthenticated  = true;
        state.error=false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated=false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated=false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = false;
        state.user = action.payload.student
        state.token = null;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated=false;
      })
         .addCase(updateProfileImage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated=true;
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        if (state.user) {
          state.user.profileimageurl = action.payload;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
        .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        if(state.user) state.user= action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
})

export const {logout,clearError,setUser}=authSlice.actions;
export default authSlice.reducer;