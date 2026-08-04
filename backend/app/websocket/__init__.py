"""WebSocket setup utilizing structural Flask wrapper initializations."""
from flask_socketio import SocketIO # type: ignore
from app.websocket.events import CoreSystemWebSocketNamespace

socketio = SocketIO()
socketio.on_namespace(CoreSystemWebSocketNamespace("/"))
