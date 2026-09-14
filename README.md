# MoKis: Smart Vertical Farming System 
MoKis is an IoT-based hydroponic vertical farming system featuring a real-time web dashboard that communicates with an Arduino through a Python-Bluetooth bridge. The system continuously monitors environmental conditions, calculates overall plant health, and enables remote water pump control with an automatic hardware safety shutoff mechanism.

## Features
Real-time dashboard displaying live Temperature and Water Level data using WebSockets without requiring page refresh.
Automatic Plant Health calculation based on multiple sensor readings.
Remote water pump ON/OFF control directly from the web dashboard.
Hardware safety shutoff that automatically disables the water pump when the water reservoir reaches a critical level, preventing pump damage while sending an alert to the dashboard.
