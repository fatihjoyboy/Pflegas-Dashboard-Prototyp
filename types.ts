import React from 'react';

export interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum GeminiModel {
  CHAT = 'gemini-3-pro-preview',
  IMAGE = 'gemini-3-pro-preview'
}

// Candidate Domain Types
export type CandidateStatus = 'Neu' | 'Vorgeschlagen' | 'Interview' | 'Eingestellt';

export interface Candidate {
  id: string;
  name: string;
  qualification: string;
  location: string;
  availability: string;
  matchScore: number;
  status: CandidateStatus;
}

// Employer Domain Types
export type EmployerType = 'Krankenhaus' | 'Pflegeheim' | 'Ambulant' | 'Intensivpflege';
export type EmployerPriority = 'Normal' | 'Premium';

export interface Employer {
  id: string;
  name: string;
  location: string;
  type: EmployerType;
  openJobsCount: number;
  priority: EmployerPriority;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
}

// Job Domain Types
export type JobStatus = 'Offen' | 'Pausiert' | 'Besetzt';

export interface Job {
  id: string;
  title: string;
  employerId: string;
  employerName: string;
  location: string;
  type: string; // e.g. Vollzeit, Teilzeit
  qualification: string;
  status: JobStatus;
  postedDate: string;
  description: string;
  requirements: string[];
}

// Match Domain Types
export type MatchStatus = 'Neu' | 'Vorgeschlagen' | 'Interview' | 'Angebot' | 'Eingestellt';

export interface Match {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateQualification: string;
  jobId: string;
  jobTitle: string;
  employerName: string;
  matchScore: number;
  status: MatchStatus;
  lastUpdated: string;
}

// Settings Domain Types
export interface UserSettings {
  general: {
    companyName: string;
    defaultRegion: string;
    language: 'Deutsch' | 'English';
  };
  matching: {
    weightQualification: number;
    weightLocation: number;
    weightAvailability: number;
  };
  notifications: {
    email: boolean;
    inApp: boolean;
  };
}

// Reusable Component Types
export interface FilterOption {
  key: string;
  label: string;
  options: string[];
}

export interface TableColumn<T> {
  header: string;
  accessorKey: keyof T;
  sortable?: boolean;
  cell?: (value: any, item: T) => React.ReactNode;
}
