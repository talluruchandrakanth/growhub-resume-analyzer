export interface Resume {
  id: string;
  fileName: string;
  uploadDate: string;
  detectedRole: string;
  confidence: number;
  skills: string[];
  experience: string[];
  education: string[];
  projects: string[];
  file?: File;
  analysisResult?: AnalysisResult;
}

export interface JobRole {
  id: string;
  title: string;
  category: string;
  requiredSkills: string[];
  preferredSkills: string[];
  description: string;
  averageSalary?: string;
  experienceLevel: string;
}

export interface AnalysisResult {
  detectedRole: string;
  confidence: number;
  matchScore: number;
  matchingJobs: JobRole[];
  skillsAnalysis: {
    relevant: string[];
    missing: string[];
    irrelevant: string[];
  };
  recommendations: string[];
  careerSuggestions: string[];
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot' | 'system';
  content: string;
  timestamp: Date;
  data?: any;
}

export interface SkillRecommendation {
  skill: string;
  relevance: 'high' | 'medium' | 'low';
  action: 'add' | 'remove' | 'keep';
  reason: string;
}