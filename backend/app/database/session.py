"""Durable Scoped Session management bindings wrapper for SQLite Engine contexts."""
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from app.database.models import Base

engine = None
db_session = scoped_session(sessionmaker(autocommit=False, autoflush=False))

def init_db(database_url: str) -> None:
    """Locks local database configuration bindings and executes global base synchronization hooks."""
    global engine
    engine = create_engine(database_url, connect_args={"check_same_thread": False})
    db_session.configure(bind=engine)
    Base.metadata.create_all(bind=engine)
