export interface QueryResult {
  answer: string;
  sources: Source[];
  confidence: number;
  query: string;
}

export interface Source {
  title: string;
  url: string;
  relevance_score: number;
}

export interface SystemStatus {
  vectorIndex: boolean;
  documentationData: boolean;
  apiConnection: boolean;
  lastUpdated: string;
}