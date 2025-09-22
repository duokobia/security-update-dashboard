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
  'Middle East': number;
  'Europe': number;
  'Asia Pacific': number;
  'Africa': number;
  'Americas': number;
  'Global': number;
}

export interface BarChartData {
  zone: string;
  conflicts: number;
  casualties: number;
  averageIntensity: number;
}

export const conflictData: ConflictData[] = [
  {
    id: '1',
    zone: 'Middle East',
    country: 'Israel/Palestine',
    conflictType: 'Territorial',
    intensity: 'High',
    startDate: '2023-10-07',
    description: 'Ongoing conflict in Gaza and surrounding areas',
    casualties: 35000,
  },
  {
    id: '2',
    zone: 'Middle East',
    country: 'Yemen',
    conflictType: 'Civil War',
    intensity: 'Medium',
    startDate: '2014-09-16',
    description: 'Civil war with international involvement',
    casualties: 15000,
  },
  {
    id: '3',
    zone: 'Europe',
    country: 'Ukraine',
    conflictType: 'Invasion',
    intensity: 'High',
    startDate: '2022-02-24',
    description: 'Russian invasion of Ukraine',
    casualties: 500000,
  },
  {
    id: '4',
    zone: 'Asia Pacific',
    country: 'Myanmar',
    conflictType: 'Civil War',
    intensity: 'Medium',
    startDate: '2021-02-01',
    description: 'Civil conflict following military coup',
    casualties: 8000,
  },
  {
    id: '5',
    zone: 'Africa',
    country: 'Sudan',
    conflictType: 'Civil War',
    intensity: 'High',
    startDate: '2023-04-15',
    description: 'Conflict between military factions',
    casualties: 12000,
  },
  {
    id: '6',
    zone: 'Americas',
    country: 'Haiti',
    conflictType: 'Gang Violence',
    intensity: 'Critical',
    startDate: '2021-07-07',
    description: 'Gang violence and political instability',
    casualties: 5000,
  },
  {
    id: '7',
    zone: 'Middle East',
    country: 'Syria',
    conflictType: 'Civil War',
    intensity: 'High',
    startDate: '2011-03-15',
    description: 'Ongoing civil war',
    casualties: 500000,
  },
  {
    id: '8',
    zone: 'Africa',
    country: 'Ethiopia',
    conflictType: 'Civil War',
    intensity: 'High',
    startDate: '2020-11-04',
    description: 'Conflict in Tigray region',
    casualties: 60000,
  },
];

// Time series data for line chart (political violence incidents by month)
export const timeSeriesData: TimeSeriesData[] = [
  { date: '2023-01', 'Middle East': 45, 'Europe': 12, 'Asia Pacific': 28, 'Africa': 32, 'Americas': 18, 'Global': 135 },
  { date: '2023-02', 'Middle East': 52, 'Europe': 15, 'Asia Pacific': 31, 'Africa': 35, 'Americas': 22, 'Global': 155 },
  { date: '2023-03', 'Middle East': 48, 'Europe': 18, 'Asia Pacific': 29, 'Africa': 38, 'Americas': 20, 'Global': 153 },
  { date: '2023-04', 'Middle East': 61, 'Europe': 14, 'Asia Pacific': 33, 'Africa': 41, 'Americas': 25, 'Global': 174 },
  { date: '2023-05', 'Middle East': 55, 'Europe': 16, 'Asia Pacific': 35, 'Africa': 37, 'Americas': 23, 'Global': 166 },
  { date: '2023-06', 'Middle East': 58, 'Europe': 20, 'Asia Pacific': 38, 'Africa': 42, 'Americas': 27, 'Global': 185 },
  { date: '2023-07', 'Middle East': 65, 'Europe': 22, 'Asia Pacific': 41, 'Africa': 45, 'Americas': 30, 'Global': 203 },
  { date: '2023-08', 'Middle East': 72, 'Europe': 25, 'Asia Pacific': 44, 'Africa': 48, 'Americas': 32, 'Global': 221 },
  { date: '2023-09', 'Middle East': 68, 'Europe': 28, 'Asia Pacific': 46, 'Africa': 51, 'Americas': 35, 'Global': 228 },
  { date: '2023-10', 'Middle East': 85, 'Europe': 30, 'Asia Pacific': 49, 'Africa': 55, 'Americas': 38, 'Global': 257 },
  { date: '2023-11', 'Middle East': 78, 'Europe': 32, 'Asia Pacific': 52, 'Africa': 58, 'Americas': 40, 'Global': 260 },
  { date: '2023-12', 'Middle East': 82, 'Europe': 35, 'Asia Pacific': 55, 'Africa': 62, 'Americas': 42, 'Global': 276 },
];

// Data for bar chart (conflict statistics by region)
export const barChartData: BarChartData[] = [
  { zone: 'Middle East', conflicts: 28, casualties: 550000, averageIntensity: 3.8 },
  { zone: 'Europe', conflicts: 12, casualties: 520000, averageIntensity: 3.5 },
  { zone: 'Asia Pacific', conflicts: 22, casualties: 180000, averageIntensity: 2.9 },
  { zone: 'Africa', conflicts: 35, casualties: 320000, averageIntensity: 3.2 },
  { zone: 'Americas', conflicts: 18, casualties: 75000, averageIntensity: 2.7 },
  { zone: 'Global', conflicts: 115, casualties: 1645000, averageIntensity: 3.2 },
];