export type AlertSeverity = 'Critical' | 'High' | 'Medium' | 'Low';
export type AlertStatus = 'Active' | 'Monitoring' | 'Resolved';

export interface Alert {
  id: string;
  title: string;
  satelliteId: string;
  satelliteName: string;
  severity: AlertSeverity;
  status: AlertStatus;
  timestamp: string; // ISO String
  description: string;
  recommendedAction?: string;
}
