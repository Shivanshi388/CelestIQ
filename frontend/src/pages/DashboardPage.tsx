import { PageContainer } from '@/components/layout/PageContainer';
import { DashboardOverview } from '@/features/dashboard/components/DashboardOverview';
import { LiveMissionFeed } from '@/features/dashboard/components/LiveMissionFeed';
import { OrbitVisualization } from '@/features/visualization/components/OrbitVisualization';
import { OrbitControlsOverlay } from '@/features/visualization/components/OrbitControls';


export default function DashboardPage() {
  return (
    <PageContainer>
      <div className="flex flex-col space-y-6 h-full">
        <DashboardOverview />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-[500px]">
          {/* Mission Feed */}
          <div className="h-full">
            <LiveMissionFeed />
          </div>
          
          {/* Miniature Orbit Visualization */}
          <div className="h-full relative glass-panel overflow-hidden border border-border">
            <OrbitVisualization />
            <OrbitControlsOverlay />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
