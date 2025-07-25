export interface HttpHeaders {
  [key: string]: string;
}

export interface HttpParams {
  [key: string]: string | number | boolean;
}

export interface HttpResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: HttpHeaders;
}

export interface HttpError {
  response?: {
    data: any;
    status: number;
    statusText: string;
    headers: HttpHeaders;
  };
  message: string;
  code?: string;
}
