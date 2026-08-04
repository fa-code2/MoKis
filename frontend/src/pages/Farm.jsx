import React from 'react';
import { useFarm } from '../context/FarmContext';
import { Layers, Droplet, Thermometer, Calendar, CheckCircle2 } from 'lucide-react';

export const Farm = () => {
  const { farmState } = useFarm();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Farm Rack Architecture</h2>
          <p className="text-xs text-slate-400">Multi-tier vertical grow system monitoring</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold text-xs">
          + Add New Modular Rack
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {farmState.racks.map((rack) => (
          <div key={rack.id} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-white text-sm">{rack.name}</h3>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                rack.status === 'Optimal' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}>
                {rack.status}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <p className="text-xs text-slate-400">Active Crop Batch</p>
              <p className="text-sm font-semibold text-white">{rack.crop}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800">
                <span className="text-slate-500 text-[10px] uppercase">Rack Health</span>
                <p className="font-mono font-bold text-emerald-400">{rack.health}%</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800">
                <span className="text-slate-500 text-[10px] uppercase">Harvest In</span>
                <p className="font-mono font-bold text-white">{rack.harvestDays} Days</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60 font-mono">
              <span className="flex items-center gap-1"><Droplet className="w-3.5 h-3.5 text-blue-400" /> {rack.moisture}% Moisture</span>
              <span className="flex items-center gap-1"><Thermometer className="w-3.5 h-3.5 text-amber-400" /> {rack.temp}°C</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};