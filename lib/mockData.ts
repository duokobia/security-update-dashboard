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
];