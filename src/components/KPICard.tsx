import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  trendColor?: 'bull' | 'bear' | 'muted';
  hasSparkline?: boolean;
  className?: string;
}

const KPICard = ({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  trendColor = 'muted',
  hasSparkline = false,
  className,
}: KPICardProps) => {
  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-3 h-3" />;
    if (trend === 'down') return <TrendingDown className="w-3 h-3" />;
    return null;
  };

  const getTrendColorClass = () => {
    switch (trendColor) {
      case 'bull':
        return 'text-bull';
      case 'bear':
        return 'text-bear';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <Card className={cn(
      "transition-all duration-200 ease-out hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1",
      className
    )}>
      <CardContent className="p-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {title}
          </h3>
          
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-foreground">
              {value}
            </span>
            {hasSparkline && (
              <div className="w-16 h-8 bg-chart-grid rounded flex items-center justify-center">
                <div className="text-xs text-muted-foreground">📈</div>
              </div>
            )}
          </div>

          {(subtitle || trendValue) && (
            <div className="flex items-center justify-between pt-1">
              {subtitle && (
                <span className="text-sm text-muted-foreground">
                  {subtitle}
                </span>
              )}
              {trendValue && (
                <div className={cn("flex items-center gap-1 text-xs", getTrendColorClass())}>
                  {getTrendIcon()}
                  {trendValue}
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default KPICard;