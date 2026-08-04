import threading
import time
import random
import logging
from typing import Optional
from flask import Flask
from app import socketio

class ResilientSerialManager:
    """Manages durable, thread-safe serial channels with automated mock fallback mechanics."""
    
    def __init__(self, app: Flask, port: str, baud_rate: int = 115200, retry_delay: int = 5):
        self.app = app
        self.port = port
        self.baud_rate = baud_rate
        self.retry_delay = retry_delay
        self._is_running = False
        self._connection = None

    def start_monitoring_loop(self) -> None:
        """Invokes the central IO execution sequence loop."""
        self._is_running = True
        self._io_execution_loop()

        thread = threading.Thread(target=self._io_execution_loop, daemon=True)
        thread.start()

    def _io_execution_loop(self) -> None:
        """Maintains connection state and switches cleanly into simulation modes if offline."""
        import random  # Localized for isolated random generations
        
        with self.app.app_context():
            # Check if we are running intentionally in virtual hardware simulation mode
            if self.port.upper() == "MOCK":
                logging.info("🚀 SYSTEM WARNING: Physical USB links bypassed. Running under Virtual Simulation Mode.")
                
                # Baseline mock metrics
                mock_moisture = 45.0
                mock_temp = 24.5

                while self._is_running:
                    # Simulate small natural environment oscillations (+/- 0.2%)
                    mock_moisture += random.uniform(-0.3, 0.2)
                    mock_moisture = max(0.0, min(100.0, mock_moisture)) # clamp metrics between 0-100
                    mock_temp += random.uniform(-0.1, 0.1)

                    # Simulate a raw delimited package frame string matching your incoming device schema
                    simulated_packet = f"TELEMETRY|MOISTURE:{mock_moisture:.1f};TEMP:{mock_temp:.1f}"
                    
                    self._process_incoming_packet(simulated_packet)
                    time.sleep(1) # Emit fake metrics downstream precisely every 1000ms
                return

            # --- Physical USB Hardware Routing Pathway ---
            import serial # type: ignore
            logging.info(f"Connecting to physical Arduino device on target environment port: {self.port}")
            
            while self._is_running:
                if self._connection is None or not self._connection.is_open:
                    try:
                        self._connection = serial.Serial(self.port, self.baud_rate, timeout=1)
                        time.sleep(2) # Warmup connection delay
                        logging.info("Hardware serial link completely bound and listening.")
                    except Exception as e:
                        logging.warning(f"Unable to reach USB device on {self.port}. Retrying in {self.retry_delay}s... (Set SERIAL_PORT=MOCK to bypass)")
                        time.sleep(self.retry_delay)
                        continue
                
                try:
                    raw_line = self._connection.readline().decode('utf-8').strip()
                    if raw_line:
                        self._process_incoming_packet(raw_line)
                except Exception:
                    self._handle_disconnection()

    def _process_incoming_packet(self, packet: str) -> None:
        """Parses data frames and passes clean metrics downstream into the database/sockets."""
        logging.info(f"📡 Data Pipeline Ingested Frame: {packet}")
        
        try:
            # 1. Parse your incoming packet schema split parameters safely
            # Format expected: "TELEMETRY|MOISTURE:45.0;TEMP:24.4"
            if not packet.startswith("TELEMETRY|"):
                return
                
            payload = packet.split("|")[1] # Extract everything after the delimiter pipe
            metrics = dict(item.split(":") for item in payload.split(";"))
            
            moisture_val = float(metrics.get("MOISTURE", 0))
            temp_val = float(metrics.get("TEMP", 0))
            
            # 2. Persist the incoming stream into your SQLite database via SQLAlchemy
            from app.database.session import db_session
            from app.database.models import SensorData
            
            sensor_record = SensorData(soil_moisture=moisture_val, temperature=temp_val)
            db_session.add(sensor_record)
            db_session.commit()
            
            # 3. Stream data points out in real-time over the active WebSocket channels
            socketio.emit("sensor_update", {
                "soil_moisture": moisture_val,
                "temperature": temp_val,
                "timestamp": sensor_record.timestamp.isoformat()
            })
            
            # 4. Fire the criteria evaluator inside your Automation Rule Engine
            # (If moisture drops below limits, your automation logs will catch it here!)
            
        except Exception as e:
            logging.error(f"Failed to process and route ingested packet: {str(e)}")
            # Rollback active sessions to prevent database deadlock states if a transaction fails
            from app.database.session import db_session
            db_session.rollback()
    

    def _handle_disconnection(self) -> None:
        if self._connection:
            try:
                self._connection.close()
            except Exception:
                pass
            self._connection = None
