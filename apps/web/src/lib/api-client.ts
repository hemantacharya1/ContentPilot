import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '@/config/api';

// Types for API responses
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  private constructor() {
    // Create axios instance with default config
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      // Enable credentials (cookies, auth headers) for cross-origin requests
      withCredentials: true,
    });

    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        
        // If token exists, add it to headers
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError<ApiError>) => {
        // Handle different types of errors
        if (error.response) {
          // Server responded with error status
          const status = error.response.status;
          
          // Handle authentication errors
          if (status === 401) {
            localStorage.removeItem('token');
            // You can add redirect to login here if needed
          }

          // Format error response
          return Promise.reject({
            message: error.response.data?.message || 'An error occurred',
            status: status,
            errors: error.response.data?.errors
          });
        } else if (error.request) {
          // Request made but no response received
          return Promise.reject({
            message: 'No response from server',
            status: 503
          });
        } else {
          // Request setup error
          return Promise.reject({
            message: 'Request configuration error',
            status: 500
          });
        }
      }
    );
  }

  // Singleton pattern to ensure only one instance
  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  // Generic request method
  public async request<T>(method: string, url: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.request<T>({
        method,
        url,
        data,
      });

      return {
        data: response.data,
        status: response.status,
        message: response.statusText,
      };
    } catch (error: any) {
      throw error;
    }
  }

  // Convenience methods for different HTTP methods
  public async get<T>(url: string): Promise<ApiResponse<T>> {
    return this.request<T>('GET', url);
  }

  public async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>('POST', url, data);
  }

  public async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', url, data);
  }

  public async delete<T>(url: string): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', url);
  }
}

// Export a singleton instance
export const apiClient = ApiClient.getInstance(); 