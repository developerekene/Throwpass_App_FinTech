import axios, { AxiosError, AxiosResponse } from "axios";
import { GeneralResponse, TopUpResponse } from "../types/responses";
import { TopUpRequest } from "../types/requests";
import { AddBalanceFormState } from "../Components/forms/AddBalanceForm";

// Use .env later
export const basePath = 'https://sanwopay.com.ng/api/v1';

interface GeneralOpertaionResult{
    data?: GeneralResponse;
    error?: AxiosError;
    response?: AxiosResponse;
}

interface TopUpResult{
    data?: TopUpResponse;  error?: AxiosError;
    response?: AxiosResponse;
}
export async function topUpWallet(state: AddBalanceFormState, token?: string) {
    let request: TopUpRequest = {
        amount: Number.parseInt(state?.amount || '0')
    }
    console.log(request);

    const willTopUpWallet: Promise<TopUpResult> = new Promise((resolve)=>{
        axios.post(basePath + '/wallet/top-up/', request,
            {
                withCredentials: false,
                headers:{
                    'content-type': 'application/json',
                    //'Cookie': cookies || '',
                    'Authorization': `Token ${token}` || '',
                }
                
            }
        ).then((response: AxiosResponse<TopUpResponse>)=>{
            console.log(response.data);
            resolve({ data: response.data, response: response })

        }).catch((err: AxiosError | any)=>{
            console.log(err);
            resolve({ error: err })
        })
    });

    return willTopUpWallet;
}

export async function verifyPayment(reference: string) {
    console.log("Verifying... " + reference);
    const willVerifyPayment: Promise<GeneralOpertaionResult> = new Promise((resolve)=>{
        axios.get(`${basePath}/wallet/top-up/verify_payment/?reference=${reference}`).
        then((res: AxiosResponse<GeneralResponse>)=>{
          console.log(res.data);
          resolve({ data: res.data })
        })
        .catch((err: AxiosError | any)=>{
          console.log(JSON.stringify(err));
          resolve({ error: err })
        })
      })
      
    return willVerifyPayment;
    
}