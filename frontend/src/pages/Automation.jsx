import React from 'react';
import { useFarm } from '../context/FarmContext';
import { Power, Sun, Cpu, AlertTriangle } from 'lucide-react';

export const Automation = () => {
  const { farmState, togglePump, toggleLED, toggleAutoMode } = useFarm();

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-xl font-bold text-white">Actuator Controls & Automation Rules</h2>
        <p className="text-xs text-slate-400">Direct manual override and autonomous logic triggers via Flask/Arduino REST bridge</p>
      </div>

      {/* Large Actuator Control Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Auto Mode Toggle */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Autonomous Closed-Loop Mode</h3>
              <p className="text-xs text-slate-400">Let MoKis AI manage irrigation based on sensor threshold logic</p>
            </div>
          </div>
          <button
            onClick={toggleAutoMode}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold font-mono transition-all ${
              farmState.automationMode === 'AUTO'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-950'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            {farmState.automationMode}
          </button>
        </div>

        {/* Pump Control */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Power className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Submersible Water Pump</h3>
              <p className="text-xs text-slate-400">Relay Module Trigger (USB Digital Pin D8)</p>
            </div>
          </div>
          <button
            onClick={togglePump}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold font-mono transition-all ${
              farmState.telemetry.pumpStatus
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-950'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            {farmState.telemetry.pumpStatus ? 'PUMP ON' : 'PUMP OFF'}
          </button>
        </div>

        {/* LED Grow Light Control */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sun className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Full-Spectrum LED Array</h3>
              <p className="text-xs text-slate-400">PWM Control (USB PWM Pin D9)</p>
            </div>
          </div>
          <button
            onClick={toggleLED}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold font-mono transition-all ${
              farmState.telemetry.ledStatus
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-950'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            {farmState.telemetry.ledStatus ? 'LEDS ON' : 'LEDS OFF'}
          </button>
        </div>

        {/* Emergency Stop Button */}
        <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/40 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-rose-200">Hardware Emergency Cutoff</h3>
              <p className="text-xs text-slate-400">Kill all relays & stop water flow immediately</p>
            </div>
          </div>
          <button className="px-5 py-2.5 rounded-xl text-xs font-bold font-mono bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950 transition-colors">
            E-STOP
          </button>
        </div>
      </div>
    </div>
  );
};