import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { 
  Search, 
  Filter, 
  X, 
  Plus, 
  RefreshCw,
  SlidersHorizontal
} from 'lucide-react';

export interface FilterState {
  searchPair: string;
  minConfidence: number;
  sortBy: string;
  activePills: string[];
}

interface SignalFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

const SignalFilters = ({ filters, onFiltersChange, onRefresh, isRefreshing }: SignalFiltersProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const currencyPairs = [
    'All Pairs',
    'EURUSD',
    'GBPUSD', 
    'USDJPY',
    'USDCHF',
    'AUDUSD',
    'USDCAD',
    'NZDUSD',
    'EURGBP',
    'EURJPY',
    'GBPJPY'
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'confidence', label: 'Highest Confidence' },
    { value: 'risk-reward', label: 'Best R:R' },
    { value: 'pips', label: 'Most Pips' }
  ];

  const availableFilters = [
    'High Confidence (8+)',
    'Major Pairs Only',
    'BUY Signals Only',
    'SELL Signals Only',
    'Active Only',
    'Expiring Soon'
  ];

  const updateFilters = (updates: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const addFilterPill = (filter: string) => {
    if (!filters.activePills.includes(filter)) {
      updateFilters({
        activePills: [...filters.activePills, filter]
      });
    }
    setIsFilterOpen(false);
  };

  const removeFilterPill = (filter: string) => {
    updateFilters({
      activePills: filters.activePills.filter(pill => pill !== filter)
    });
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Pair Search/Select */}
          <div className="relative min-w-[200px]">
            <Select 
              value={filters.searchPair || 'All Pairs'} 
              onValueChange={(value) => updateFilters({ searchPair: value === 'All Pairs' ? '' : value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select pairs" />
              </SelectTrigger>
              <SelectContent>
                {currencyPairs.map((pair) => (
                  <SelectItem key={pair} value={pair}>
                    {pair}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Confidence Slider */}
          <div className="flex items-center gap-3 min-w-[180px]">
            <Label className="text-xs whitespace-nowrap">Min Confidence:</Label>
            <div className="flex-1">
              <Slider
                value={[filters.minConfidence]}
                onValueChange={(value) => updateFilters({ minConfidence: value[0] })}
                max={10}
                min={0}
                step={0.1}
                className="w-full"
              />
            </div>
            <span className="text-sm font-medium min-w-[30px]">{filters.minConfidence.toFixed(1)}</span>
          </div>

          {/* Sort Dropdown */}
          <Select 
            value={filters.sortBy} 
            onValueChange={(value) => updateFilters({ sortBy: value })}
          >
            <SelectTrigger className="min-w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Refresh Button */}
        <Button
          onClick={onRefresh}
          disabled={isRefreshing}
          size="sm"
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Filter Pills Row */}
      <div className="flex flex-wrap gap-2 items-center">
        {filters.activePills.map((pill) => (
          <Badge
            key={pill}
            variant="secondary"
            className="flex items-center gap-1 px-3 py-1"
          >
            {pill}
            <button
              onClick={() => removeFilterPill(pill)}
              className="ml-1 hover:bg-background/20 rounded-full p-0.5 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}

        {/* Add Filter Button */}
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1 text-xs"
            >
              <Plus className="w-3 h-3" />
              Add Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-3" align="start">
            <div className="space-y-2">
              <p className="text-sm font-medium">Add Filter</p>
              {availableFilters
                .filter(filter => !filters.activePills.includes(filter))
                .map((filter) => (
                  <button
                    key={filter}
                    onClick={() => addFilterPill(filter)}
                    className="w-full text-left text-sm p-2 hover:bg-muted rounded transition-colors"
                  >
                    {filter}
                  </button>
                ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Clear Filters */}
        {filters.activePills.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => updateFilters({ activePills: [] })}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        )}
      </div>
    </div>
  );
};

export default SignalFilters;