import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  TrendingUp, TrendingDown, Minus, BarChart3, 
  Maximize2, Settings, Brain, BarChart, Target,
  Flame, Zap, AlertTriangle
} from 'lucide-react';

const ChartInterface = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1H');
  const [selectedPair, setSelectedPair] = useState('EURUSD');

  const timeframes = ['5M', '15M', '1H', '4H', 'D1'];
  
  const marketData = {
    EURUSD: { price: '1.0847', change: '+0.0023', changePercent: '+0.21%', isPositive: true },
    GBPUSD: { price: '1.2645', change: '-0.0012', changePercent: '-0.09%', isPositive: false },
    USDJPY: { price: '149.85', change: '+0.45', changePercent: '+0.30%', isPositive: true },
    AUDUSD: { price: '0.6721', change: '+0.0008', changePercent: '+0.12%', isPositive: true },
  };

  const miniChartPairs = [
    { pair: 'EURUSD', price: '1.0847', change: '+0.21%', trend: 'up', volatility: 'medium' },
    { pair: 'GBPUSD', price: '1.2645', change: '-0.09%', trend: 'down', volatility: 'high' },
    { pair: 'USDJPY', price: '149.85', change: '+0.30%', trend: 'up', volatility: 'low' },
    { pair: 'AUDUSD', price: '0.6721', change: '+0.12%', trend: 'up', volatility: 'medium' },
    { pair: 'USDCHF', price: '0.8890', change: '-0.15%', trend: 'down', volatility: 'low' },
    { pair: 'NZDUSD', price: '0.5987', change: '+0.08%', trend: 'up', volatility: 'high' },
    { pair: 'USDCAD', price: '1.3756', change: '+0.05%', trend: 'up', volatility: 'medium' },
    { pair: 'EURJPY', price: '162.45', change: '+0.18%', trend: 'up', volatility: 'medium' },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-bull" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-bear" />;
      default: return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getVolatilityIcon = (volatility: string) => {
    switch (volatility) {
      case 'high': return <Flame className="w-3 h-3 text-bear" />;
      case 'medium': return <Zap className="w-3 h-3 text-warning" />;
      default: return <div className="w-3 h-3 rounded-full bg-bull" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold">Chart Analysis</h1>
            <Badge variant="outline" className="text-primary">
              🇪🇺🇺🇸 EUR/USD
            </Badge>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Chart Settings
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Chart Area - Takes up 3 columns on xl screens */}
          <div className="xl:col-span-3 space-y-4">
            {/* Live Price Widget */}
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Price Header */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">🇪🇺🇺🇸</span>
                      <h2 className="text-2xl font-bold">EUR/USD</h2>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-foreground">1.0847</span>
                      <span className="text-lg text-bull">+0.0023 (+0.21%)</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Bid/Ask Spread: <span className="text-foreground">0.8 pips</span>
                    </div>
                  </div>

                  {/* Price Data Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Daily High</div>
                      <div className="font-semibold">1.0851</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Daily Low</div>
                      <div className="font-semibold">1.0820</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Volume</div>
                      <div className="font-semibold">1.2M <span className="text-xs text-muted-foreground">vs Avg: 900K</span></div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Prev Close</div>
                      <div className="font-semibold">1.0824</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chart Section */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Timeframe Selector */}
                    <Tabs value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                      <TabsList className="grid w-fit grid-cols-5">
                        {timeframes.map((tf) => (
                          <TabsTrigger key={tf} value={tf} className="px-4">
                            {tf}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Indicators
                    </Button>
                    <Button variant="outline" size="sm">
                      <Maximize2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Chart Placeholder */}
                <div className="h-[500px] bg-chart-grid rounded-lg border relative overflow-hidden">
                  {/* Chart Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <svg width="100%" height="100%">
                      <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                  </div>
                  
                  {/* Mock Candlestick Chart */}
                  <div className="absolute inset-4 flex items-end justify-around">
                    {Array.from({ length: 50 }).map((_, i) => {
                      const isGreen = Math.random() > 0.5;
                      const height = Math.random() * 200 + 50;
                      return (
                        <div key={i} className="flex flex-col items-center">
                          <div 
                            className={`w-2 ${isGreen ? 'bg-bull' : 'bg-bear'} rounded-sm`}
                            style={{ height: `${height}px` }}
                          />
                          <div 
                            className={`w-4 mt-1 ${isGreen ? 'bg-bull/30' : 'bg-bear/30'} rounded-sm`}
                            style={{ height: `${Math.random() * 30 + 10}px` }}
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Chart Overlays */}
                  <div className="absolute top-4 left-4 space-y-1">
                    <div className="text-sm font-medium">EUR/USD • {selectedTimeframe}</div>
                    <div className="text-xs text-muted-foreground">O: 1.0842 H: 1.0851 L: 1.0820 C: 1.0847</div>
                  </div>

                  {/* Signal Markers */}
                  <div className="absolute top-20 left-1/4 w-3 h-3 bg-bull rounded-full border-2 border-background"></div>
                  <div className="absolute top-32 right-1/3 w-3 h-3 bg-bear rounded-full border-2 border-background"></div>
                </div>
              </CardContent>
            </Card>

            {/* Market Overview Mini Charts */}
            <Card>
              <CardHeader>
                <CardTitle>Market Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {miniChartPairs.map((pair) => (
                    <div 
                      key={pair.pair}
                      className="p-3 rounded-lg border bg-card hover:bg-accent/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedPair(pair.pair)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{pair.pair}</span>
                        <div className="flex items-center gap-1">
                          {getTrendIcon(pair.trend)}
                          {getVolatilityIcon(pair.volatility)}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="font-semibold">{pair.price}</div>
                        <div className={`text-xs ${pair.change.startsWith('+') ? 'text-bull' : 'text-bear'}`}>
                          {pair.change}
                        </div>
                      </div>
                      {/* Mini Sparkline */}
                      <div className="h-8 mt-2 flex items-end justify-between">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div 
                            key={i}
                            className={`w-1 ${pair.trend === 'up' ? 'bg-bull/60' : 'bg-bear/60'} rounded-sm`}
                            style={{ height: `${Math.random() * 20 + 5}px` }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Analysis Sidebar */}
          <div className="space-y-4">
            {/* Technical Analysis */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    Technical Analysis
                  </CardTitle>
                  <Badge variant="outline" className="text-bull">85%</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Trend Direction</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-bull" />
                      <span className="text-sm font-medium text-bull">Bullish</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Momentum</span>
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4 text-warning" />
                      <span className="text-sm font-medium">Strong</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Pattern</span>
                    <span className="text-sm font-medium">Ascending Triangle</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Key Levels</div>
                  <div className="space-y-1">
                    <div className="text-xs">
                      <span className="text-muted-foreground">Support:</span>
                      <span className="ml-2">1.0820, 1.0800, 1.0775</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-muted-foreground">Resistance:</span>
                      <span className="ml-2">1.0860, 1.0885, 1.0910</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fundamental Analysis */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="w-5 h-5 text-primary" />
                  Fundamental Factors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Economic Events</span>
                    <span className="text-sm font-medium">2 high impact</span>
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-sm">News Sentiment</span>
                    <Progress value={65} className="h-2" />
                    <div className="text-xs text-muted-foreground">Bullish (0.65)</div>
                  </div>
                  
                  <div className="text-xs space-y-1">
                    <div><span className="text-muted-foreground">Central Banks:</span> USD Hawkish vs EUR Dovish</div>
                    <div><span className="text-muted-foreground">Intermarket:</span> Dollar strength continues</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trading Recommendation */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  AI Recommendation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Badge className="bg-bull hover:bg-bull text-bull-foreground mb-3">
                    BULLISH
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Entry Zone:</span>
                    <span className="font-medium">1.0845 - 1.0850</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stop Loss:</span>
                    <span className="font-medium text-bear">1.0815 (35 pips)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Take Profit:</span>
                    <span className="font-medium text-bull">1.0920 (70 pips)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Risk/Reward:</span>
                    <span className="font-medium">1:2.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Position Size:</span>
                    <span className="font-medium">0.5 lots (2%)</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">Risk/Reward Visual</span>
                  <div className="flex h-2 rounded-full overflow-hidden">
                    <div className="w-1/3 bg-bear"></div>
                    <div className="w-2/3 bg-bull"></div>
                  </div>
                </div>

                <Button className="w-full bg-bull hover:bg-bull/90 text-bull-foreground">
                  Generate Signal
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartInterface;