import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { useFarm } from '../context/FarmContext';
import { TrendingUp, Droplets, Zap, Sprout } from 'lucide-react';

export const Analytics = () => {
  const { farmState } = useFarm();

  const yieldData = [
    { week: 'W1', projected: 12, actual: 11.5 },
    { week: 'W2', projected: 24, actual: 23.8 },
    { week: 'W3', projected: 40, actual: 41.2 },
    { week: 'W4 (Harvest)', projected: 65, actual: null },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Resource Efficiency & Yield Analytics</h2>
        <p className="text-xs text-slate-400">Historical telemetry trends and machine learning yield forecasts</p>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Daily Water Usage</span>
            <Droplets className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-white">18.4 L</p>
          <span className="text-[10px] text-emerald-400 font-mono">-12% vs last cycle</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Power Consumption</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-white">2.8 kWh</p>
          <span className="text-[10px] text-slate-400 font-mono">Duty cycle: 16 hrs ON</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Growth Rate Multiplier</span>
            <Sprout className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-emerald-400">1.42x</p>
          <span className="text-[10px] text-slate-400 font-mono">Vs outdoor baseline</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Projected Harvest Biomass</span>
            <TrendingUp className="w-4 h-4 text-teal-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-white">22.4 kg</p>
          <span className="text-[10px] text-emerald-400 font-mono">Confidence: 96.4%</span>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Yield Prediction Chart */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-white">Biomass Accumulation Curve (kg)</h3>
            <p className="text-xs text-slate-400">Actual vs. ML Regression Growth Target</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={yieldData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="week" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="projected" stroke="#64748b" strokeDasharray="5 5" strokeWidth={2} name="Target Curve" />
                <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981' }} name="Actual Growth" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Energy & Water Usage Chart */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-white">Resource Demand Log</h3>
            <p className="text-xs text-slate-400">Hydro-pump activation liters & energy Draw</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={farmState.chartHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                />
                <Bar dataKey="waterUsage" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Water (L)" />
                <Bar dataKey="energyUsage" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Power (kWh)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};