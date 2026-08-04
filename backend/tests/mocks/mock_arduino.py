"""Hardware loopback loop utility tool emulating physical microcontrollers."""
import random
import time

class VirtualArduinoDeviceSimulator:
    """Simulates real physical sensor arrays via predictable test string loops."""
    def __init__(self, target_moisture: float = 45.0, current_temp: float = 24.0):
        self.moisture = target_moisture
        self.temp = current_temp

    def read_telemetry_line(self) -> str:
        """Generates random metric fluctuations formatted to match strict system parsing rules."""
        self.moisture += random.uniform(-0.5, 0.5)
        self.temp += random.uniform(-0.1, 0.1)
        return f"TELEMETRY|MOISTURE:{round(self.moisture, 2)};TEMP:{round(self.temp, 2)}"
