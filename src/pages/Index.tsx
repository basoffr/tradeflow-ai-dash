import TradingHeader from '@/components/TradingHeader';
import DashboardKPIs from '@/components/DashboardKPIs';
import TradingSignalsGrid from '@/components/TradingSignalsGrid';
import ChartInterface from '@/components/ChartInterface';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TradingHeader />
      
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-fit grid-cols-2 mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="charts">Chart Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-8">
            {/* KPI Cards */}
            <DashboardKPIs />
            
            {/* Trading Signals Section */}
            <TradingSignalsGrid />
            
            {/* Secondary Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Market Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Market Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">EUR/USD</span>
                    <span className="text-bull">1.0875 ↗</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">GBP/USD</span>
                    <span className="text-bear">1.2645 ↘</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">USD/JPY</span>
                    <span className="text-bull">149.85 ↗</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">AUD/USD</span>
                    <span className="text-bull">0.6721 ↗</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">USD/CHF</span>
                    <span className="text-bear">0.8890 ↘</span>
                  </div>
                </CardContent>
              </Card>

              {/* AI Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>AI Analysis Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-bull/10 border border-bull/20 rounded-lg">
                    <div className="text-sm font-medium text-bull mb-2">
                      Bullish Sentiment
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Strong momentum detected in major pairs. Recommended position size: 2-3% per trade.
                    </div>
                  </div>
                  
                  <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                    <div className="text-sm font-medium text-warning mb-2">
                      Risk Alert
                    </div>
                    <div className="text-xs text-muted-foreground">
                      High volatility expected during NY session due to economic data releases.
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Chart Placeholder */}
              <Card className="lg:col-span-2 xl:col-span-1">
                <CardHeader>
                  <CardTitle>Performance Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-chart-grid rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <div className="text-4xl mb-2">📊</div>
                      <div>Performance chart will be displayed here</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="charts">
            <ChartInterface />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
