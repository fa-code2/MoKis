import React, { useState, useEffect } from 'react';
import { Cpu, Wifi, Bell, ShieldCheck, Activity } from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export const TopNavbar = () => {
  const { farmState } = useFarm();
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 border-b border-emerald-900/30 bg-slate-950/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-900/40">
          <Activity className="w-5 h-5 text-slate-950 stroke-[2.5]" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold tracking-tight text-white text-lg leading-tight">MoKis <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">OS v2.4</span></span>
          <span className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">Autonomous Vertical Farm</span>
        </div>
      </div>

      {/* Center Status Pill */}
      <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 shadow-inner">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <span className="text-xs font-medium text-slate-200">System Nominal • All Racks Hydro-Synced</span>
      </div>

      {/* Right Stats & Telemetry Indicators */}
      <div className="flex items-center gap-5 text-xs">
        <div className="hidden lg:flex items-center gap-4 border-r border-slate-800 pr-5 text-slate-400">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Arduino:</span>
            <span className={farmState.arduinoConnected ? "text-emerald-400 font-mono font-medium" : "text-rose-400"}>
              {farmState.arduinoConnected ? "/dev/ttyUSB0" : "DISCONNECTED"}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Vision Engine:</span>
            <span className="text-blue-400 font-mono font-medium">YOLOv8 Active</span>
          </div>
        </div>

        <div className="font-mono text-slate-300 font-medium px-2 py-1 rounded bg-slate-900 border border-slate-800">
          {time}
        </div>

        <button className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
};