import { LoginState } from "../Components/forms/LoginForm";
import axios, { AxiosError, AxiosResponse } from "axios";
import { AuthResponse } from "../types/responses";

/**
 * Secrure storage references:
 * https://blog.logrocket.com/storing-credentials-using-react-native-keychain/
 */

// Use .env later
const basePath = 'https://sanwopay.com.ng/api/v1';

// Defaults
interface AuthenticationResult{
    data?: AuthResponse;  error?: AxiosError;
    response?: AxiosResponse;
}

export async function authenticateUser(state?: LoginState){
    console.log(state);

    const willAuthenticate: Promise<AuthenticationResult> = new Promise((resolve, reject)=>{
        axios.post(basePath + '/user/login/', state,
            {
                withCredentials: false,
                headers:{
                    'content-type': 'application/json'
                }
                
            }
        ).then((response: AxiosResponse<AuthResponse>)=>{
            console.log(response.data);
            resolve({ data: response.data, response: response })

        }).catch((err: AxiosError | any)=>{
            console.log(err);
            resolve({ error: err })
        })
    })

    return willAuthenticate;
}