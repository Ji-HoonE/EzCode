export interface IRequestConfig extends RequestInit {
    params?: Record<string, string>;
}

export interface IApiResponse<T = unknown> {
    status: number;
    data: T;
    error?: string;
}

export interface IRequestInterceptorConfig {
    headers?: HeadersInit;
    [key: string]: unknown;
}

export interface IResponseInterceptorConfig<T> {
    response: Response;
    data?: T;
}