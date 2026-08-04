"""Strict protocol tracking parser processing custom bounded serial frames."""
from datetime import datetime
from app.core.domain.exceptions import HardwareCommunicationException

class TelemetryPacketParser:
    """Verifies physical string lines and transforms verified structures into type safe mappings."""
    
    @staticmethod
    def parse_raw_line(line: str) -> dict:
        """Validates standard syntax framing rules (e.g. 'TELEMETRY|MOISTURE:45.2;TEMP:23.1')."""
        if not line.startswith("TELEMETRY|"):
            raise HardwareCommunicationException("Mismatched data structure packet alignment pattern.", "SERIAL_MALFORMED_HEADER")
        
        try:
            body = line.split("|")[1]
            segments = body.split(";")
            data_map = {}
            for item in segments:
                k, v = item.split(":")
                data_map[k.strip().lower()] = float(v)
                
            if "moisture" not in data_map or "temp" not in data_map:
                raise HardwareCommunicationException("Required metrics missing from internal packet data mapping.", "SERIAL_INCOMPLETE_PAYLOAD")
                
            return {
                "soil_moisture": data_map["moisture"],
                "temperature": data_map["temp"],
                "timestamp": datetime.utcnow()
            }
        except Exception as e:
            if isinstance(e, HardwareCommunicationException): raise e
            raise HardwareCommunicationException(f"Parsing engine cracked under structural input error: {str(e)}", "SERIAL_PARSE_ERROR")
