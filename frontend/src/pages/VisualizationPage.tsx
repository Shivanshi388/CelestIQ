import { PageContainer } from '@/components/layout/PageContainer';
import { OrbitVisualization } from '@/features/visualization/components/OrbitVisualization';
import { OrbitControlsOverlay } from '@/features/visualization/components/OrbitControls';
import { SatelliteDetailPanel } from '@/features/visualization/components/SatelliteDetailPanel';

export default function VisualizationPage() {
  return (
    <PageContainer>
      <div className="w-full h-[calc(100vh-140px)] relative">
        <OrbitVisualization />
        <OrbitControlsOverlay />
      </div>
      <SatelliteDetailPanel />
    </PageContainer>
  );
}
