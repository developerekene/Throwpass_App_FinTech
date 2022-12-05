import axios, { AxiosError, AxiosResponse } from "axios";
import useSWRNative from '@nandorojo/swr-react-native';
import * as Keychain from 'react-native-keychain';
import { AccountNameResponse, CustomerNameResponse, GeneralResponse, ProfileResponse } from "../types/responses";
import { NewUserRegistrationFormState } from "../Components/forms/NewUserRegistrationForm";
import { AccountNameRequest, ChangePasswordRequest, CreatePinRequest, CreateUserRequest, RegisterUserRequest, UpdatePinRequest } from "../types/requests";
import { EditProfileFormState } from "../Components/forms/EditProfileForm";
import { ChangePasswordFormState } from "../Components/forms/ChangePasswordForm";
import { RegistrationFormState } from "../Components/forms/RegistrationForm";



// Use .env later
const basePath = 'https://sanwopay.com.ng/api/v1';


interface ProfileResult{
  data?: ProfileResponse;
  isLoading: any;
  isError: any;
}
export function useProfile (token?: string, cookies?: string): ProfileResult {
  console.log("useProfile " + cookies );
  const fetcher = (url: string) => axios.get(
    url,
    { 
      withCredentials: true,
      headers:{
        'Authorization': `Token ${token}` || '',
        //'Cookie': cookies || '',
      } 
    }
  ).then((res: AxiosResponse<ProfileResponse>) => res.data);
    
    const { data, error } = useSWRNative(`${basePath}/user/profile/`, fetcher);
  
    return {
      data: data,
      isLoading: !error && !data,
      isError: error
    }
}

export function useSavings(token?: string) {
  const fetcher = (url: string) => axios.get(
    url,
    { 
      headers:{
        'Authorization': token || ''
      } 
    }
  ).then((res: AxiosResponse<ProfileResponse>) => res.data);

    const { data, error } = useSWRNative(`${basePath}/savings/customer/?customer_id=True`, fetcher)
  
    return {
      data: data,
      isLoading: !error && !data,
      isError: error
    }
}

interface NameResult{
  data?: CustomerNameResponse;
  error?: AxiosError;
}
export function fetchName(number?: string){
  console.log(number);

  const willFetchName: Promise<NameResult> = new Promise((resolve)=>{
    axios.get(`${basePath}/resolveCustomer?mobile=${number}`).
    then((res: AxiosResponse<CustomerNameResponse>)=>{
      console.log(res.data);
      resolve({ data: res.data })
    })
    .catch((err: AxiosError | any)=>{
      console.log(err);
      resolve({ error: err })
    })
  })
  
  return willFetchName;

}

interface AcctNameResult{
  data?: AccountNameResponse;
  error?: AxiosError;
}
export function fetchAcctName(number?: string, bank_code?: string){
  console.log(number);

  let request: AccountNameRequest | any = {
    account_number: number|| '',
    bank_code: bank_code || ''
  };

  let form = new FormData();
  for (let key in request) {
    form.append(key, request[key])
  }

  const willFetchAcctName: Promise<AcctNameResult> = new Promise((resolve)=>{
    axios.post(`${basePath}/utils/resolve_account_number/`, form). 
    then((res: AxiosResponse<AccountNameResponse>)=>{
      console.log(res.data);
      resolve({ data: res.data })
    })
    .catch((err: AxiosError | any)=>{
      console.log(err);
      resolve({ error: err })
    })
  })
  
  return willFetchAcctName;

}

interface CreateUserResult{
  data?: GeneralResponse;
  error?: AxiosError<any>;
}
export async function createUser(state?: NewUserRegistrationFormState, token?: string) {
  console.log(state);

  let names = state?.fullname?.split(' ');

  let request: CreateUserRequest | any = {
    first_name: names ? names[0] : '',
    last_name:  names ? names[names.length -1] : '',
    mobile: state?.mobile || '',
    gender: state?.gender || '',
    occupation: state?.occupation || '',
    address: state?.address || '',
    wallet_pin: state?.wallet_pin || '',
    profile_photo: {
      name: state?.profile_photo?.fileName,
      uri: state?.profile_photo?.uri,
      type: state?.profile_photo?.type
    }
  };

  let form = new FormData();
  for (let key in request) {
    form.append(key, request[key])
  }

  console.log(request);

  const willCreateUser: Promise<CreateUserResult> = new Promise((resolve)=>{
      axios.post(basePath + '/agent/create_customer/', form,
          {
              withCredentials: false,
              headers:{
                  "content-type": "multipart/form-data",
                  //'Cookie': cookies || '',
                  'Authorization': `Token ${token}` || '',
              }
              
          }
      ).then((response: AxiosResponse<GeneralResponse>)=>{
          console.log(response.data);
          resolve({ data: response.data })

      }).catch((err: AxiosError | any)=>{
          console.log(JSON.stringify(err));
          resolve({ error: err })
      })
  })

  return willCreateUser;
};

export async function editUser(state?: EditProfileFormState, token?: string) {
  console.log(state);


  let request: CreateUserRequest | any = {
    first_name: state?.firstName,
    last_name:  state?.lastName,
    mobile: state?.mobile || '',
    address: state?.address || '',
    profile_photo: {
      name: state?.profile_photo?.fileName,
      uri: state?.profile_photo?.uri,
      type: state?.profile_photo?.type
    }
  };

  let form = new FormData();
  for (let key in request) {
    form.append(key, request[key])
  }

  console.log(request);

  const willEditUser: Promise<CreateUserResult> = new Promise((resolve)=>{
      axios.patch(basePath + '/user/profile/', form,
          {
              withCredentials: false,
              headers:{
                  "content-type": "multipart/form-data",
                  //'Cookie': cookies || '',
                  'Authorization': `Token ${token}` || '',
              }
              
          }
      ).then((response: AxiosResponse<GeneralResponse>)=>{
          console.log(response.data);
          resolve({ data: response.data })

      }).catch((err: AxiosError | any)=>{
          console.log(JSON.stringify(err));
          resolve({ error: err })
      })
  })

  return willEditUser;
};


export async function registerUser(state?: RegistrationFormState, token?: string) {
  console.log(state);

  let names = state?.fullname?.split(' ');

  let request: RegisterUserRequest = {
    first_name: names ? names[0] : '',
    last_name: names ? names[names.length - 1] : '',
    mobile: state?.mobile || '',
    gender: state?.gender || '',
    //wallet_pin: state?.wallet_pin || '',
    user_type: "customer",
    password: state?.password || "",
    confirm_password: state?.confirm_password || "",
  };

  let form = new FormData();
  for (let key in request) {
    form.append(key, request[key as keyof RegisterUserRequest])
  }

  console.log(request);

  const willCreateUser: Promise<CreateUserResult> = new Promise((resolve)=>{
      axios.post(basePath + '/user/register/', form,
          {
              withCredentials: false,
              headers:{
                  "content-type": "multipart/form-data",
                  //'Cookie': cookies || '',
                  //'Authorization': `Token ${token}` || '',
              }
              
          }
      ).then((response: AxiosResponse<GeneralResponse>)=>{
          console.log(response.data);
          resolve({ data: response.data })

      }).catch((err: AxiosError | any)=>{
          console.log(JSON.stringify(err));
          resolve({ error: err })
      })
  })

  return willCreateUser;
};

export async function createPin(pin?: string, token?: string) {
  
  let request: CreatePinRequest = {
    wallet_pin: pin || '',
  };

  console.log(request);

  const willCreatePin: Promise<CreateUserResult> = new Promise((resolve)=>{
      axios.post(basePath + '/set-pin/', request,
          {
              withCredentials: false,
              headers:{
                  //"content-type": "multipart/form-data",
                  //'Cookie': cookies || '',
                  'Authorization': `Token ${token}` || '',
              }
          }
      ).then((response: AxiosResponse<GeneralResponse>)=>{
          console.log(response.data);
          resolve({ data: response.data })

      }).catch((err: AxiosError | any)=>{
          console.log(JSON.stringify(err));
          resolve({ error: err })
      })
  })

  return willCreatePin;
};

export async function updatePin(pin?: string, mobile?: string, token?: string) {
  
  let request: UpdatePinRequest = {
    wallet_pin: pin || '',
    mobile: mobile || ''
  };

  console.log(request);

  const willUpdatePin: Promise<CreateUserResult> = new Promise((resolve)=>{
      axios.post(basePath + '/update-pin/', request,
          {
              withCredentials: false,
              headers:{
                  //"content-type": "multipart/form-data",
                  //'Cookie': cookies || '',
                  'Authorization': `Token ${token}` || '',
              }
          }
      ).then((response: AxiosResponse<GeneralResponse>)=>{
          console.log(response.data);
          resolve({ data: response.data })

      }).catch((err: AxiosError | any)=>{
          console.log(JSON.stringify(err));
          resolve({ error: err })
      })
  })

  return willUpdatePin;
};

export async function changePassword(state?: ChangePasswordFormState, token?: string) {
  console.log(state);

  let request: ChangePasswordRequest = {
    old_password: state?.oldPassword || "",
    new_password: state?.newPassword || "",
    new_password2: state?.confirmPassword || "",
  };

  let form = new FormData();
  for (let key in request) {
    form.append(key, request[key as keyof ChangePasswordRequest])
  }

  console.log(request);

  const willChangePassword: Promise<CreateUserResult> = new Promise((resolve)=>{
      axios.post(basePath + '/change-password/', form,
          {
              withCredentials: false,
              headers:{
                  "content-type": "multipart/form-data",
                  //'Cookie': cookies || '',
                  'Authorization': `Token ${token}` || '',
              }
              
          }
      ).then((response: AxiosResponse<GeneralResponse>)=>{
          console.log(response.data);
          resolve({ data: response.data })

      }).catch((err: AxiosError <any>| any)=>{
          console.log(JSON.stringify(err));
          resolve({ error: err })
      })
  })

  return willChangePassword;
};