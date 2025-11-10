import axios, { AxiosInstance, AxiosError } from 'axios';
import { JournalEntry, LoginRequest, SignupRequest, AuthResponse, ApiError, User } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/journal';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor to handle errors
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth APIs
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/public/login', credentials);
    return response.data;
  }

  async signup(userData: SignupRequest): Promise<{ message: string }> {
    const response = await this.api.post<{ message: string }>('/public/signup', userData);
    return response.data;
  }

  // Journal Entry APIs
  async getJournalEntries(): Promise<JournalEntry[]> {
    const response = await this.api.get<JournalEntry[]>('/journal');
    return response.data;
  }

  async getJournalEntryById(id: string): Promise<JournalEntry> {
    const response = await this.api.get<JournalEntry>(`/journal/id/${id}`);
    return response.data;
  }

  async createJournalEntry(entry: JournalEntry): Promise<JournalEntry> {
    const response = await this.api.post<JournalEntry>('/journal', entry);
    return response.data;
  }

  async updateJournalEntry(id: string, entry: JournalEntry): Promise<JournalEntry> {
    const response = await this.api.put<JournalEntry>(`/journal/id/${id}`, entry);
    return response.data;
  }

  async deleteJournalEntry(id: string): Promise<void> {
    await this.api.delete(`/journal/id/${id}`);
  }

  // User APIs
  async getUserGreeting(): Promise<string> {
    const response = await this.api.get('/user', {
      responseType: 'text',
      transformResponse: [(data) => data],
    });
    return response.data as string;
  }

  async updateUser(user: Partial<User>): Promise<void> {
    await this.api.put('/user', user);
  }

  async deleteUser(): Promise<void> {
    await this.api.delete('/user');
  }
}

export default new ApiService();

