"""Abstract Contract interfaces separating low level IO from the application services."""
import abc

class AbstractSerialManager(abc.ABC):
    """Enforces boundaries around hardware communication pipelines."""
    
    @abc.abstractmethod
    def start_monitoring_loop(self) -> None:
        """Asynchronously begins the hardware scanning engine loop."""
        pass

    @abc.abstractmethod
    def write_command(self, action: str, target: str) -> bool:
        """Dispatches an structural mutation command buffer to the physical microcontroller."""
        pass

    @abc.abstractmethod
    def terminate(self) -> None:
        """Gracefully closes active serial communication loops and drops resources."""
        pass
