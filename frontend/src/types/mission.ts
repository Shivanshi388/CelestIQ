export interface MissionEvent {
  id: string;
  timestamp: string; // ISO String
  title: string;
  satelliteId: string;
  satelliteName: string;
  status: 'Success' | 'Info' | 'Warning' | 'Error';
}

export interface Mission {
  id: string;
  name: string;
  status: 'In Progress' | 'Completed' | 'Scheduled' | 'Delayed';
  progress: number; // percentage
  satelliteId?: string;
  startTime: string; // ISO string
}
