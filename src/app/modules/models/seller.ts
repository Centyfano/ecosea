export interface CreateSeller{
    name: string;
    email: string;
    phone: number;
    password: string;
    password_confirmation: string;
}

export interface LoginSeller{
    email: string;
    password: string;
}

export interface EditSeller {
  name: string;
  phone: number;
}