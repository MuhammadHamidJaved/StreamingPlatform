export interface TokenResponse {
    access: string;
    refresh: string;
  }
  
  export interface ApiResponse<T = any> {
    message: string;
    data?: T;
  }
  