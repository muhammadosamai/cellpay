import { jwtDecode } from 'jwt-decode';

export const saveToken = (token: string) => {
  localStorage.setItem('celltopay_token', token);
};

export const getToken = (): string | null => {
  return localStorage.getItem('celltopay_token');
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode(token) as { exp: number };
    return decoded.exp < Date.now() / 1000;
  } catch {
    return true;
  }
};