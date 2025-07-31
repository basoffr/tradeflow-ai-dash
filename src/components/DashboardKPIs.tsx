import KPICard from './KPICard';

const DashboardKPIs = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      <KPICard
        title="Active Signals"
        value="3"
        trendValue="+2 today"
        trend="up"
        trendColor="bull"
      />
      
      <KPICard
        title="Daily P&L"
        value="+€127.50"
        trendValue="+1.28%"
        trend="up"
        trendColor="bull"
        hasSparkline
      />
      
      <KPICard
        title="Win Rate"
        value="68%"
        subtitle="30 days"
        trendValue="+3%"
        trend="up"
        trendColor="bull"
      />
      
      <KPICard
        title="Available Pairs"
        value="28"
        subtitle="Forex majors & minors"
      />
    </div>
  );
};

export default DashboardKPIs;