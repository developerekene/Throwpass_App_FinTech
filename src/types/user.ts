import { ProfileResponseData } from "./responses";

export interface Auth{
    mobile: string | number;
    token: string;
}

export interface Profile extends ProfileResponseData{
}