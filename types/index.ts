export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ConflictData {
  id: string;
  zone: string;
  country: string;
  conflictType: string;
  intensity: 'Low' | 'Medium' | 'High' | 'Critical';
  startDate: string;
  description: string;
  casualties?: number;
}

export interface TimeSeriesData {
  date: string;
  Africa: number;
  Americas: number;
  AsiaPacific: number;
  Australia: number;
  Europe: number;
  MiddleEast: number;
  Global: number;
}

export interface BarChartData {
  zone: string;
  conflicts: number;
  casualties: number;
  averageIntensity: number;
}

export interface ApiErrorResponse {
  message?: string;
  error?: string;
  details?: string;
}
