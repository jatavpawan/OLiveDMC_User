export interface ResponseModel{
    data:any,
    message: string,
    status: Status
    error: string
}


export enum Status{
    Error,
    Success,
    Warning
}
