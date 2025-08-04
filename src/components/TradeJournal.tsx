import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  CalendarIcon, Download, Upload, Plus, MoreHorizontal, 
  TrendingUp, TrendingDown, Eye, Edit, Trash2, BarChart3,
  Target, AlertTriangle, CheckCircle, XCircle, Clock
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface Trade {
  id: string;
  date: string;
  pair: string;
  direction: 'LONG' | 'SHORT';
  entry: number;
  exit?: number;
  pips: number;
  pnl: number;
  status: 'Win' | 'Loss' | 'Open';
  lotSize: number;
}

const TradeJournal = () => {
  const [selectedTrades, setSelectedTrades] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<Date>();
  const [pairFilter, setPairFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Sample trade data
  const trades: Trade[] = [
    {
      id: '1',
      date: '2025-01-30 14:30',
      pair: 'EURUSD',
      direction: 'LONG',
      entry: 1.0825,
      exit: 1.0875,
      pips: 50,
      pnl: 250,
      status: 'Win',
      lotSize: 0.5
    },
    {
      id: '2',
      date: '2025-01-29 09:15',
      pair: 'GBPUSD',
      direction: 'SHORT',
      entry: 1.2680,
      exit: 1.2655,
      pips: 25,
      pnl: 125,
      status: 'Win',
      lotSize: 0.5
    },
    {
      id: '3',
      date: '2025-01-28 16:45',
      pair: 'USDJPY',
      direction: 'LONG',
      entry: 149.50,
      exit: 149.20,
      pips: -30,
      pnl: -150,
      status: 'Loss',
      lotSize: 0.5
    },
    {
      id: '4',
      date: '2025-01-27 11:20',
      pair: 'AUDUSD',
      direction: 'LONG',
      entry: 0.6720,
      pips: 15,
      pnl: 75,
      status: 'Open',
      lotSize: 0.5
    },
    {
      id: '5',
      date: '2025-01-26 13:10',
      pair: 'USDCAD',
      direction: 'SHORT',
      entry: 1.3750,
      exit: 1.3790,
      pips: -40,
      pnl: -200,
      status: 'Loss',
      lotSize: 0.5
    },
    {
      id: '6',
      date: '2025-01-25 08:30',
      pair: 'EURJPY',
      direction: 'LONG',
      entry: 162.40,
      exit: 162.80,
      pips: 40,
      pnl: 200,
      status: 'Win',
      lotSize: 0.5
    },
    {
      id: '7',
      date: '2025-01-24 15:45',
      pair: 'GBPJPY',
      direction: 'LONG',
      entry: 189.20,
      exit: 190.04,
      pips: 84,
      pnl: 420,
      status: 'Win',
      lotSize: 0.5
    },
    {
      id: '8',
      date: '2025-01-23 10:15',
      pair: 'NZDUSD',
      direction: 'SHORT',
      entry: 0.5990,
      exit: 0.5970,
      pips: 20,
      pnl: 100,
      status: 'Win',
      lotSize: 0.5
    }
  ];

  // Performance calculations
  const totalTrades = trades.length;
  const wins = trades.filter(t => t.status === 'Win').length;
  const losses = trades.filter(t => t.status === 'Loss').length;
  const openTrades = trades.filter(t => t.status === 'Open').length;
  const winRate = totalTrades > 0 ? (wins / (wins + losses)) * 100 : 0;
  const totalPnL = trades.reduce((sum, trade) => sum + trade.pnl, 0);
  const totalWinPnL = trades.filter(t => t.status === 'Win').reduce((sum, t) => sum + t.pnl, 0);
  const totalLossPnL = Math.abs(trades.filter(t => t.status === 'Loss').reduce((sum, t) => sum + t.pnl, 0));
  const profitFactor = totalLossPnL > 0 ? totalWinPnL / totalLossPnL : 0;
  const avgWin = wins > 0 ? totalWinPnL / wins : 0;
  const avgLoss = losses > 0 ? totalLossPnL / losses : 0;
  const avgRR = avgLoss > 0 ? avgWin / avgLoss : 0;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Win': return <CheckCircle className="w-4 h-4 text-bull" />;
      case 'Loss': return <XCircle className="w-4 h-4 text-bear" />;
      case 'Open': return <Clock className="w-4 h-4 text-warning" />;
      default: return null;
    }
  };

  const getPairFlags = (pair: string) => {
    const flagMap: { [key: string]: string } = {
      'EURUSD': '🇪🇺🇺🇸',
      'GBPUSD': '🇬🇧🇺🇸',
      'USDJPY': '🇺🇸🇯🇵',
      'AUDUSD': '🇦🇺🇺🇸',
      'USDCAD': '🇺🇸🇨🇦',
      'EURJPY': '🇪🇺🇯🇵',
      'GBPJPY': '🇬🇧🇯🇵',
      'NZDUSD': '🇳🇿🇺🇸'
    };
    return flagMap[pair] || '🏳️';
  };

  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Win Rate</p>
                <p className="text-3xl font-bold">{winRate.toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground">
                  {wins} wins of {wins + losses} trades
                </p>
              </div>
              <div className="relative w-16 h-16">
                <Progress value={winRate} className="h-2 w-16 rotate-90 origin-center" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-bull" />
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs">
              <TrendingUp className="w-3 h-3 text-bull" />
              <span className="text-bull">+3% vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Profit Factor</p>
              <p className="text-3xl font-bold text-bull">{profitFactor.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">
                €{totalWinPnL.toFixed(0)} profit / €{totalLossPnL.toFixed(0)} loss
              </p>
            </div>
            <div className="mt-4">
              <Badge variant="outline" className="text-bull border-bull/20">
                Above average
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Average R:R</p>
              <p className="text-3xl font-bold">1:{avgRR.toFixed(1)}</p>
              <p className="text-xs text-muted-foreground">Risk vs Reward ratio</p>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex h-2 rounded-full overflow-hidden">
                <div className="w-1/3 bg-bear"></div>
                <div className="w-2/3 bg-bull"></div>
              </div>
              <p className="text-xs text-muted-foreground">Target: 1:2.0+</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Max Drawdown</p>
              <p className="text-3xl font-bold text-warning">8.3%</p>
              <p className="text-xs text-muted-foreground">Maximum loss streak</p>
            </div>
            <div className="mt-4">
              <Badge variant="outline" className="text-bull border-bull/20">
                <CheckCircle className="w-3 h-3 mr-1" />
                Recovered
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trade History Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Trade History</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Trade
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {dateFilter ? format(dateFilter, "PP") : "Date Range"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateFilter}
                  onSelect={setDateFilter}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>

            <Select value={pairFilter} onValueChange={setPairFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Pairs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Pairs</SelectItem>
                <SelectItem value="EURUSD">EURUSD</SelectItem>
                <SelectItem value="GBPUSD">GBPUSD</SelectItem>
                <SelectItem value="USDJPY">USDJPY</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Win">Wins</SelectItem>
                <SelectItem value="Loss">Losses</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
              </SelectContent>
            </Select>

            {selectedTrades.length > 0 && (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Archive Selected
                </Button>
                <Button variant="outline" size="sm">
                  Delete Selected
                </Button>
              </div>
            )}
          </div>

          {/* Trade Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader className="sticky top-0 bg-background">
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox />
                  </TableHead>
                  <TableHead>Date/Time</TableHead>
                  <TableHead>Pair</TableHead>
                  <TableHead>Direction</TableHead>
                  <TableHead>Entry</TableHead>
                  <TableHead>Exit</TableHead>
                  <TableHead>Pips</TableHead>
                  <TableHead>P&L</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trades.map((trade, index) => (
                  <TableRow key={trade.id} className={index % 2 === 0 ? 'bg-muted/30' : ''}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-medium">{trade.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{getPairFlags(trade.pair)}</span>
                        <span>{trade.pair}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={trade.direction === 'LONG' ? 'default' : 'secondary'}
                        className={trade.direction === 'LONG' ? 'bg-bull hover:bg-bull/80' : 'bg-bear hover:bg-bear/80'}
                      >
                        {trade.direction}
                      </Badge>
                    </TableCell>
                    <TableCell>{trade.entry.toFixed(trade.pair.includes('JPY') ? 3 : 5)}</TableCell>
                    <TableCell>
                      {trade.exit ? trade.exit.toFixed(trade.pair.includes('JPY') ? 3 : 5) : '--'}
                    </TableCell>
                    <TableCell className={trade.pips >= 0 ? 'text-bull' : 'text-bear'}>
                      {trade.pips >= 0 ? '+' : ''}{trade.pips}
                    </TableCell>
                    <TableCell className={trade.pnl >= 0 ? 'text-bull' : 'text-bear'}>
                      {trade.pnl >= 0 ? '+' : ''}€{trade.pnl}
                    </TableCell>
                    <TableCell>{getStatusIcon(trade.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-bull/10">
                <div>
                  <div className="font-medium">January 2025</div>
                  <div className="text-sm text-muted-foreground">8 trades</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-bull">+4.2%</div>
                  <div className="text-sm text-bull">+€420</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <div className="font-medium">December 2024</div>
                  <div className="text-sm text-muted-foreground">19 trades</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-bull">+2.1%</div>
                  <div className="text-sm text-bull">+€210</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <div className="font-medium">November 2024</div>
                  <div className="text-sm text-muted-foreground">21 trades</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-bull">+1.8%</div>
                  <div className="text-sm text-bull">+€180</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Best/Worst Trades */}
        <Card>
          <CardHeader>
            <CardTitle>Trade Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Best Trade</div>
                <div className="font-medium text-bull">+€420 GBPJPY LONG (Jan 24)</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Worst Trade</div>
                <div className="font-medium text-bear">-€200 USDCAD SHORT (Jan 26)</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Longest Win Streak</div>
                <div className="font-medium">4 trades (current)</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Current Streak</div>
                <div className="font-medium text-bull">3 wins</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trading Statistics */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Advanced Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Total Trades</div>
                <div className="text-2xl font-bold">{totalTrades}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Average Win</div>
                <div className="text-2xl font-bold text-bull">€{avgWin.toFixed(0)}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Average Loss</div>
                <div className="text-2xl font-bold text-bear">€{avgLoss.toFixed(0)}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Total Return</div>
                <div className="text-2xl font-bold text-bull">+12.7%</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Largest Win</div>
                <div className="text-xl font-bold text-bull">€420</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Largest Loss</div>
                <div className="text-xl font-bold text-bear">€200</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Sharpe Ratio</div>
                <div className="text-xl font-bold">1.67</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Annualized Return</div>
                <div className="text-xl font-bold text-bull">+18.2%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Equity Curve</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-chart-grid rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                <div>Account growth chart</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly P&L</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-chart-grid rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                <div>Monthly performance bars</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TradeJournal;