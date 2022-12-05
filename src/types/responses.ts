export interface AuthResponseData{
    "token": string;
    "walletID": string;
    "mobile": string;
    "has_pin": boolean;
    "user_type": string;
}

export interface AuthResponse{
    "status": boolean;
    "message": string;
    "data"?: AuthResponseData
}

export interface GeneralResponse{
    "status": boolean;
    "message": string;
}

export interface ProfileResponseData{
    //"id": number;
    //"username"?: string;
    "email": string;
    "first_name": string;
    "last_name": string;
    //"middle_name": string;
    "gender": string;
    "mobile": string;
    "activate": true,
    "user_type": string;
    "address": string;
    "wallet_amount": number;
    "profile_photo":string;
    "has_pin_set":true;
}

export interface ProfileResponse{
    "status": boolean,
    "message": string,
    "data"?: [ProfileResponseData, { personal_savings: number; }]
}

export interface BankResponseData{
    name: string; code?: string | null
}

export interface BankResponse{
    "status": boolean;
    "message": string;
    "data"?: BankResponseData[];
}

export interface CustomerNameResponseData{
    "name": string;
    "mobile": string;
}

export interface CustomerNameResponse{
    "status": boolean;
    "message": string;
    "data": CustomerNameResponseData;
}

export interface TransactionHistoryResponseData{
    "id": number;
    "user": string;
    "to_user": string | null;
    "amount": string;
    "transType": string;
    "reference": string;
    "bank_name": string;
    "bank_account_number": string;
    "bank_account_name": string;
    "date": string;
    "time": string;
    "credit": boolean;   
}

export interface TransactionHistoryResponse extends GeneralResponse{
    data?: TransactionHistoryResponseData[];
}

export interface BillsResponseData{
    "country": string;
    "name": string;
    "is_airtime": boolean;
    "biller_name": string;
    "biller_code": string;
    "label_name": string;
    "item_code": string;
    "short_name": string;
    "amount": number;
}

export interface BillsResponse extends GeneralResponse{
    data?: BillsResponseData[];
}

export interface TransferToWalletData{
    "user": string;
    "to_user": string;
    "amount": number;
    "credit": boolean;
    "reference": string;
    "transType": string;
}

export interface TransferToWalletResponse extends GeneralResponse{
    data?: TransferToWalletData;
}

export interface AccountNameResponseData{
    "account_number": string;
    "account_name": string;
}

export interface AccountNameResponse extends GeneralResponse{
    data?: AccountNameResponseData;
}

export interface TransferToBankResponseData{
    "user": string;
    "amount": number;
    "credit": false;
    "bank_name": string;
    "bank_account_number": string;
    "bank_account_name": string;
    "reference": string;
    "transType": string;
}

export interface TransferToBankResponse extends GeneralResponse{
    data?: TransferToBankResponseData
}

export interface PersonalSavingsResponseData{
    "savings_type": string;
    "amount": number;
    "reference": string;
    "total_amount": number;
}

export interface PersonalSavingsResponse extends GeneralResponse{
    data?: PersonalSavingsResponseData
}

export interface PersonalWithdrawalResponseData{
    "user": string;
    "amount": string;
    "credit": boolean;
    "reference": string;
    "transType": string;
}

export interface PersonalWithdrwalResponse extends GeneralResponse{
    data?: PersonalWithdrawalResponseData;
}

export interface TopUpResponseData{
    link: string
}

export interface TopUpResponse extends GeneralResponse{
    data?: TopUpResponseData;
}

export interface FetchFeeResponse extends GeneralResponse{
    data?: number;
}

export interface FetchUserResponseData{
    "email": string;
    "first_name": string;
    "last_name": string;
    "gender": string;
    "mobile": string;
    "activate": boolean;
    "user_type": string;
    "address": string;
    "profile_photo": string;
    "occupation": string;
    "transactions": TransactionHistoryResponseData[];
}

export interface FetchUserResponse extends GeneralResponse{
    data?: FetchUserResponseData;
}

export interface PurchaseDataResponeData{
    "phone_number": string;
    "amount": number;
    "network": string;
    "flw_ref": string;
    "reference": string;
}

export interface PurchaseDataRespone extends GeneralResponse{
    data?: PurchaseDataResponeData;
}

export interface ApplyForLoanResponse{
    "status": boolean;
  "message": string;

}
 export interface CalculateInterestResponse{
    
        "status": boolean;
        "message": string;
        "data": {
            "repayment_amount": number;
            "interest_amount": number;
            "repayment_date": string;
            "interest": number;
            "loan_days": number;
            "amount": string;
        }
    
 }
 export interface SubmitLoanResponse{

    
        "status": boolean;
        "message": string,
        "data"?: {
          "principal_amount": number,
          "interest":  number,
          "loan_duration":  number,
          "total_amount":  number,
          "repayment_date": string,
          "loan_interest_percentage":  number,
          "remaining_balance":  number
        }
      
 }