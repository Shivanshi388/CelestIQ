import { MissionEvent } from '@/types/mission';

export const mockMissionEvents: MissionEvent[] = [
  {
    id: 'evt-01',
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    title: 'Orbit Adjustment Completed',
    satelliteId: 'sat-03',
    satelliteName: 'Satellite ORB-12',
    status: 'Success',
  },
  {
    id: 'evt-02',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    title: 'Trajectory Update',
    satelliteId: 'sat-01',
    satelliteName: 'Satellite SAT-07',
    status: 'Info',
  },
  {
    id: 'evt-03',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    title: 'Risk Alert: Solar Flare',
    satelliteId: 'all',
    satelliteName: 'All Satellites',
    status: 'Warning',
  }
];

export const mockSystemStatus = {
  activeSatellites: 24,
  missionsInProgress: 12,
  fuelReserve: 78.0,
};
