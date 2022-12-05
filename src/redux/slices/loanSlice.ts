import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoanRequest } from "../../types/requests";
import { Saving } from "../../types/saving";
import { Auth, Profile } from "../../types/user";
import { CustomerApplyForLoanRequest } from "../../types/requests";



export interface LoanState{
    LoanRequest?: LoanRequest,
    
}


let initState: LoanState = {};
export const loanSlice = createSlice({
    name: 'loan',
    initialState: initState,
   
    reducers: {
        setLoanRequest: (state, action:PayloadAction<LoanRequest>)=>{
            return {
                ...state, LoanRequest: action.payload
            }
        },
        applyLoanRequest: (state, action:PayloadAction<LoanRequest>)=>{
            return {
                ...state, LoanRequest: action.payload
            }
        },

       
    },
});

export const { 
    setLoanRequest,
} = loanSlice.actions;
export const { applyLoanRequest}= loanSlice.actions

const loanReducer = loanSlice.reducer;

export default loanReducer;
