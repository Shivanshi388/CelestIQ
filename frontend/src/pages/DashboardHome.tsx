import { WebDashboardStats } from '../components/dashboard/WebDashboardStats';
import { LiveMissionFeed } from '../components/dashboard/LiveMissionFeed';

export const DashboardHome = () => {
  return (
    <div className="flex flex-col gap-4 h-full min-h-[800px] page-enter">
      <WebDashboardStats />
      <LiveMissionFeed />
    </div>
  );
};
