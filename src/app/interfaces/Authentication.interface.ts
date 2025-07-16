export interface AuthRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
}

export interface RegisterResponse {
  message: string;
}
