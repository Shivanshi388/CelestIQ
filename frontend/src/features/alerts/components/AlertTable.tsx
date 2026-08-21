import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useAlerts } from '@/features/alerts/hooks/useAlerts';
import { formatTime } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, AlertCircle, AlertOctagon, Info } from 'lucide-react';

export function AlertTable() {
  const { alerts, setFilter } = useAlerts();

  const getIcon = (severity: string) => {
    switch(severity) {
      case 'Critical': return <AlertOctagon className="h-4 w-4 text-danger" />;
      case 'High': return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'Medium': return <AlertCircle className="h-4 w-4 text-primary" />;
      case 'Low': return <Info className="h-4 w-4 text-success" />;
      default: return null;
    }
  };

  const getBadgeVariant = (severity: string) => {
    switch(severity) {
      case 'Critical': return 'danger';
      case 'High': return 'warning';
      case 'Medium': return 'info';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Card className="flex-1 overflow-hidden flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-semibold text-white">Active Alerts</h3>
        </div>
        <button 
          onClick={() => setFilter('All')}
          className="text-xs text-muted hover:text-white border border-border px-3 py-1 rounded transition-colors"
        >
          View All Alerts
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted uppercase border-b border-border/50">
            <tr>
              <th className="pb-3 font-medium">Alert</th>
              <th className="pb-3 font-medium">Satellite</th>
              <th className="pb-3 font-medium">Severity</th>
              <th className="pb-3 font-medium">Time</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            <AnimatePresence>
              {alerts.map((alert, i) => (
                <motion.tr
                  key={alert.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  className="group hover:bg-surface-light/50 transition-colors cursor-pointer"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      {getIcon(alert.severity)}
                      <span className="font-medium text-white">{alert.title}</span>
                    </div>
                  </td>
                  <td className="py-4 text-muted">{alert.satelliteName}</td>
                  <td className="py-4">
                    <Badge variant={getBadgeVariant(alert.severity)}>
                      {alert.severity}
                    </Badge>
                  </td>
                  <td className="py-4 text-muted font-mono">{formatTime(alert.timestamp).split(' ')[0]}</td>
                  <td className="py-4">
                    <Badge variant={alert.status === 'Active' ? 'danger' : 'success'} dot={false}>
                      {alert.status}
                    </Badge>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        {alerts.length === 0 && (
          <div className="text-center py-10 text-muted">
            No active alerts in this category.
          </div>
        )}
      </div>
    </Card>
  );
}
