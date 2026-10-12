export interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse{
  code: number;
  message: string;
  error?: string | null;
}

export type RegisterActionResult =
  | { ok: true; data: RegisterResponse; }
  | { ok: false; message: string; statusCode?: number };
