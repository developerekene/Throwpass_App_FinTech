import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersonalWithdrawalState } from "../../Components/forms/PersonalWithdrawalForm";
import { ToBankFormState } from "../../Components/forms/ToBankAccountForm";
import { ToSanwoFormState } from "../../Components/forms/ToSanwoPayForm";
import { ConfirmRouteProps } from "../../screens/ConfirmScreen";


export interface ReceiptState{
    [index: string] : any;
}

let initState: ReceiptState = {};
export const receiptSlice = createSlice({
    name: 'receipt',
    initialState: initState,
   
    reducers: {
        loadState: (state, action: PayloadAction<ReceiptState>)=>{
            return action.payload;
        },

        resetState: (state)=>{
            return{}
        }
    },
});

export const { loadState, resetState } = receiptSlice.actions;

const receiptReducer = receiptSlice.reducer;

export default receiptReducer;
