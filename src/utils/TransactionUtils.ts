import { ReceiptState } from "../redux/slices/receiptSlice";
import { TransactionHistoryResponseData } from "../types/responses";
import { formatAmount, formatDate } from "./GeneralUtils";

import RNHTMLtoPDF from 'react-native-html-to-pdf-lite';
import { sanwoLogo } from "./sanwo-logo";

export async function createPDF(options: RNHTMLtoPDF.Options) {
    let file = await RNHTMLtoPDF.convert(options)
    return file;
}

export function formatReference(ref: string) {
    let regex = new RegExp('Sanwopay-', 'g');
    let newRef = ref.replace(regex, '');
    return newRef;
}

export function renderMeta(obj?: TransactionHistoryResponseData){
    let displayArray: string[] = [];
    let keysToExclude = ['amount', 'to_user'];
    if (obj) {
        let info: ReceiptState = {
            'Type': obj.transType,
            'Bank': obj.bank_name,
            'Account number': obj.bank_account_number,
            'Date': formatDate(new Date(obj.date)),
            'Reference ID': obj.reference //formatReference(obj.reference),
        }
        for (const key in info) {
            if (Object.prototype.hasOwnProperty.call(info, key)) {
                const element = info[key];
                if (element) {
                    displayArray.push(
                        `<div class="numberDetails">
                            <p class="numberLabel">${key}</p>
                            <p class="numberValue">${element}</p>
                        </div>`
                    )
                }
            }
        }
    }

    return displayArray.join();
}

export function generateReceiptHtml(user?: string, amount?: string, params?:TransactionHistoryResponseData ) {
    
    return(
        `<style>
        .container{
            display: flex;
            flex: 1;
            align-self: stretch;
            flex-direction: column;
            background-color: transparent;
            height: 100%;
            background-image: ${sanwoLogo};
            background-size: cover;
            background-position: 50% -50%;
            background-repeat: no-repeat;
        }

        .beneNameText{
            font-weight: 600;
            line-height: 28px;
            letter-spacing: 0.75px;
            color: #6E7191;
        }
        .numberDetails{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
        .beneDetails{
            margin-top: 15%;
        }
        .amountLabel{
            font-weight: 600;
            line-height: 10px;
            letter-spacing: 0.75px;
            color: #14142B;
            font-size: 22px;
        }
        .numberLabel{
            font-weight: 500;
            line-height: 10px;
            letter-spacing: 0.75px;
            color: #6E7191;
            font-size: 22px;
        }
        .numberValue{
            font-weight: 400;
            line-height: 10px;
            letter-spacing: 0.75px;
            color: #6E7191;
            font-size: 22px;
        }
    </style>
            <div class="container">
                <div class="beneDetails">
                    <div>
                        <h1 class="beneNameText">
                            ${user}
                        </h1>
                    </div>
        
                    <!-- Meta -->
                    ${ renderMeta(params) }
                    
                    <!-- Amount -->
                    <div class="numberDetails">
                        <p class="amountLabel">Amount: </p>
                        <p class="amountLabel">₦ ${formatAmount(amount || '')}</p>
                    </div>
        
                </div>
            </div>`
    )
}