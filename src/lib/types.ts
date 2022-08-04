export const PASSWORD = "password";
export const TEXT = "text";
export const BUTTON = "button";
export const SUBMIT = "submit";
export const EMAIL = "email";
export type buttonType = "button" | "submit";
export const POST = "post";
export const GET = "get";
export const PUT = "put";
export const DELETE = "delete";

export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface IAuthRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
}
export interface IRegisterResponse {
  id: number;
  token: string;
}

export interface INetworkSuccessResponse<T> {
  data: T;
  message?: string;
  status?: number;
}
export interface IAuthErrorResponse<T> {
  data: T;
  status?: number;
}

export interface IUserResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: IUser[];
}

export interface IUpdateUserRequest {
  name?: string;
  job?: string;
  id?: number;
}
export interface IUpdateUserResponse {
  name: string;
  job: string;
  updatedAt: string;
}
