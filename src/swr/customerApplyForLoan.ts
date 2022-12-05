import React from 'react'
import { objectTraps } from "immer/dist/internal";
import { LoanRequest } from "../types/requests";
import axios, { AxiosError, AxiosResponse } from "axios";
import { GeneralResult } from "../types/GeneralResult";
import { ApplyForLoanResponse } from "../types/responses";
import { CustomerApplyForLoanRequest } from '../types/requests';

export const customerApplyForLoan = (request:CustomerApplyForLoanRequest, token? : string) => {
    let form = new FormData()

    for(let key in request){
       if(Object.prototype.hasOwnProperty.call(request,key)){
        form.append(key,request[key as keyof CustomerApplyForLoanRequest])
       }
        
    }

    
    const WillApplyForLoan: Promise<GeneralResult<ApplyForLoanResponse>>= new Promise((resolve)=> {
        axios.post('http://localhost/api/v1/loans/apply/', form,{
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
