import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Saving } from "../../types/saving";
import { Auth, Profile } from "../../types/user";

export type LoggedStatus = 'loggedIn' | 'loggedOut';

export interface AuthState{
    isLogged?: boolean;
    loggedStatus?: LoggedStatus;
    savings?: Saving[];
    user?: Profile;
    auth?: Auth;
    cookies?: string;
}

let initState: AuthState = {};
export const authSlice = createSlice({
    name: 'auth',
    initialState: initState,
   
    reducers: {
        setLoginStatus: (state, action: PayloadAction<boolean>)=>{
            let status: LoggedStatus | undefined;
            if (!action.payload) {
                status = 'loggedOut'
            }
            return { ...state, isLogged: action.payload, loggedStatus: status }
        },

        setAuth: (state, action: PayloadAction<Auth>)=>{
            return { ...state, auth: action.payload }
        },

        clearAuth: (state)=>{
            return { ...state, auth: undefined }
        },

        setCookies: (state, action: PayloadAction<string>)=>{
            return { ...state, cookies: action.payload }
        },

        clearCookies: (state)=>{
            return { ...state, cookies: undefined }
        },

        loadSavings: (state, action: PayloadAction<Saving[]>)=>{
            return { ...state, savings: action.payload }
        },

        loadUser: (state, action: PayloadAction<Profile>)=>{
            return { ...state, user: action.payload }
        },
    },
});

export const { 
    setLoginStatus, loadSavings, loadUser, 
    setAuth, clearAuth, setCookies, clearCookies 
} = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
