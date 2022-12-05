import { AxiosError } from "axios";

export interface GeneralResult<T,E=T>{
    data?:T;
    error?:AxiosError<E>
}