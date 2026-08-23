import { Card } from '@/components/ui/Card';
import { useOrbitData } from '@/features/visualization/hooks/useOrbitData';
import { useDashboard } from '@/features/dashboard/hooks/useDashboard';
import { useAlerts } from '@/features/alerts/hooks/useAlerts';
import { motion } from 'framer-motion';

export function DashboardOverview() {
  const { satellites } = useOrbitData();
  const { systemStatus } = useDashboard();
  const { allAlerts } = useAlerts();

  const activeSatellites = satellites.filter(s => s.status === 'Active').length;
  const criticalAlerts = allAlerts.filter(a => a.severity === 'Critical' && a.status === 'Active').length;

  const metrics = [
    {
      label: 'SATELLITES',
      value: satellites.length,
      subValue: `${activeSatellites} Active`,
      subColor: 'text-primary',
    },
    {
      label: 'MISSIONS',
      value: systemStatus.missionsInProgress,
      subValue: 'In Progress',
      subColor: 'text-primary',
    },
    {
      label: 'ALERTS',
      value: allAlerts.length,
      subValue: `${criticalAlerts} Critical`,
      subColor: criticalAlerts > 0 ? 'text-danger' : 'text-success',
      valueColor: criticalAlerts > 0 ? 'text-danger' : 'text-white',
    },
    {
      label: 'FUEL RESERVE',
      value: `${systemStatus.fuelReserve.toFixed(1)}%`,
      subValue: systemStatus.fuelReserve > 50 ? 'Optimal' : 'Low',
      subColor: systemStatus.fuelReserve > 50 ? 'text-success' : 'text-warning',
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, i) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card hoverable className="h-full">
            <div className="flex flex-col h-full justify-between">
              <div className="text-xs font-semibold text-muted tracking-widest">{metric.label}</div>
              <div className={`text-4xl font-light mt-2 ${metric.valueColor || 'text-white'}`}>
                {metric.value}
              </div>
              <div className="flex items-center gap-2 mt-4 text-xs font-medium">
                <div className={`h-1.5 w-1.5 rounded-full ${metric.subColor.replace('text-', 'bg-')} animate-pulse-slow`} />
                <span className={metric.subColor}>{metric.subValue}</span>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
