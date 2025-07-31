import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TrendingUp, Settings, LogOut, Clock } from 'lucide-react';
import tradingIcon from '@/assets/trading-icon.png';

const TradingHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [marketSession, setMarketSession] = useState('London');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      // Determine market session based on UTC time
      const hour = now.getUTCHours();
      if (hour >= 0 && hour < 8) {
        setMarketSession('Tokyo');
      } else if (hour >= 8 && hour < 16) {
        setMarketSession('London');
      } else {
        setMarketSession('New York');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <header className="w-full h-16 bg-card border-b border-border flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src={tradingIcon} alt="Trading" className="w-8 h-8" />
        <h1 className="text-xl font-semibold text-foreground">
          AI Trading Analysis System
        </h1>
      </div>

      {/* Center - Real-time Clock */}
      <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg">
        <Clock className="w-4 h-4 text-muted-foreground" />
        <div className="text-center">
          <div className="text-sm font-mono text-foreground">
            {formatTime(currentTime)}
          </div>
          <div className="text-xs text-muted-foreground">
            {marketSession} Session
          </div>
        </div>
      </div>

      {/* Right side - Balance and User Menu */}
      <div className="flex items-center gap-6">
        {/* Account Balance */}
        <div className="text-right">
          <div className="text-lg font-semibold text-foreground">
            €10,000.00
          </div>
          <div className="flex items-center gap-1 text-sm text-bull">
            <TrendingUp className="w-3 h-3" />
            +€127.50 (+1.28%)
          </div>
        </div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  AT
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TradingHeader;