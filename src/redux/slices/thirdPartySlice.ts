import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BankResponseData } from "../../types/responses";


export interface ThirdPartyState{
    banks?: BankResponseData[]
}
let initState: ThirdPartyState = {};

export const thirdPartySlice = createSlice({
    name: 'thirdParty',
    initialState: initState,
   
    reducers: {
        loadBanks: (state, action: PayloadAction<BankResponseData[]>)=>{
            return{
                ...state, banks: action.payload
            }
        },
    },
});

export const { loadBanks } = thirdPartySlice.actions;

const thirdPartyReducer = thirdPartySlice.reducer;

export default thirdPartyReducer;
