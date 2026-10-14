export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginResponse {
  code: number;
  message: string;
  token?: string;
}
export type LoginActionResult = LoginResponse;

