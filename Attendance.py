from datetime import datetime
from typing import Dict, List, Optional
from dataclasses import dataclass
import fpdf  # for PDF generation

@dataclass
class Attendee:
    user_id: int
    name: str
    email: str
    is_present: bool

class AttendanceTracker:
    def __init__(self, db_connection):
        self.db = db_connection

    def mark_attendance(self, event_id: int, user_id: int) -> bool:
        """Mark an attendee as present for an event"""
        try:
            query = """
                UPDATE registrations 
                SET is_present = TRUE, attendance_marked_at = CURRENT_TIMESTAMP
                WHERE event_id = %s AND user_id = %s
                RETURNING registration_id
            """
            result = self.db.execute(query, (event_id, user_id))
            return bool(result.rowcount)
        except Exception as e:
            print(f"Error marking attendance: {e}")
            return False

    def get_event_attendance(self, event_id: int) -> Dict:
        """Get attendance data for an event"""
        try:
            query = """
                SELECT 
                    e.title,
                    COUNT(r.registration_id) as total_registered,
                    SUM(CASE WHEN r.is_present THEN 1 ELSE 0 END) as total_present,
                    u.user_id,
                    u.name,
                    u.email,
                    r.is_present
                FROM events e
                JOIN registrations r ON e.event_id = r.event_id
                JOIN users u ON r.user_id = u.user_id
                WHERE e.event_id = %s
                GROUP BY e.title, u.user_id, u.name, u.email, r.is_present
            """
            result = self.db.execute(query, (event_id,))
            return self._process_attendance_data(result)
        except Exception as e:
            print(f"Error getting")
