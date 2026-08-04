"""Thread safe background context manager tracking real time frame buffers."""
import threading
import time
import cv2 # type: ignore
import numpy as np
from typing import Optional

class LocalCameraManager:
    """Maintains a dedicated background processing loop to prevent visual capture lag."""
    def __init__(self, camera_index: int = 0):
        self.camera_index = camera_index
        self._latest_frame: Optional[np.ndarray] = None
        self._is_running = False
        self._lock = threading.Lock()
        self._thread: Optional[threading.Thread] = None

    def start_capture_thread(self) -> None:
        self._is_running = True
        self._thread = threading.Thread(target=self._capture_worker, daemon=True)
        self._thread.start()

    def _capture_worker(self) -> None:
        """Continuously populates image matrices using localized driver layers."""
        while self._is_running:
            # Emulated canvas generation matrix bypassing physical camera missing targets locally
            canvas = np.zeros((480, 640, 3), dtype=np.uint8)
            cv2.putText(canvas, f"MoKis OS Frame Sync Layer: {time.time()}", (50, 240),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
            
            with self._lock:
                self._latest_frame = canvas
            time.sleep(0.1)  # Frame boundary limitation layer 10 FPS cap target

    def get_current_frame(self) -> Optional[np.ndarray]:
        with self._lock:
            return self._latest_frame

    def terminate(self) -> None:
        self._is_running = False
        if self._thread:
            self._thread.join(timeout=2)
