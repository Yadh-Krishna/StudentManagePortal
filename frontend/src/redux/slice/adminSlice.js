import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const adminAxios = axios.create({
    baseURL: 'http://localhost:5213/admin',
})

// Token management utility
const setAdminToken = (token) => {
    if (token) {
        adminAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("admintoken", token);
    } else {
        delete adminAxios.defaults.headers.common["Authorization"];
        localStorage.removeItem("admintoken");
    }
}

// Initialize token from localStorage on app startup
const initializeToken = () => {
    const token = localStorage.getItem("admintoken");
    if (token) {
        setAdminToken(token);
        return token;
    }
    return null;
}

// Admin login
export const adminLogin = createAsyncThunk(
    '/login',
    async (formData, { rejectWithValue }) => {
        try {
            // console.log("Form Data ", formData);
            const response = await adminAxios.post('/login', formData);
            const { data, token } = response.data.obj;
            // console.log("Data from Server", token, data);
            setAdminToken(token);
            return { data, token };
        } catch (err) {
            console.log(err);
            return rejectWithValue(err.response?.data?.message || "Login Failed");
        }
    }
)

// Fetch users with search and pagination
export const fetchUsers = createAsyncThunk(
    '/fetchUsers',
    async ({ search = "" } = {}, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            
            const response = await adminAxios.get(`/dashboard?${params.toString()}`);
            const result = response.data.dashboard;
            
            return {
                users: result.students,
                total: result.totalStudents,
            };
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch users");
        }
    }
);

// Create new user
export const createUser = createAsyncThunk(
    '/createUser',
    async (userData, { rejectWithValue }) => {
        try {
            console.log("Creating user with data:", userData);
            const response = await adminAxios.post('/create', userData);
            const newUser = response.data.user || response.data;
            console.log("User created successfully:", newUser);
            return newUser;
        } catch (err) {
            console.log("Create user error:", err);
            return rejectWithValue(err.response?.data?.message || "Failed to create user");
        }
    }
)

// Update existing user
export const updateUser = createAsyncThunk(
    'admin/updateUser',
    async ({ id, userData }, { rejectWithValue }) => {
        try {
            console.log("Updating user:", id, "with data:", userData);
            const response = await adminAxios.put(`/users/${id}`, userData);
            const updatedUser = response.data.user || response.data;
            console.log("User updated successfully:", updatedUser);
            return { id, userData: updatedUser };
        } catch (err) {
            console.log("Update user error:", err);
            return rejectWithValue(err.response?.data?.message || "Failed to update user");
        }
    }
)

// Delete user
export const deleteUser = createAsyncThunk(
    'admin/deleteUser',
    async (userId, { rejectWithValue }) => {
        try {
            console.log("Deleting user:", userId);
            await adminAxios.delete(`/users/${userId}`);
            console.log("User deleted successfully:", userId);
            return userId;
        } catch (err) {
            console.log("Delete user error:", err);
            return rejectWithValue(err.response?.data?.message || "Failed to delete user");
        }
    }
)

// Get single user details
export const getUserById = createAsyncThunk(
    'admin/getUserById',
    async (userId, { rejectWithValue }) => {
        try {
            console.log("Fetching user details:", userId);
            const response = await adminAxios.get(`/users/${userId}`);
            const user = response.data.user || response.data;
            console.log("User details fetched:", user);
            return user;
        } catch (err) {
            console.log("Get user error:", err);
            return rejectWithValue(err.response?.data?.message || "Failed to fetch user details");
        }
    }
)

// Admin slice
const adminSlice = createSlice({
    name: "admin",
    initialState: {
        error: null,
        loading: false,
        isAuthenticated: false,
        adminUser: null,
        users: [],
        selectedUser: null,
        total: 0,
        // page: 1,
        // limit: 10,
        // totalPages: 0,
        searchTerm: "",
        token: initializeToken(), // Initialize token from localStorage
        // Loading states for different operations
        createLoading: false,
        updateLoading: false,
        deleteLoading: false,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
            // state.page = 1; // Reset to first page when searching
        },
        
        // setPage: (state, action) => {
        //     state.page = action.payload;
        // },
        
        // setLimit: (state, action) => {
        //     state.limit = action.payload;
        //     // state.page = 1; // Reset to first page when changing limit
        // },
        
        clearSelectedUser: (state) => {
            state.selectedUser = null;
        },
        
        logout: (state) => {
            state.adminUser = null;
            state.token = null;
            state.loading = false;
            state.error = null;
            state.isAuthenticated = false;
            state.users = [];
            state.selectedUser = null;
            state.total = 0;
            // state.page = 1;
            state.searchTerm = "";
            setAdminToken(null);
        },
    },
    
    extraReducers: (builder) => {
        builder
            // Admin Login
            .addCase(adminLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.error = null;
                state.isAuthenticated = true;
                state.loading = false;
                state.adminUser = action.payload.data;
                state.token = action.payload.token;
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.isAuthenticated = false;
            })
            
            // Fetch Users
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.users = action.payload.users;
                state.total = action.payload.total;
                // state.page = action.payload.page;
                // state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            
            // Create User
            .addCase(createUser.pending, (state) => {
                state.createLoading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.createLoading = false;
                state.error = null;
                // Optionally add the new user to the current list
                // state.users.unshift(action.payload);
                // state.total += 1;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.createLoading = false;
                state.error = action.payload;
            })
            
            // Update User
            .addCase(updateUser.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.error = null;
                // Update the user in the current list
                const index = state.users.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = { ...state.users[index], ...action.payload.userData };
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.payload;
            })
            
            // Delete User
            .addCase(deleteUser.pending, (state) => {
                state.deleteLoading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.error = null;
                // Remove the user from the current list
                state.users = state.users.filter(user => user.id !== action.payload);
                state.total = Math.max(0, state.total - 1);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.deleteLoading = false;
                state.error = action.payload;
            })
            
            // Get User By ID
            .addCase(getUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.selectedUser = action.payload;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const { 
    clearError, 
    logout, 
    setSearchTerm, 
    // setPage, 
    // setLimit, 
    clearSelectedUser 
} = adminSlice.actions;

export default adminSlice.reducer;






// ;import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
// import axios from 'axios';

// const adminAxios= axios.create({
//     baseURL: 'http://localhost:5213/admin',
// })

// const setAdminToken=(token)=>{
//       if(token){
//         adminAxios.defaults.headers.common["Authorization"]=`Bearer ${token}`;
//         localStorage.setItem("admintoken",token);
//     }else{
//         delete adminAxios.defaults.headers.common["Authorization"];
//         localStorage.removeItem("admintoken");
//     }
// }

// export const adminLogin=createAsyncThunk('/login',async(formData,{rejectWithValue})=>{
//     try{
//         // console.log("Form Data ",formData);
//         const response= await adminAxios.post('/login',formData);
//         const {data,token}=response.data.obj;
//         // console.log("data FRom Server", token,data);
//         setAdminToken(token);       
//         return {data,token};
//     }catch(err){
//         console.log(err);
//          return rejectWithValue(err.response?.data?.message||"Login Failed");
//     }
// })

// export const fetchUsers=createAsyncThunk('/dashboard',async(formData,{rejectWithValue})=>{
//     try{
//         console.log("FormData",formData);
//         const response= await adminAxios.get('/dashboard',formData);
//         const result=response.data.dashboard;
//         // result.token =localStorage.getItem("adminToken")
//         console.log("Response from Fetch ",result);             
//         return result;
//     }catch(err){
//         console.log(err);
//          return rejectWithValue(err.response?.data?.message||"Login Failed");
//     }
// })
// const adminSlice=createSlice({
//     name:"admin",
//     initialState:{
//         error:null,
//         loading:false,
//         isAuthenticated:false,
//         adminUser:"ADMIN",
//         users:[],
//          total: 0,
//         page: 1,
//         limit: 10,
//         totalPages: 0,
//         searchTerm: "", 
//         token:null
//     },
//     reducers:{
//         clearError:(state)=>{
//             state.error=null;
//         },
//          logout: (state) => {
//               state.adminUser = null;
//               state.token = null;              
//               state.loading = false
//               state.error = null
//               state.isAuthenticated=false;
//               setAdminToken(null);
//             },
//         },
//         extraReducers:(builders)=>{
//             builders
//             .addCase(adminLogin.pending,(state)=>{
//                 state.loading=true;
//                 state.error=null;
//             })
//             .addCase(adminLogin.fulfilled,(state,action)=>{
//                 state.error=null;
//                 state.isAuthenticated=true;
//                 state.loading=false;
//                 state.adminUser=action.payload.data;
//                 state.token = action.payload.token;
//             })
//             .addCase(adminLogin.rejected,(state,action)=>{
//                 state.error=action.payload;
//                 state.loading=false;
//                 state.isAuthenticated=false;                
//             })
//             .addCase(fetchUsers.pending,(state)=>{
//                 state.loading=true;
//                 state.error=null;
//                 state.isAuthenticated=true;
//             })
//             .addCase(fetchUsers.fulfilled,(state,action)=>{
//                 state.error=null;
//                 state.loading=false; 
//                 state.isAuthenticated=true;               
//                 state.token = action.payload.token;
//                 state.users = action.payload.students;
//                 state.total = action.payload.totalStudents;             

//             })
//             .addCase(fetchUsers.rejected,(state,action)=>{
//                 state.error=action.payload;
//                 state.loading=false;              
//             })

//         }
//     })

// export const {clearError,logout} = adminSlice.actions;
// export default adminSlice.reducer;



