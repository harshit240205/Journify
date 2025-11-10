export interface JournalEntry {
  id?: string;
  title: string;
  content: string;
  date?: string;
  sentiment?: 'HAPPY' | 'SAD' | 'ANGRY' | 'ANXIOUS';
}

export interface User {
  userName: string;
  email?: string;
  password?: string;
  sentimentAnalysis?: boolean;
}

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface SignupRequest {
  userName: string;
  email: string;
  password: string;
  sentimentAnalysis: boolean;
}

export interface AuthResponse {
  token: string;
}

export interface ApiError {
  message: string;
}

