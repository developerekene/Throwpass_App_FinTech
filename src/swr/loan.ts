import { objectTraps } from "immer/dist/internal";
import { CustomerApplyForLoanRequest, LoanRequest } from "../types/requests";
import axios, { AxiosError, AxiosResponse } from "axios";
import { GeneralResult } from "../types/GeneralResult";
import { ApplyForLoanResponse, CalculateInterestResponse, SubmitLoanResponse } from "../types/responses";

export function applyForLoan(request:LoanRequest, token? : string){
    let form = new FormData()

    for(let key in request){
       if(Object.prototype.hasOwnProperty.call(request,key)){
        form.append(key,request[key as keyof LoanRequest])
       }
        
    }
    const WillApplyForLoan: Promise<GeneralResult<ApplyForLoanResponse>>= new Promise((resolve)=> {
        axios.post('https://sanwopay.com.ng/api/v1/loans/submit-kyc/', form,{
            headers:{
                "content-type": "multipart/form-data",
                "Authorization": "Token "+ token

            }
        }).then((response: AxiosResponse<ApplyForLoanResponse>)=>{
            console.log(response.data)
            resolve({data:response.data})
        }).catch((e: AxiosError<ApplyForLoanResponse>)=>{
            console.log(JSON.stringify(e))
            resolve({error:e})

        })
    })
    
        return WillApplyForLoan
}
  
export function calculateInterest(amount: number,duration: number, token ?:string ){

    const WillCalculateInterest: Promise<GeneralResult<CalculateInterestResponse>>= new Promise((resolve)=> {
        axios.get(`https://sanwopay.com.ng/api/v1/loans/interest/?principal_amount=${amount}&duration=${duration}`, {
            headers:{
               
                "Authorization": "Token "+ token

            }
        }).then((response: AxiosResponse<CalculateInterestResponse>)=>{
            console.log(response.data)
            resolve({data:response.data})
        }).catch((e: AxiosError<CalculateInterestResponse>)=>{
            console.log(JSON.stringify(e))
            resolve({error:e})

        })
    })
    return  WillCalculateInterest

}
export function submitLoanRequest(request: CustomerApplyForLoanRequest, token?: string){
    let form = new FormData()

    for(let key in request){
       if(Object.prototype.hasOwnProperty.call(request,key)){
        form.append(key,request[key as keyof CustomerApplyForLoanRequest])
       }
        
    }
    const WillApplyForLoan: Promise<GeneralResult<SubmitLoanResponse>>= new Promise((resolve)=> {
        axios.post('https://sanwopay.com.ng/api/v1/loans/apply/', form,{
            headers:{
                "content-type": "multipart/form-data",
                "Authorization": "Token "+ token

            }
        }).then((response: AxiosResponse<SubmitLoanResponse>)=>{
            console.log(response.data)
            resolve({data:response.data})
        }).catch((e: AxiosError<SubmitLoanResponse>)=>{
            console.log(JSON.stringify(e))
            resolve({error:e})

        })
    })
    
        return WillApplyForLoan

}