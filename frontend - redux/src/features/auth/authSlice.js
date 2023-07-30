import {createSlice} from '@reduxjs/toolkit';

const initialState = {
 status:'idle',
 token: null,
 user:null
}

export const authSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
         const {user, accessToken} = action.payload;
         state.user = user;
         state.token = accessToken;
        },

        logOut:(state,action)=>{
            state.user = null;
            state.token = null;   
        }
    }
});

export const {setCredentials, logOut} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => {state.auth.user}; 
export const selectCurrentToken = (state) => {state.auth.token}; 