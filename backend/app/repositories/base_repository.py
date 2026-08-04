"""Generic CRUD base isolation layout separating execution pipelines."""
from typing import Generic, TypeVar, Type, Optional, List
from app.database.session import db_session
from app.database.models import Base

T = TypeVar('T', bound=Base)

class BaseRepository(Generic[T]):
    """Encapsulates core read and write actions to guarantee persistence safety layers."""
    def __init__(self, model_cls: Type[T]):
        self.model_cls = model_cls

    def get_by_id(self, entity_id: str | int) -> Optional[T]:
        return db_session.query(self.model_cls).get(entity_id)

    def get_all(self, limit: int = 100) -> List[T]:
        return db_session.query(self.model_cls).limit(limit).all()

    def add(self, entity: T) -> T:
        db_session.add(entity)
        db_session.commit()
        return entity
