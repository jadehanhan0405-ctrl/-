
export enum AppSection {
  OVERVIEW = 'overview',
  ZONGPING = 'zongping',
  OVERSEAS = 'overseas',
  MATERIALS = 'materials',
  AI_ADVISOR = 'ai_advisor'
}

export interface University {
  id: string;
  name: string;
  category: 'Zongping' | 'HK_Macau' | 'Singapore';
  status: 'Not Started' | 'In Progress' | 'Submitted' | 'Interview' | 'Admitted' | 'Rejected';
  deadline: string;
  requirements: string[];
}

export interface MaterialItem {
  id: string;
  name: string;
  status: 'Ready' | 'Pending' | 'Not Started';
  description: string;
}

export interface StudentProfile {
  name: string;
  rank: {
    general: number;
    combination: number;
    total: number;
  };
  scores: {
    chinese: number;
    math: number;
    english: number;
    physics: number;
  };
}
