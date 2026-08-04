"""Application Factory Pattern initialization matching high-performance concurrency."""
import logging
from flask import Flask
from flask_socketio import SocketIO
from app.core.config import Settings
from app.database.session import db_session, init_db
from app.api.v1 import register_blueprints
from app.websocket import socketio
from app.utils.logger import setup_logging
from app.hardware.serial_manager import ResilientSerialManager 

def create_app(settings: Settings) -> tuple[Flask, SocketIO]:
    """Configures and initializes the Flask and SocketIO runtime contexts."""
    setup_logging(settings.LOG_LEVEL)
    
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(settings)
    
    # Initialize Persistent Infrastructure
    init_db(settings.DATABASE_URL)
    
    # Register API Blueprints
    register_blueprints(app)
    
    # Bind WebSocket Server
    socketio.init_app(app, cors_allowed_origins="*")
    
    @app.teardown_appcontext
    def shutdown_session(exception=None):
        db_session.remove()

    # Update this line to pass the active 'app' context variable 
    serial_manager = ResilientSerialManager(app=app, port=settings.SERIAL_PORT, baud_rate=settings.SERIAL_BAUD)
    serial_manager.start_monitoring_loop()    
        
    logging.info("MoKis OS Framework Engine Initialization Complete.")
    return app, socketio
