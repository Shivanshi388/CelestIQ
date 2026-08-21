import { Card } from '@/components/ui/Card';
import { useAlerts } from '@/features/alerts/hooks/useAlerts';
import { motion } from 'framer-motion';

export function AlertOverview() {
  const { allAlerts, filter, setFilter } = useAlerts();

  const getCount = (severity: string) => allAlerts.filter(a => a.severity === severity).length;
  
  const severities = [
    { name: 'Critical', color: 'text-danger', border: 'border-danger/30', bg: 'bg-danger/10', sub: 'Immediate Action' },
    { name: 'High', color: 'text-warning', border: 'border-warning/30', bg: 'bg-warning/10', sub: 'High Priority' },
    { name: 'Medium', color: 'text-primary', border: 'border-primary/30', bg: 'bg-primary/10', sub: 'Monitor' },
    { name: 'Low', color: 'text-success', border: 'border-success/30', bg: 'bg-success/10', sub: 'Low Priority' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {severities.map((sev, i) => {
        const count = getCount(sev.name);
        const isActive = filter === sev.name || filter === 'All';
        
        return (
          <motion.div
            key={sev.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setFilter(filter === sev.name ? 'All' : sev.name as any)}
            className="cursor-pointer"
          >
            <Card className={`h-full transition-all duration-300 ${isActive ? `border-${sev.color.split('-')[1]}/50 shadow-glow-${sev.color.split('-')[1] === 'danger' ? 'danger' : sev.color.split('-')[1]}` : 'opacity-60 hover:opacity-100'}`}>
              <div className="text-xs font-semibold text-muted uppercase tracking-widest">{sev.name}</div>
              <div className={`text-4xl font-light mt-2 ${sev.color}`}>
                {count}
              </div>
              <div className={`mt-4 text-xs font-medium ${sev.color} opacity-80 flex items-center gap-1.5`}>
                <div className={`h-1 w-1 rounded-full ${sev.color.replace('text-', 'bg-')}`} />
                {sev.sub}
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
