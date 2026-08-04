"""Centralized platform logging systems initialization helper configuration script."""
import logging
import sys

def setup_logging(log_level_label: str = "INFO") -> None:
    """Binds clean runtime format mapping styles down onto standard outputs."""
    level = getattr(logging, log_level_label.upper(), logging.INFO)
    
    logging.basicConfig(
        level=level,
        format="[%(asctime)s] [%(levelname)s] [%(filename)s:%(lineno)d]: %(message)s",
        handlers=[
            logging.StreamHandler(sys.stdout)
        ]
    )
