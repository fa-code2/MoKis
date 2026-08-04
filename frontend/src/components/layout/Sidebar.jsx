import React from 'react';
import { LayoutDashboard, Layers, Camera, Zap, LineChart, Terminal, Settings } from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'farm', name: 'Farm Racks', icon: Layers },
  { id: 'camera', name: 'Live Vision', icon: Camera },
  { id: 'automation', name: 'Automation', icon: Zap },
  { id: 'analytics', name: 'Analytics', icon: LineChart },
  { id: 'logs', name: 'Logs & Audit', icon: Terminal },
  { id: 'settings', name: 'Settings', icon: Settings },
];

export const Sidebar = () => {
  const { activeTab, setActiveTab } = useFarm();

  return (
    <aside className="w-64 border-r border-slate-800/60 bg-slate-950/50 flex flex-col justify-between p-4 shrink-0">
      <nav className="space-y-1.5">
        <div className="px-3 py-2 text-[10px] uppercase tracking-widest font-bold text-slate-500">Navigation</div>
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-500/15 to-teal-500/5 text-emerald-400 border border-emerald-500/30 shadow-sm shadow-emerald-950'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Hardware Status Module at Sidebar Bottom */}
      <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-2">
        <div className="flex items-center justify-between text-xs font-medium">
          <span className="text-slate-400">MCU Hardware</span>
          <span className="text-emerald-400 font-mono text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">USB OK</span>
        </div>
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div className="bg-emerald-500 h-full w-full animate-pulse"></div>
        </div>
        <p className="text-[11px] text-slate-500 font-mono">Baud: 115200 • Rx/Tx Active</p>
      </div>
    </aside>
  );
};