import axios, { AxiosError, AxiosResponse } from "axios";
import { AuthResponse, GeneralResponse, PersonalSavingsResponse, PersonalWithdrwalResponse, TransactionHistoryResponse } from "../types/responses";
import { PersonalSavingsRequest, PersonalWithdrawalRequest, TransferToBankRequest, TransferToSanwoRequest } from "../types/requests";
import useSWRNative from '@nandorojo/swr-react-native';
import { KeyedMutator } from "swr";
import { PersonalWithdrawalState } from "../Components/forms/PersonalWithdrawalForm";
import { PersonalSavingsState } from "../Components/forms/PersonalSavingsForm";

// Use .env later
export const basePath = 'https://sanwopay.com.ng/api/v1';

interface WithdrawalResult{
    data?: PersonalWithdrwalResponse;  error?: AxiosError;
    response?: AxiosResponse;
}
export async function withdrawFromPersonalSavings(state?: PersonalWithdrawalState, token?: string) {
    console.log(state);

    let request: PersonalWithdrawalRequest = {
        amount: state?.amount?.toString() || '',
        wallet_pin: state?.pin?.toString() || '',
    };

    console.log(request);

    const willWithdraw: Promise<WithdrawalResult> = new Promise((resolve)=>{
        axios.post(basePath + '/savings/personal/withdraw-to-wallet/', request,
            {
                withCredentials: false,
                headers:{
                    'content-type': 'application/json',
                    //'Cookie': cookies || '',
                    'Authorization': `Token ${token}` || '',
                }
                
            }
        ).then((response: AxiosResponse<PersonalWithdrwalResponse>)=>{
            console.log(response.data);
            resolve({ data: response.data, response: response })

        }).catch((err: AxiosError | any)=>{
            console.log(err);
            resolve({ error: err })
        })
    })

    return willWithdraw;
};

interface PersonalSavingsResult{
    data?: PersonalSavingsResponse;  error?: AxiosError;
    response?: AxiosResponse;
}
export async function transferToPersonalSavings(state?: PersonalSavingsState, token?: string, ) {
    console.log("INIT STATE: " + JSON.stringify(state));

    let request: PersonalSavingsRequest = {
        wallet_pin: state?.pin?.toString() || '',
        savings_type: 'personal',
        //customer: state?.mobile?.toString() || '',
        amount: Number.parseFloat(state?.amount?.toString() || '')
    };

    console.log("PREPARED REQUEST: " + JSON.stringify(request));

    const willTransferToSavings: Promise<PersonalSavingsResult> = new Promise((resolve)=>{
        axios.post(basePath + '/savings/personal/', request,
            {
                withCredentials: false,
                headers:{
                    'content-type': 'application/json',
                    //'Cookie': cookies || '',
                    'Authorization': `Token ${token}` || '',
                }
                
            }
        ).then((response: AxiosResponse<PersonalSavingsResponse>)=>{
            console.log("RESOLVED RESPONSE: " + JSON.stringify(response.data));
            resolve({ data: response.data, response: response })

        }).catch((err: AxiosError | any)=>{
            console.log("RESOLVED ERR: " + JSON.stringify(err));
            resolve({ error: err })
        })
    })

    return willTransferToSavings;
};