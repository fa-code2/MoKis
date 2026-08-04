import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockFarmData } from '../services/mockData';

const FarmContext = createContext();

export const FarmProvider = ({ children }) => {
  const [farmState, setFarmState] = useState(mockFarmData);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Simulated WebSockets telemetry stream
  useEffect(() => {
    const interval = setInterval(() => {
      setFarmState(prev => ({
        ...prev,
        telemetry: {
          ...prev.telemetry,
          temperature: +(23 + (Math.random() * 0.8 - 0.4)).toFixed(1),
          soilMoisture: Math.min(100, Math.max(0, prev.telemetry.soilMoisture + Math.floor(Math.random() * 3 - 1))),
        }
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const togglePump = () => {
    setFarmState(prev => ({
      ...prev,
      telemetry: { ...prev.telemetry, pumpStatus: !prev.telemetry.pumpStatus }
    }));
  };

  const toggleLED = () => {
    setFarmState(prev => ({
      ...prev,
      telemetry: { ...prev.telemetry, ledStatus: !prev.telemetry.ledStatus }
    }));
  };

  const toggleAutoMode = () => {
    setFarmState(prev => ({
      ...prev,
      automationMode: prev.automationMode === 'AUTO' ? 'MANUAL' : 'AUTO'
    }));
  };

  return (
    <FarmContext.Provider value={{ farmState, activeTab, setActiveTab, togglePump, toggleLED, toggleAutoMode }}>
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => useContext(FarmContext);