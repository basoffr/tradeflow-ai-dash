import { useState, useEffect } from 'react';
import TradingSignalCard, { TradingSignal } from './TradingSignalCard';
import SignalFilters, { FilterState } from './SignalFilters';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

// Sample trading signals data
const sampleSignals: TradingSignal[] = [
  {
    id: '1',
    pair: 'EURUSD',
    type: 'BUY',
    timestamp: '2h ago',
    entryPrice: '1.0850',
    stopLoss: '1.0800',
    takeProfit: '1.0950',
    confidence: 8.5,
    riskReward: '1:2.0',
    potentialPips: 100,
    reasoning: 'Strong bullish momentum with RSI oversold bounce. Support at 1.0800 confirmed by multiple timeframe analysis. ECB dovish stance and US dollar weakness create favorable conditions for EUR strength.',
    status: 'active',
    flagEmojis: '🇪🇺🇺🇸'
  },
  {
    id: '2',
    pair: 'GBPUSD',
    type: 'SELL',
    timestamp: '4h ago',
    entryPrice: '1.2645',
    stopLoss: '1.2695',
    takeProfit: '1.2545',
    confidence: 7.2,
    riskReward: '1:2.0',
    potentialPips: -100,
    reasoning: 'Bearish divergence on 4H chart with resistance at 1.2700. UK inflation concerns and potential BoE pause in rate hikes support downside movement.',
    status: 'expiring',
    flagEmojis: '🇬🇧🇺🇸'
  },
  {
    id: '3',
    pair: 'USDJPY',
    type: 'BUY',
    timestamp: '1h ago',
    entryPrice: '149.85',
    stopLoss: '149.35',
    takeProfit: '150.85',
    confidence: 9.1,
    riskReward: '1:2.0',
    potentialPips: 100,
    reasoning: 'BoJ intervention fears subsiding around 150 level. Strong US yields and risk-on sentiment support USD strength. Technical breakout above 149.50 resistance.',
    status: 'active',
    flagEmojis: '🇺🇸🇯🇵'
  },
  {
    id: '4',
    pair: 'AUDUSD',
    type: 'SELL',
    timestamp: '6h ago',
    entryPrice: '0.6721',
    stopLoss: '0.6771',
    takeProfit: '0.6621',
    confidence: 6.8,
    riskReward: '1:2.0',
    potentialPips: -100,
    reasoning: 'China growth concerns weigh on commodity currencies. RBA dovish tilt and weak Australian employment data suggest further AUD weakness ahead.',
    status: 'active',
    flagEmojis: '🇦🇺🇺🇸'
  },
  {
    id: '5',
    pair: 'USDCHF',
    type: 'BUY',
    timestamp: '3h ago',
    entryPrice: '0.8890',
    stopLoss: '0.8840',
    takeProfit: '0.8990',
    confidence: 7.8,
    riskReward: '1:2.0',
    potentialPips: 100,
    reasoning: 'SNB dovish stance and safe haven flows into USD. Swiss franc weakness expected as SNB maintains ultra-loose monetary policy.',
    status: 'active',
    flagEmojis: '🇺🇸🇨🇭'
  }
];

const TradingSignalsGrid = () => {
  const { toast } = useToast();
  const [signals, setSignals] = useState<TradingSignal[]>(sampleSignals);
  const [filteredSignals, setFilteredSignals] = useState<TradingSignal[]>(sampleSignals);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    searchPair: '',
    minConfidence: 0,
    sortBy: 'newest',
    activePills: []
  });

  // Filter and sort signals based on current filters
  useEffect(() => {
    let filtered = [...signals];

    // Apply pair filter
    if (filters.searchPair && filters.searchPair !== 'All Pairs') {
      filtered = filtered.filter(signal => signal.pair === filters.searchPair);
    }

    // Apply confidence filter
    filtered = filtered.filter(signal => signal.confidence >= filters.minConfidence);

    // Apply pill filters
    filters.activePills.forEach(pill => {
      switch (pill) {
        case 'High Confidence (8+)':
          filtered = filtered.filter(signal => signal.confidence >= 8);
          break;
        case 'Major Pairs Only':
          const majorPairs = ['EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF', 'AUDUSD', 'USDCAD', 'NZDUSD'];
          filtered = filtered.filter(signal => majorPairs.includes(signal.pair));
          break;
        case 'BUY Signals Only':
          filtered = filtered.filter(signal => signal.type === 'BUY');
          break;
        case 'SELL Signals Only':
          filtered = filtered.filter(signal => signal.type === 'SELL');
          break;
        case 'Active Only':
          filtered = filtered.filter(signal => signal.status === 'active');
          break;
        case 'Expiring Soon':
          filtered = filtered.filter(signal => signal.status === 'expiring');
          break;
      }
    });

    // Apply sorting
    switch (filters.sortBy) {
      case 'confidence':
        filtered.sort((a, b) => b.confidence - a.confidence);
        break;
      case 'risk-reward':
        filtered.sort((a, b) => {
          const aRR = parseFloat(a.riskReward.split(':')[1]);
          const bRR = parseFloat(b.riskReward.split(':')[1]);
          return bRR - aRR;
        });
        break;
      case 'pips':
        filtered.sort((a, b) => Math.abs(b.potentialPips) - Math.abs(a.potentialPips));
        break;
      case 'newest':
      default:
        // Keep original order (newest first)
        break;
    }

    setFilteredSignals(filtered);
  }, [signals, filters]);

  const handleTakeTrade = (signalId: string) => {
    const signal = signals.find(s => s.id === signalId);
    if (signal) {
      toast({
        title: "Trade Executed",
        description: `${signal.type} order placed for ${signal.pair} at ${signal.entryPrice}`,
      });
    }
  };

  const handleDismiss = (signalId: string) => {
    setSignals(prev => prev.map(signal => 
      signal.id === signalId 
        ? { ...signal, status: 'dismissed' as const }
        : signal
    ));
    toast({
      title: "Signal Dismissed",
      description: "Signal has been removed from your active list",
      variant: "destructive"
    });
  };

  const handleViewAnalysis = (signalId: string) => {
    const signal = signals.find(s => s.id === signalId);
    if (signal) {
      toast({
        title: "Analysis Details",
        description: `Opening detailed analysis for ${signal.pair}`,
      });
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
    toast({
      title: "Signals Updated",
      description: "Latest trading signals have been refreshed",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">AI Trading Signals</h2>
          <p className="text-muted-foreground">
            {filteredSignals.length} signals available • {filters.activePills.length} filters active
          </p>
        </div>
      </div>

      {/* Filters */}
      <SignalFilters 
        filters={filters}
        onFiltersChange={setFilters}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Signals Grid */}
      {filteredSignals.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSignals.map((signal) => (
            <div key={signal.id} className="animate-fade-in">
              <TradingSignalCard
                signal={signal}
                onTakeTrade={handleTakeTrade}
                onDismiss={handleDismiss}
                onViewAnalysis={handleViewAnalysis}
              />
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <Card className="py-16">
          <CardContent className="text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">No signals match your criteria</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or refresh to get the latest signals
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setFilters({ searchPair: '', minConfidence: 0, sortBy: 'newest', activePills: [] })}
                className="text-primary hover:text-primary/80 font-medium"
              >
                Clear all filters
              </button>
              <span className="text-muted-foreground">•</span>
              <button
                onClick={handleRefresh}
                className="text-primary hover:text-primary/80 font-medium"
              >
                Refresh signals
              </button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TradingSignalsGrid;
