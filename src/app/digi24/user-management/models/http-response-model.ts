export class HttpResponseModel<T>{
    public responseMessage:string;
    public responseData:T;
    public isFaulted:boolean;
  }