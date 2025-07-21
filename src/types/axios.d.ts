import 'axios';

declare module 'axios' {
  export interface AxiosXHRConfig {
    skipAuth?: boolean;
    _retry?: boolean;
  }
}
