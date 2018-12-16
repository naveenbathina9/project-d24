export class HttpResponseModel<T> {
    public ResponseMessage: string;
    public ResponseData: T;
    public IsFaulted: boolean;
}
