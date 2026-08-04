import React from 'react';
import { MetricCard } from '../components/cards/MetricCard';
import { AIAssistantCard } from '../components/cards/AIAssistantCard';
import { LiveFeedWithYOLO } from '../components/camera/LiveFeedWithYOLO';
import { SensorHistoryChart } from '../components/charts/SensorHistoryChart';
import { useFarm } from '../context/FarmContext';
import { Thermometer, Droplets, Droplet, Zap, Sun, Cpu } from 'lucide-react';

export const Dashboard = () => {
  const { farmState } = useFarm();

  return (
    <div className="space-y-6">
      {/* Top 4 Core Business Question Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="1. Farm Health Score"
          value={`${farmState.healthScore}%`}
          subtitle="Optimal growth conditions"
          status="success"
          trend="+1.2%"
        />
        <MetricCard
          title="2. Expected Harvest"
          value={`${farmState.daysToHarvest} Days`}
          subtitle="Target: Aug 5, 2026"
          status="default"
        />
        <MetricCard
          title="3. Estimated Revenue"
          value={`${farmState.currency}${farmState.estimatedRevenue.toLocaleString()}`}
          subtitle="Market rate yield projection"
          status="success"
          trend="₹380/kg"
        />
        <MetricCard
          title="4. Automation Status"
          value={farmState.automationMode}
          subtitle="Arduino Closed-Loop Control"
          status={farmState.automationMode === 'AUTO' ? 'success' : 'warning'}
        />
      </div>

      {/* Sensor Row (No Humidity as explicitly specified) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
          <Thermometer className="w-5 h-5 text-blue-400" />
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Temp</p>
            <p className="text-sm font-bold font-mono text-white">{farmState.telemetry.temperature}°C</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
          <Droplets className="w-5 h-5 text-emerald-400" />
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Soil Moisture</p>
            <p className="text-sm font-bold font-mono text-white">{farmState.telemetry.soilMoisture}%</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
          <Droplet className="w-5 h-5 text-cyan-400" />
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Water Tank</p>
            <p className="text-sm font-bold font-mono text-white">{farmState.telemetry.waterTankLevel}%</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
          <Zap className={`w-5 h-5 ${farmState.telemetry.pumpStatus ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Water Pump</p>
            <p className="text-sm font-bold font-mono text-white">{farmState.telemetry.pumpStatus ? 'ACTIVE' : 'IDLE'}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
          <Sun className={`w-5 h-5 ${farmState.telemetry.ledStatus ? 'text-amber-400' : 'text-slate-500'}`} />
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">LED Lights</p>
            <p className="text-sm font-bold font-mono text-white">{farmState.telemetry.ledStatus ? `${farmState.telemetry.ledIntensity}%` : 'OFF'}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
          <Cpu className="w-5 h-5 text-purple-400" />
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Arduino MCU</p>
            <p className="text-sm font-bold font-mono text-emerald-400">ONLINE</p>
          </div>
        </div>
      </div>

      {/* Main Center Area: Camera + AI Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LiveFeedWithYOLO />
        </div>
        <div className="space-y-6">
          <AIAssistantCard />
        </div>
      </div>

      {/* Telemetry Chart Section */}
      <SensorHistoryChart />
    </div>
  );
};