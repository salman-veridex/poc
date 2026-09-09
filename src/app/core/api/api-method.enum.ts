export enum APIMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export enum APIResponseType {
  JSON = 'json',
  TEXT = 'text',
  BLOB = 'blob',
  ARRAY_BUFFER = 'arraybuffer'
}

export interface ApiRequestOptions {
  body?: unknown;
  params?: Record<string, string | number | boolean | null | undefined>;
  headers?: Record<string, string>;
  responseType?: APIResponseType;
  withCredentials?: boolean;
  timeout?: number;
}
