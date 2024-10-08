import {createSlice} from '@reduxjs/toolkit';


const initialState = {
 userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
};

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            state.userInfo = action.payload.userInfo;
            localStorage.setItem('userInfo', JSON.stringify(action.payload.userInfo));
            },
           
            logout:(state)=>{
             localStorage.removeItem('userInfo');
             state.userInfo = null;
            }    
    }
});

export const {setCredentials, logout} = authSlice.actions;

export default authSlice.reducer;