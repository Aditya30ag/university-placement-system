const requiredEnvVars = [
  // Add your required environment variables here
] as const;

interface EnvConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  NEXT_PUBLIC_APP_URL: string;
  NEXT_PUBLIC_VERSION: string;
}

function getEnvVar(name: string, defaultValue?: string): string {
  const value = process.env[name] || defaultValue;
  
  if (!value && requiredEnvVars.includes(name as never)) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  
  return value || '';
}

export const env: EnvConfig = {
  NODE_ENV: (process.env.NODE_ENV as EnvConfig['NODE_ENV']) || 'development',
  NEXT_PUBLIC_APP_URL: getEnvVar('NEXT_PUBLIC_APP_URL', 'http://localhost:3000'),
  NEXT_PUBLIC_VERSION: getEnvVar('NEXT_PUBLIC_VERSION', '1.0.0'),
};
