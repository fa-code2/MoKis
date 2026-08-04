export const mockFarmData = {
  healthScore: 98.4,
  expectedHarvestDate: "2026-08-05",
  daysToHarvest: 5,
  estimatedRevenue: 8500, // INR
  currency: "₹",
  automationMode: "AUTO", // AUTO | MANUAL
  arduinoConnected: true,
  aiStatus: "HEALTHY", // HEALTHY | WARNING | CRITICAL

  telemetry: {
    temperature: 23.5, // °C
    temperatureStatus: "optimal",
    soilMoisture: 68, // %
    soilMoistureStatus: "optimal",
    waterTankLevel: 82, // %
    pumpStatus: false,
    ledStatus: true,
    ledIntensity: 85, // %
  },

  cameraMetrics: {
    totalPlants: 142,
    healthyPlants: 140,
    diseasedPlants: 2,
    avgGrowthStage: "Vegetative (Day 18)",
    confidenceScore: 0.96,
  },

  racks: [
    { id: "rack-a", name: "Rack A - Top", crop: "Butterhead Lettuce", status: "Optimal", health: 98, harvestDays: 5, moisture: 68, temp: 23.2 },
    { id: "rack-b", name: "Rack B - Middle", crop: "Romaine Lettuce", status: "Optimal", health: 95, harvestDays: 8, moisture: 65, temp: 23.8 },
    { id: "rack-c", name: "Rack C - Bottom", crop: "Sweet Basil", status: "Attention", health: 88, harvestDays: 12, moisture: 54, temp: 24.1 },
  ],

  logs: [
    { id: "l1", time: "10:42:15 AM", category: "AI", message: "YOLO v8 detected 2 leaf spots on Rack C (Confidence: 94%)", type: "warning" },
    { id: "l2", time: "10:30:00 AM", category: "Pump", message: "Automated cycle completed: 15L delivered", type: "info" },
    { id: "l3", time: "10:15:00 AM", category: "System", message: "Arduino Microcontroller re-synced via /dev/ttyUSB0", type: "success" },
    { id: "l4", time: "09:00:00 AM", category: "Lighting", message: "LED Grow spectrum adjusted to Daylight Phase (85%)", type: "info" },
  ],

  chartHistory: Array.from({ length: 12 }, (_, i) => ({
    time: `${i * 2}:00`,
    temperature: +(22 + Math.random() * 3).toFixed(1),
    soilMoisture: Math.floor(60 + Math.random() * 15),
    waterUsage: Math.floor(10 + Math.random() * 8),
    energyUsage: +(1.2 + Math.random() * 0.4).toFixed(2),
  }))
};