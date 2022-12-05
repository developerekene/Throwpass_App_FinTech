import axios, { AxiosResponse } from "axios";
import useSWRNative from '@nandorojo/swr-react-native';
import * as Keychain from 'react-native-keychain';
import { BankResponse, ProfileResponse } from "../types/responses";



// Use .env later
const basePath = 'https://sanwopay.com.ng/api/v1';

interface BankResult{
    data?: BankResponse;
    isLoading: any;
    isError: any;
  }
export function useBanks(): BankResult {
  const fetcher = (url: string) => axios.get(
    url,
  ).then((res: AxiosResponse<BankResponse>) => res.data);

    const { data, error } = useSWRNative(`${basePath}/banks/`, fetcher)
  
    return {
      data: data,
      isLoading: !error && !data,
      isError: error
    }
}