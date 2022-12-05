export type SavingType = "Group Savings" | "Personal Savings" | "Installment Savings";


export interface Saving{
    "id"?: number | string;
    "amount"?: number | string;
    "saving_type"?: string;
    "customerID"?: number | string;
    "customerName"?: string;
    "date"?: string;
    "time"?: string;
}