"""
Date utility functions for consistent date handling across the application.
Uses pytz for timezone-aware operations when needed.
"""
import datetime
from typing import Optional
from pytz import UTC


def parse_date(date_string: Optional[str]) -> Optional[datetime.date]:
    """
    Parse a date string in ISO format (YYYY-MM-DD) to a date object.
    
    Args:
        date_string: Date string in ISO format, or None
        
    Returns:
        Parsed date object or None if input is None or invalid
        
    Raises:
        ValueError: If date_string is not None and cannot be parsed
    """
    if date_string is None:
        return None
    
    try:
        return datetime.datetime.strptime(date_string, '%Y-%m-%d').date()
    except (ValueError, TypeError) as e:
        raise ValueError(f"Invalid date format. Expected YYYY-MM-DD, got: {date_string}") from e


def format_date(date: Optional[datetime.date]) -> Optional[str]:
    """
    Format a date object to ISO format string (YYYY-MM-DD).
    
    Args:
        date: Date object or None
        
    Returns:
        ISO format date string or None if input is None
    """
    if date is None:
        return None
    
    return date.isoformat()


def get_current_date() -> datetime.date:
    """
    Get the current date in UTC.
    
    Returns:
        Current date in UTC
    """
    return datetime.datetime.now(UTC).date()


def days_between(start_date: datetime.date, end_date: datetime.date) -> int:
    """
    Calculate the number of days between two dates.
    
    Args:
        start_date: Start date
        end_date: End date
        
    Returns:
        Number of days between dates (can be negative if end_date < start_date)
    """
    return (end_date - start_date).days

