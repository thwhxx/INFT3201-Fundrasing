export interface UserLogin {
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  email: string;
  first_name: string | null;
  preferred_name: string | null;
  role: string;
}

export interface JWTPayload {
  userId: number;
  email: string;
  role: string;
}
