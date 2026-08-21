import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useDashboard } from '@/features/dashboard/hooks/useDashboard';
import { formatTime } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function LiveMissionFeed() {
  const { events } = useDashboard();

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'Success': return 'success';
      case 'Warning': return 'warning';
      case 'Error': return 'danger';
      case 'Info': return 'info';
      default: return 'default';
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-semibold text-white">Live Mission Feed</h3>
          <p className="text-xs text-muted">Real-time telemetry and system updates</p>
        </div>
        <button className="text-xs text-muted hover:text-white border border-border px-3 py-1 rounded transition-colors">
          View All
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        <AnimatePresence initial={false}>
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, height: 0, x: -20 }}
              animate={{ opacity: 1, height: 'auto', x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex items-center gap-4 text-sm group"
            >
              <div className="text-muted font-mono w-20 shrink-0 group-hover:text-white transition-colors">
                {formatTime(event.timestamp).split(' ')[0]}
              </div>
              
              <div className="flex-1 min-w-0 flex items-center justify-between border-b border-border/30 pb-3 group-hover:border-primary/30 transition-colors">
                <div>
                  <div className="font-medium text-white truncate">{event.title}</div>
                  <div className="text-xs text-muted truncate">{event.satelliteName}</div>
                </div>
                <Badge variant={getBadgeVariant(event.status)} className="ml-2">
                  {event.status}
                </Badge>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Card>
  );
}
