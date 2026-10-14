export interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export interface RegisterFormValues extends RegisterForm {
  password2: string;
}

export interface RegisterResponse{
  code: number;
  message: string;
  error?: string | null;
}

export type RegisterActionResult = RegisterResponse;
