import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface ShareState{
    receiptPath?: string;
}
let initState: ShareState = {};

export const shareSlice = createSlice({
    name: 'share',
    initialState: initState,
   
    reducers: {
        loadReceipt: (state, action: PayloadAction<string>)=>{
            return{
                ...state,
                receiptPath: action.payload
            }
        }
    },
});

export const { loadReceipt } = shareSlice.actions;

const shareReducer = shareSlice.reducer;

export default shareReducer;
