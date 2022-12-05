import axios, { AxiosError, AxiosResponse } from "axios";
import useSWRNative from '@nandorojo/swr-react-native';
import { CustomerNameResponse, BillsResponse, ProfileResponse, GeneralResponse, PurchaseDataRespone } from "../types/responses";
import { AirtimeRequest, DataSubscriptionRequest, PayBillRequest } from "../types/requests";
import { AirtimeFormState } from "../Components/forms/AirtimeForm";
import { DataSubscriptionFormState } from "../Components/forms/DataSubscriptionForm";

// Use .env later
const basePath = 'https://sanwopay.com.ng/api/v1';

interface DstvBillsResult{
    data?: BillsResponse;
    isLoading: any;
    isError: any;
}

interface PayBillResult{
  data?: GeneralResponse;  error?: AxiosError;
    response?: AxiosResponse;
}

interface PurchaseDataResult{
  data?: PurchaseDataRespone;  error?: AxiosError;
  response?: AxiosResponse;
}

export function useDstvBills(token?: string): DstvBillsResult {
    const fetcher = (url: string) => axios.get(
      url,
      { 
        headers:{
          'Authorization': token || ''
        } 
      }
    ).then((res: AxiosResponse<BillsResponse>) => res.data);
  
      const { data, error } = useSWRNative(`${basePath}/3rdParty/FLW/cable/dstv/`, fetcher)
    
      return {
        data: data,
        isLoading: !error && !data,
        isError: error
      }
}

export function useGotvBills(token?: string): DstvBillsResult {
    const fetcher = (url: string) => axios.get(
      url,
      { 
        headers:{
          'Authorization': token || ''
        } 
      }
    ).then((res: AxiosResponse<BillsResponse>) => res.data);
  
      const { data, error } = useSWRNative(`${basePath}/3rdParty/FLW/cable/gotv/`, fetcher)
    
      return {
        data: data,
        isLoading: !error && !data,
        isError: error
      }
}

export function useStartTimesBills(token?: string): DstvBillsResult {
    const fetcher = (url: string) => axios.get(
      url,
      { 
        headers:{
          'Authorization': token || ''
        } 
      }
    ).then((res: AxiosResponse<BillsResponse>) => res.data);
  
      const { data, error } = useSWRNative(`${basePath}/3rdParty/FLW/cable/starttimes/`, fetcher)
    
      return {
        data: data,
        isLoading: !error && !data,
        isError: error
      }
}

export function usePowerBills(token?: string): DstvBillsResult {
    const fetcher = (url: string) => axios.get(
      url,
      { 
        headers:{
          'Authorization': token || ''
        } 
      }
    ).then((res: AxiosResponse<BillsResponse>) => res.data);
  
      const { data, error } = useSWRNative(`${basePath}/3rdParty/FLW/bills/power/`, fetcher)
    
      return {
        data: data,
        isLoading: !error && !data,
        isError: error
      }
}

export function useMtnDataPackages(token?: string): DstvBillsResult {
  const fetcher = (url: string) => axios.get(
    url,
    { 
      headers:{
        'Authorization': token || ''
      } 
    }
  ).then((res: AxiosResponse<BillsResponse>) => res.data);

    const { data, error } = useSWRNative(`${basePath}/3rdParty/FLW/data/MTN/`, fetcher)
  
    return {
      data: data,
      isLoading: !error && !data,
      isError: error
    }
}
export function useAirtelDataPackages(token?: string): DstvBillsResult {
  const fetcher = (url: string) => axios.get(
    url,
    { 
      headers:{
        'Authorization': token || ''
      } 
    }
  ).then((res: AxiosResponse<BillsResponse>) => res.data);

    const { data, error } = useSWRNative(`${basePath}/3rdParty/FLW/data/Airtel/`, fetcher)
  
    return {
      data: data,
      isLoading: !error && !data,
      isError: error
    }
}
export function useGloDataPackages(token?: string): DstvBillsResult {
  const fetcher = (url: string) => axios.get(
    url,
    { 
      headers:{
        'Authorization': token || ''
      } 
    }
  ).then((res: AxiosResponse<BillsResponse>) => res.data);

    const { data, error } = useSWRNative(`${basePath}/3rdParty/FLW/data/GLO/`, fetcher)
  
    return {
      data: data,
      isLoading: !error && !data,
      isError: error
    }
}
export function use9moblileDataPackages(token?: string): DstvBillsResult {
  const fetcher = (url: string) => axios.get(
    url,
    { 
      headers:{
        'Authorization': token || ''
      } 
    }
  ).then((res: AxiosResponse<BillsResponse>) => res.data);

    const { data, error } = useSWRNative(`${basePath}/3rdParty/FLW/data/9mobile/`, fetcher)
  
    return {
      data: data,
      isLoading: !error && !data,
      isError: error
    }
}

export async function payBill(request?: PayBillRequest, token?: string) {

  let form = new FormData();
  for (let key in request) {
    form.append(key, request[key as keyof PayBillRequest])
  }

  console.log(request);

  const willPayBill: Promise<PurchaseDataResult> = new Promise((resolve)=>{
      axios.post(basePath + '/3rdParty/FLW/bills/pay/', form,
          {
              withCredentials: false,
              headers:{
                  "content-type": "multipart/form-data",
                  //'Cookie': cookies || '',
                  'Authorization': `Token ${token}` || '',
              }
              
          }
      ).then((response: AxiosResponse<PurchaseDataRespone>)=>{
          console.log(response.data);
          resolve({ data: response.data })

      }).catch((err: AxiosError | any)=>{
          console.log(JSON.stringify(err));
          resolve({ error: err })
      })
  })

  return willPayBill;
};

export async function buyAirtime(state?: AirtimeFormState, token?: string) {

  let request: AirtimeRequest = {
    mobile: state?.phoneNumber || '',
    amount: state?.amount?.toString() || ''
  }

  let form = new FormData();
  for (let key in request) {
    form.append(key, request[key as keyof AirtimeRequest])
  }

  console.log(request);

  const willBuyAirtime: Promise<PurchaseDataResult> = new Promise((resolve)=>{
      axios.post(basePath + '/3rdParty/FLW/airtime/pay/', form,
          {
              withCredentials: false,
              headers:{
                  "content-type": "multipart/form-data",
                  //'Cookie': cookies || '',
                  'Authorization': `Token ${token}` || '',
              }
              
          }
      ).then((response: AxiosResponse<PurchaseDataRespone>)=>{
          console.log(response.data);
          resolve({ data: response.data })

      }).catch((err: AxiosError | any)=>{
          console.log(JSON.stringify(err));
          resolve({ error: err })
      })
  })

  return willBuyAirtime;
};

export async function buyData(state?: DataSubscriptionFormState, token?: string) {

  let request: DataSubscriptionRequest = {
    mobile: state?.phoneNumber || '',
    amount: state?.amount?.toString() || '',
    type: state?.package || ""
  }

  let form = new FormData();
  for (let key in request) {
    form.append(key, request[key as keyof DataSubscriptionRequest])
  }

  console.log(request);

  const willBuyData: Promise<PurchaseDataResult> = new Promise((resolve)=>{
      axios.post(basePath + '/3rdParty/FLW/data/pay/', form,
          {
              withCredentials: false,
              headers:{
                  "content-type": "multipart/form-data",
                  //'Cookie': cookies || '',
                  'Authorization': `Token ${token}` || '',
              }
              
          }
      ).then((response: AxiosResponse<PurchaseDataRespone>)=>{
          console.log(response.data);
          resolve({ data: response.data })

      }).catch((err: AxiosError | any)=>{
          console.log(JSON.stringify(err));
          resolve({ error: err })
      })
  })

  return willBuyData;
};