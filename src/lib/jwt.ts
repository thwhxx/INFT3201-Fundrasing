// lib/jwt.ts
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export type JWTPayload = {
  userId: number;
  email: string;
  role: string;
};

export function signJWT(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

export function verifyJWT(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

export async function getJWTFromCookies(): Promise<string | null> {
  const cookieStore = cookies();
  return (await cookieStore).get('token')?.value || null;
}