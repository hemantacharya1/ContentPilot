// Environment type enum
export enum EnvironmentType {
  LOCAL = 'local',
  PROD = 'prod',
}

const getApiBaseUrl = () => {
  const envType = (import.meta.env.VITE_ENV_TYPE || EnvironmentType.PROD) as EnvironmentType;
  
  // In development, use the proxy
  if (import.meta.env.DEV) {
    return '';  // Empty string means use relative URL, which will go through proxy
  }

  const localUrl = import.meta.env.VITE_LOCAL_API_URL;
  const prodUrl = import.meta.env.VITE_PROD_API_URL;

  // If environment type is LOCAL and local URL is provided, use it
  if (envType === EnvironmentType.LOCAL && localUrl) {
    return localUrl;
  }

  // Otherwise, use production URL (or throw error if not provided)
  if (!prodUrl) {
    throw new Error('Production API URL is required but not provided in environment variables');
  }

  return prodUrl;
};

export const API_BASE_URL = getApiBaseUrl();

export const API_ROUTES = {
  auth: {
    login: '/api/v1/auth/login',
    signup: '/api/v1/auth/signup',
    forgotPassword: '/api/v1/auth/forgot-password',
  },
} as const;

export const getApiUrl = (route: string) => {
  return `${API_BASE_URL}${route}`;
}; 