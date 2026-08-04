import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { 
  Activity, Cpu, ShieldCheck, LayoutDashboard, Zap, 
  Thermometer, Droplets, Droplet, Sun, Sparkles, CheckCircle2, ArrowRight
} from 'lucide-react';

// Connect to Flask-SocketIO Backend on Port 5000
const socket = io('http://127.0.0.1:5000', {
  transports: ['websocket', 'polling'],
  autoConnect: true,
});

export default function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [isConnected, setIsConnected] = useState(socket.connected);

  // Dynamic Telemetry State driven by WebSocket
  const [telemetry, setTelemetry] = useState({
    temperature: 24.5,
    soilMoisture: 45.1,
    waterTankLevel: 82,
    pumpStatus: false,
    ledStatus: true,
  });

  // Real-time Clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  // WebSocket Event Listener Integration
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log('✅ Connected to MoKis OS WebSocket Engine');
    }

    function onDisconnect() {
      setIsConnected(false);
      console.warn('⚠️ Disconnected from MoKis OS WebSocket Engine');
    }

    // Handle live incoming packets emitted by ResilientSerialManager
    function onSensorUpdate(data) {
      console.log('📡 WebSocket Received:', data);
      setTelemetry((prev) => ({
        ...prev,
        soilMoisture: parseFloat(data.soil_moisture).toFixed(1),
        temperature: parseFloat(data.temperature).toFixed(1),
      }));
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('sensor_update', onSensorUpdate);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('sensor_update', onSensorUpdate);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col antialiased">
      
      {/* Top Header Bar */}
      <header className="h-16 border-b border-emerald-900/30 bg-slate-950/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-900/40">
            <Activity className="w-5 h-5 text-slate-950 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-white text-lg leading-tight">
              MoKis <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">OS v2.4</span>
            </span>
            <span className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">Autonomous Vertical Farm</span>
          </div>
        </div>

        {/* Live Socket Connection Badge */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 shadow-inner">
          <span className="relative flex h-2.5 w-2.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isConnected ? 'bg-emerald-400' : 'bg-rose-400'} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isConnected ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
          </span>
          <span className="text-xs font-medium text-slate-200">
            {isConnected ? 'WebSocket Synced' : 'Connecting to Engine...'}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="hidden lg:flex items-center gap-4 border-r border-slate-800 pr-4 text-slate-400">
            <div className="flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>Serial Mode:</span>
              <span className="text-emerald-400 font-mono font-medium">Virtual Simulation</span>
            </div>
          </div>
          <div className="font-mono text-slate-300 font-medium px-2 py-1 rounded bg-slate-900 border border-slate-800">
            {time}
          </div>
        </div>
      </header>

      {/* Main Telemetry View */}
      <main className="flex-1 p-6 lg:p-8 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900/50 space-y-6">
        
        {/* Real-time Telemetry Dashboard Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          
          {/* Temperature Sensor */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4 shadow-lg">
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Thermometer className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Temperature</p>
              <p className="text-2xl font-bold font-mono text-white transition-all">{telemetry.temperature}°C</p>
            </div>
          </div>

          {/* Soil Moisture Sensor (Updates Live) */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 flex items-center gap-4 shadow-lg shadow-emerald-950/20">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Droplets className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-emerald-400 uppercase font-semibold tracking-wider">Soil Moisture</p>
              <p className="text-2xl font-bold font-mono text-emerald-400 transition-all">{telemetry.soilMoisture}%</p>
            </div>
          </div>

          {/* Water Tank Level */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4 shadow-lg">
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Droplet className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Water Tank</p>
              <p className="text-2xl font-bold font-mono text-white">{telemetry.waterTankLevel}%</p>
            </div>
          </div>

          {/* Water Pump Status */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4 shadow-lg">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Water Pump</p>
              <p className="text-2xl font-bold font-mono text-white">{telemetry.pumpStatus ? 'ACTIVE' : 'IDLE'}</p>
            </div>
          </div>

          {/* Grow Lights */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4 shadow-lg">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Sun className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Grow Lights</p>
              <p className="text-2xl font-bold font-mono text-white">{telemetry.ledStatus ? 'ON (85%)' : 'OFF'}</p>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}