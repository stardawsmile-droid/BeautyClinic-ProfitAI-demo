export interface ServiceData {
  id: string;
  serviceName: string;
  category: string; // e.g., Skin, Surgery, Anti-Aging
  branch: string; // e.g., Siam, Thonglor, Ari
  revenue: number;
  cost: number;
  profit: number;
  margin: number; // percentage
  customers: number;
  growth: number; // Year-over-Year growth percentage
}

export interface AnalysisResult {
  recommendation: 'BUY' | 'SELL' | 'HOLD';
  reasoning: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export enum ViewMode {
  DASHBOARD = 'DASHBOARD',
  ANALYSIS = 'ANALYSIS'
}