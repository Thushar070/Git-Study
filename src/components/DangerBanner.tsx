import React from 'react';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

interface DangerBannerProps {
  title?: string;
  message: string;
  level?: 'caution' | 'destructive';
}

export const DangerBanner: React.FC<DangerBannerProps> = ({
  title,
  message,
  level = 'destructive'
}) => {
  const isDestructive = level === 'destructive';

  return (
    <div className={`danger-banner ${isDestructive ? 'banner-destructive' : 'banner-caution'}`}>
      <div className="danger-banner-icon">
        {isDestructive ? <ShieldAlert size={22} /> : <AlertTriangle size={22} />}
      </div>
      <div className="danger-banner-content">
        <h4 className="danger-banner-title">
          {title || (isDestructive ? 'DESTRUCTIVE COMMAND — USE WITH CAUTION' : 'HIGH CAUTION ADVISED')}
        </h4>
        <p className="danger-banner-message">{message}</p>
      </div>
    </div>
  );
};
