import * as React from "react";

export type ToastAction = (type: 'success' | 'info' | 'error', text1?: string, text2?: string)=> any;

const ToastContext = React.createContext<ToastAction | null>(null);

export default ToastContext;
