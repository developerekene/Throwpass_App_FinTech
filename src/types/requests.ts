export interface TransferToSanwoRequest{
    "mobile": string;
    "amount": number;
    "wallet_pin": string;
}

export interface TransferToBankRequest{
    "amount": number;
    "bank_name": string;
    "account_number": string;
    "account_name": string;
    "bank_code": string;
    "wallet_pin": string;
}

export interface CreateUserRequest{
    first_name: string;
    last_name: string;
    mobile: string;
    gender: string;
    occupation: string;
    address: string;
    profile_photo: any;
    wallet_pin: string;
}

export interface RegisterUserRequest{
    user_type: string;
    first_name: string;
    last_name: string;
    mobile: string;
    gender: string;
    // wallet_pin: string;
    password: string;
    confirm_password: string;
}

export interface PersonalWithdrawalRequest{
    "amount": string;
    "wallet_pin": string;
}

export interface AccountNameRequest{
    "account_number": string;
    "bank_code": string;
}

export interface PayBillRequest{
    customer: string;
    amount: string;
    type: string;
}

export interface AirtimeRequest{
    mobile: string;
    amount: string;
}

export interface DataSubscriptionRequest{
    mobile: string;
    type: string;
    amount: string;
}

export interface PersonalSavingsRequest{
    "savings_type": string;
    "amount": number;
    "wallet_pin": string;
}

export interface UpdatePinRequest{
    "wallet_pin": string;
    "mobile": string;
}

export interface CreatePinRequest{
    "wallet_pin": string;
}

export interface ChangePasswordRequest{
    old_password: string;
    new_password: string;
    new_password2: string;
}

export interface TopUpRequest{
    amount: number;
}
export interface LoanRequest{
customer_name?:string;
customer_phone?: string;
customer_address?: string;
bank_name?:string;
account_number?:string;
bvn?:string,
company_name?: string;
hr_name?: string;
hr_phone?: string
}

export interface CustomerApplyForLoanRequest{
    principal_amount?:string;
    duration?:string
}
