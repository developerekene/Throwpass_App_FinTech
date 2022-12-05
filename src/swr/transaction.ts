import { LoginState } from "../Components/forms/LoginForm";
import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { AuthResponse, FetchFeeResponse, GeneralResponse, TransactionHistoryResponse, TransferToBankResponse, TransferToWalletResponse } from "../types/responses";
import { ToSanwoFormState } from "../Components/forms/ToSanwoPayForm";
import { TransferToBankRequest, TransferToSanwoRequest } from "../types/requests";
import useSWRNative from '@nandorojo/swr-react-native';
import { KeyedMutator } from "swr";
import { ToBankFormState } from "../Components/forms/ToBankAccountForm";

// Use .env later
export const basePath = 'https://sanwopay.com.ng/api/v1';

interface TransactionResult{
    data?: GeneralResponse;  error?: AxiosError;
    response?: AxiosResponse;
}
interface TransactionHistoryResult{
    data?: TransactionHistoryResponse;
    isLoading: any;
    isError: any;
    mutate?: KeyedMutator<TransactionHistoryResponse>;
}
interface WalletTransferResult{
  data?: TransferToWalletResponse; error?: AxiosError;
  response?: AxiosResponse;
}
interface BankTransferResult{
  data?: TransferToBankResponse; error?: AxiosError; response?: AxiosResponse
}
export function useTransactionHistory (token?: string): TransactionHistoryResult {
    const fetcher = (url: string) => axios.get(
      url,
      { 
        withCredentials: true,
        headers:{
          'Authorization': `Token ${token}` || '',
          //'Cookie': cookies || '',
        } 
      }
    ).then((res: AxiosResponse<TransactionHistoryResponse>) => res.data);
  
      const { data, error, mutate } = useSWRNative(`${basePath}/transactions/`, fetcher);

      if (error) {
        console.log(error);
      }
      return {
        data: data,
        isLoading: !error && !data,
        isError: error,
        mutate: mutate
      }
  } 

export async function transferToWallet(state?: ToSanwoFormState, token?: string, cookies?: string) {
    console.log(state);

    let request: TransferToSanwoRequest = {
        mobile: state?.phoneNumber || '',
        amount: state?.amount ? Number.parseFloat(state.amount.toString()) : 0,
        wallet_pin: state?.pin?.toString() || '',
    };

    console.log(request);

    const willTransferToWallet: Promise<WalletTransferResult> = new Promise((resolve)=>{
        axios.post(basePath + '/user/transferToCustomer/', request,
            {
                withCredentials: false,
                headers:{
                    'content-type': 'application/json',
                    //'Cookie': cookies || '',
                    'Authorization': `Token ${token}` || '',
                }
                
            }
        ).then((response: AxiosResponse<TransferToWalletResponse>)=>{
            console.log(response.data);
            resolve({ data: response.data, response: response })

        }).catch((err: AxiosError | any)=>{
            console.log(err);
            resolve({ error: err })
        })
    })

    return willTransferToWallet;
};

export async function transferToBank(state?: ToBankFormState, token?: string, cookies?: string) {
  console.log(state);

  let request: TransferToBankRequest = {
    account_number: state?.acctNo?.toString() || '',
    amount: state?.amount ? Number.parseFloat(state.amount.toString()) : 0,
    account_name: state?.acctName || '',
    bank_name: state?.bankLabel || '',
    bank_code: state?.bankName || '',
    wallet_pin: state?.pin?.toString() || '',
  };

  console.log(request);

  const willTransferToBank: Promise<BankTransferResult> = new Promise((resolve)=>{
      axios.post(basePath + '/user/transferToBank/', request,
          {
              withCredentials: false,
              headers:{
                  'content-type': 'application/json',
                  //'Cookie': cookies || '',
                  'Authorization': `Token ${token}` || '',
              }
              
          }
      ).then((response: AxiosResponse<TransferToBankResponse>)=>{
          console.log(response.data);
          resolve({ data: response.data, response: response })

      }).catch((err: AxiosError | any)=>{
          console.log(err);
          resolve({ error: err })
      })
  })

  return willTransferToBank;
};

export type TransctionType = 'ScanPay' | 'Transfer' | 'Top-Up' | 'Withdrawal';
interface FetchFeeResult{
  data?: FetchFeeResponse; error?: AxiosError; response?: AxiosResponse
}
export async function fetchFee(amount: string, transaction: TransctionType, token?: string) {
  console.log(basePath + `/transfer/fee?amount=${amount}&transaction=${transaction}`);
  const willFetchFee: Promise<FetchFeeResult> = new Promise((resolve)=>{
      axios.get(basePath + `/transfer/fee?amount=${amount}&transaction=${transaction}`,
          {
              withCredentials: false,
              headers:{
                  'Authorization': `Token ${token}` || '',
              }
              
          }
      ).then((response: AxiosResponse<FetchFeeResponse>)=>{
          console.log(response.data);
          resolve({ data: response.data, response: response })

      }).catch((err: AxiosError | any)=>{
          console.log(err);
          resolve({ error: err })
      })
  })

  return willFetchFee;
};