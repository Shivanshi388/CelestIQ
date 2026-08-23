import { WebDashboardStats } from '../components/dashboard/WebDashboardStats';
import { LiveMissionFeed } from '../components/dashboard/LiveMissionFeed';
import { EarthFooter } from '../components/dashboard/EarthFooter';

export const DashboardHome = () => {
  return (
    <div className="flex flex-col gap-4 h-full min-h-[800px] page-enter pb-10">
      <WebDashboardStats />
      <LiveMissionFeed />
      <EarthFooter />
    </div>
  );
};
