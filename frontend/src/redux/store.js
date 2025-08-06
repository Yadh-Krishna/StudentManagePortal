import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import adminSlice from './slice/adminSlice';

export const store= configureStore({
    reducer:{
        auth:authSlice,
        admin:adminSlice,
    }
})