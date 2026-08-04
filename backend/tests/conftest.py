"""Central testing fixtures isolating runtime system persistence context engines."""
import pytest
from app.core.config import Settings
from app.database.session import db_session, Base
from sqlalchemy import create_engine

@pytest.fixture(scope="function")
def mock_db_context():
    """Creates a clean, short-lived in-memory database instance for isolated test operations."""
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(bind=engine)
    db_session.configure(bind=engine)
    yield db_session
    db_session.remove()
    Base.metadata.drop_all(bind=engine)
