import { KeyboardTypeOptions} from "react-native";
import { AirtimeFormState } from "../Components/forms/AirtimeForm";
import { DataSubscriptionFormState } from "../Components/forms/DataSubscriptionForm";
import { PersonalSavingsState } from "../Components/forms/PersonalSavingsForm";
import { PersonalWithdrawalState } from "../Components/forms/PersonalWithdrawalForm";
import { PhcnFormState } from "../Components/forms/PhcnForm";
import { ToBankFormState } from "../Components/forms/ToBankAccountForm";
import { ToSanwoFormState } from "../Components/forms/ToSanwoPayForm";
import { TvSubscriptionFormState } from "../Components/forms/TvSubscriptionForm";
import { ConfirmRouteProps } from "../screens/ConfirmScreen";

type InputType = 'text' | 'number' | 'email' | 'phone'
export function mapTypeToKeyboardType(type:InputType): KeyboardTypeOptions {
    type KeyMaps = {
        text: KeyboardTypeOptions;
        number: KeyboardTypeOptions;
        email: KeyboardTypeOptions;
        phone: KeyboardTypeOptions;
    }
    let map: KeyMaps = {
        text: 'default',
        'number': 'number-pad',
        'email': 'email-address',
        'phone': 'phone-pad'
    }

    return map[type];
}


export interface BankFormState extends ToBankFormState{
    fee?: number;
}
export function mapBankStateToConfirmState(state?:BankFormState, reference?: string ) {
    let confirmState: ConfirmRouteProps = {};
    if (state) {
        confirmState.amount = state.amount?.toString();
        confirmState.beneficiary  = state.acctName;
        confirmState.numberLabel = 'Account Number: '
        confirmState.numberValue = state.acctNo?.toString();
        confirmState.refNum = reference;
        confirmState.state = 'bank';
        confirmState.meta = {
            'Service Charge': state.fee?.toString(),
            Bank: state.bankLabel,
        }
    }

    return confirmState;
}

export function mapSanwoStateToConfirmState(state?:ToSanwoFormState) {
    let confirmState: ConfirmRouteProps = {};
    if (state) {
        confirmState.amount = state.amount?.toString();
        confirmState.beneficiary  = state.fullName;
        confirmState.numberLabel = 'Phone Number: '
        confirmState.numberValue = state.phoneNumber?.toString();
        confirmState.state = 'wallet';
    }

    return confirmState;
}

export function mapPersonalWithdrawalStateToConfirmState(state?:PersonalWithdrawalState, 
    mobile?: string) {
    let confirmState: ConfirmRouteProps = {};
    if (state) {
        confirmState.amount = state.amount?.toString();
        //confirmState.beneficiary  = state.beneName;
        confirmState.numberLabel = mobile? 'Phone Number: ' : '';
        confirmState.numberValue = mobile;
        confirmState.state = 'personal withdrawal';
    }

    return confirmState;
}

export function mapTvSubscriptionStateToConfirmState(state?: TvSubscriptionFormState, name?: string ) {
    let confirmState: ConfirmRouteProps = {};
    if (state) {
        confirmState.amount = state.amount?.toString();
        confirmState.beneficiary  = name
        confirmState.numberLabel = 'Card Number: ',
        confirmState.numberValue = state.cardNumber?.toString(),
        confirmState.state = 'bill';
        confirmState.meta = {
            'Package': state.package,
            'Plan': state.plan
        }
    }

    return confirmState;
}

export function mapPhcnFormStateToConfirmState(state?: PhcnFormState, name?: string ) {
    let confirmState: ConfirmRouteProps = {};
    if (state) {
        confirmState.amount = state.amount?.toString();
        confirmState.beneficiary  = name
        confirmState.numberLabel = 'Meter Number: ',
        confirmState.numberValue = state.meterNumber?.toString(),
        confirmState.state = 'bill';
        confirmState.meta = {
            'Disco': state.disco,
        }
    }

    return confirmState;
}

export function mapAirtimeStateToConfirmState(state?: AirtimeFormState, name?: string ) {
    let confirmState: ConfirmRouteProps = {};
    if (state) {
        confirmState.amount = state.amount?.toString();
        confirmState.beneficiary = name
        confirmState.numberLabel = 'Phone Number: ',
        confirmState.numberValue = state.phoneNumber?.toString(),
        confirmState.state = 'airtime';
        confirmState.meta = {
            'Network': state.operator?.toUpperCase()
        }
    }

    return confirmState;
}

export function mapDataSubcriptionStateToConfirmState(state?: DataSubscriptionFormState, name?: string ) {
    let confirmState: ConfirmRouteProps = {};
    if (state) {
        confirmState.amount = state.amount?.toString();
        confirmState.beneficiary = name
        confirmState.numberLabel = 'Phone Number: ',
        confirmState.numberValue = state.phoneNumber?.toString(),
        confirmState.state = 'data';
        confirmState.meta = {
            'Network': state.operator?.toUpperCase(),
            'Plan': state.package
        }
    }

    return confirmState;
}

export function mapPersonalSavingsStateToConfirmState(state?: PersonalSavingsState, mobile?: string) {
    let confirmState: ConfirmRouteProps = {};
    if (state) {
        confirmState.amount = state.amount?.toString();
        //confirmState.beneficiary = state.beneName
        confirmState.numberLabel = mobile? 'Phone Number: ' : '';
        confirmState.numberValue = mobile;
        confirmState.state = 'personal savings';
    }

    return confirmState;
}

export const isEmpty = (value: string)=>{
    if (/^\s*$/.test(value)){
        return true;
    }
    if (value.length === 0){
        return true;
    }
    return false;
}