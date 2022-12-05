import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AirtimeFormState } from "../../Components/forms/AirtimeForm";
import { DataSubscriptionFormState } from "../../Components/forms/DataSubscriptionForm";
import { PersonalSavingsState } from "../../Components/forms/PersonalSavingsForm";
import { PersonalWithdrawalState } from "../../Components/forms/PersonalWithdrawalForm";
import { PhcnFormState } from "../../Components/forms/PhcnForm";
import { ToBankFormState } from "../../Components/forms/ToBankAccountForm";
import { ToSanwoFormState } from "../../Components/forms/ToSanwoPayForm";
import { TvSubscriptionFormState } from "../../Components/forms/TvSubscriptionForm";
import { ConfirmRouteProps } from "../../screens/ConfirmScreen";
import { PayBillRequest } from "../../types/requests";


interface ConfirmationState{
    walletState?: ToSanwoFormState;
    bankState?: ToBankFormState;
    personalWithdrawalState?: PersonalWithdrawalState;
    billRequest?: PayBillRequest;
    airtimeState?: AirtimeFormState;
    dataSubState?: DataSubscriptionFormState;
    personalSavingsState?: PersonalSavingsState;
}

let initState: ConfirmationState = {};
export const confirmSlice = createSlice({
    name: 'confirm',
    initialState: initState,
   
    reducers: {
        loadSanwoState: (state, action: PayloadAction<ToSanwoFormState>)=>{
            return{
                ...state,
                walletState: action.payload
            }
        },

        loadBankState: (state, action: PayloadAction<ToBankFormState>)=>{
            return{
                ...state,
                bankState: action.payload
            }
        },

        loadPersonalWithdrwalState:(state, action: PayloadAction<PersonalWithdrawalState>)=>{
            return{
                ...state,
                personalWithdrawalState: action.payload
            }
        },

        loadTvSubscriptionState:(state, action: PayloadAction<TvSubscriptionFormState>)=>{
            let request: PayBillRequest = {
                customer: action.payload.phoneNumber?.toString() || '',
                amount: action.payload.amount?.toString() || '',
                type: action.payload.plan || ''
            }
            return{
                ...state,
                billRequest: request
            }
        },

        loadPhcnState:(state, action: PayloadAction<PhcnFormState>)=>{
            let request: PayBillRequest = {
                customer: action.payload.phoneNumber?.toString() || '',
                amount: action.payload.amount?.toString() || '',
                type: action.payload.disco || ''
            }
            return{
                ...state,
                billRequest: request
            }
        },

        loadAirtimeState:(state, action: PayloadAction<AirtimeFormState>)=>{
            return{
                ...state,
                airtimeState: action.payload
            }
        },

        loadDataSubscriptionState:(state, action: PayloadAction<DataSubscriptionFormState>)=>{
            return{
                ...state,
                dataSubState: action.payload
            }
        },

        loadPersonalSavingsState: (state, action: PayloadAction<PersonalSavingsState>)=>{
            return{
                ...state,
                personalSavingsState: action.payload
            }
        },

        resetStates: (state)=>{
            return{
                ...state,
                walletState: undefined,
                bankState: undefined,
                billRequest: undefined,
            }
        }
    },
});

export const { 
    loadSanwoState, loadBankState, resetStates, loadPhcnState,
    loadPersonalWithdrwalState, loadTvSubscriptionState, loadAirtimeState,
    loadDataSubscriptionState, loadPersonalSavingsState
} = confirmSlice.actions;

const confirmReducer = confirmSlice.reducer;

export default confirmReducer;
