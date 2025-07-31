import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Clock, Target, Shield, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TradingSignal {
  id: string;
  pair: string;
  type: 'BUY' | 'SELL';
  timestamp: string;
  entryPrice: string;
  stopLoss: string;
  takeProfit: string;
  confidence: number;
  riskReward: string;
  potentialPips: number;
  reasoning: string;
  status: 'active' | 'expiring' | 'dismissed';
  flagEmojis: string;
}

interface TradingSignalCardProps {
  signal: TradingSignal;
  onTakeTrade: (signalId: string) => void;
  onDismiss: (signalId: string) => void;
  onViewAnalysis: (signalId: string) => void;
}

const TradingSignalCard = ({ signal, onTakeTrade, onDismiss, onViewAnalysis }: TradingSignalCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = () => {
    switch (signal.status) {
      case 'active': return 'text-bull';
      case 'expiring': return 'text-warning';
      case 'dismissed': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = () => {
    switch (signal.status) {
      case 'active': return '🟢';
      case 'expiring': return '🟡';
      case 'dismissed': return '⚪';
      default: return '⚪';
    }
  };

  const isBuySignal = signal.type === 'BUY';

  return (
    <Card 
      className={cn(
        "transition-all duration-300 ease-out cursor-pointer",
        "hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1",
        isHovered && "shadow-lg shadow-primary/20 -translate-y-1"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-4">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold">{signal.flagEmojis}</span>
            <h3 className="text-xl font-bold text-foreground">{signal.pair}</h3>
            <Badge 
              variant={isBuySignal ? "default" : "destructive"}
              className={cn(
                "flex items-center gap-1 font-semibold px-3 py-1",
                isBuySignal ? "bg-bull text-bull-foreground" : "bg-bear text-bear-foreground"
              )}
            >
              {isBuySignal ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {signal.type}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={getStatusColor()}>{getStatusIcon()}</span>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-3 h-3" />
              {signal.timestamp}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Main Data Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Entry Price</p>
              <p className="text-2xl font-bold text-foreground">{signal.entryPrice}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Stop Loss</p>
              <p className="text-lg font-semibold text-bear flex items-center gap-1">
                <Shield className="w-4 h-4" />
                {signal.stopLoss}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Take Profit</p>
              <p className="text-lg font-semibold text-bull flex items-center gap-1">
                <Target className="w-4 h-4" />
                {signal.takeProfit}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Confidence Score</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-foreground">{signal.confidence}/10</span>
                  <span className={cn(
                    "text-sm font-medium",
                    signal.confidence >= 8 ? "text-bull" : signal.confidence >= 6 ? "text-warning" : "text-bear"
                  )}>
                    {signal.confidence >= 8 ? "High" : signal.confidence >= 6 ? "Medium" : "Low"}
                  </span>
                </div>
                <Progress 
                  value={signal.confidence * 10} 
                  className="h-2"
                />
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Risk/Reward</p>
              <p className="text-lg font-semibold text-foreground">{signal.riskReward}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Potential</p>
              <p className="text-lg font-semibold text-primary">
                {signal.potentialPips > 0 ? '+' : ''}{signal.potentialPips} pips
              </p>
            </div>
          </div>
        </div>

        {/* AI Reasoning Section */}
        <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
          <p className="text-sm text-foreground mb-2">
            {expanded ? signal.reasoning : `${signal.reasoning.substring(0, 100)}...`}
          </p>
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
          >
            {expanded ? 'Read less' : 'Read more'}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button 
            onClick={() => onTakeTrade(signal.id)}
            className="flex-1 bg-bull hover:bg-bull/90 text-bull-foreground font-semibold"
          >
            Take Trade
          </Button>
          <Button 
            variant="outline"
            onClick={() => onDismiss(signal.id)}
            className="flex-1"
          >
            Dismiss
          </Button>
          <Button 
            variant="ghost"
            size="icon"
            onClick={() => onViewAnalysis(signal.id)}
            className="shrink-0"
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradingSignalCard;