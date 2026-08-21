import { useState } from 'react';
import { mockAlerts } from '@/services/mock/alerts.mock';
import { Alert, AlertSeverity } from '@/types/alert';

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [filter, setFilter] = useState<AlertSeverity | 'All'>('All');

  const filteredAlerts = alerts.filter(
    (alert) => filter === 'All' || alert.severity === filter
  );

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const acknowledgeAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Monitoring' } : a))
    );
  };

  return { alerts: filteredAlerts, allAlerts: alerts, filter, setFilter, dismissAlert, acknowledgeAlert };
}
