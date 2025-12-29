
import json
import datetime
import pytest


class TestRestRoutes:
    """Tests for REST API endpoints."""
    
    
    def test_add_payment_success(self, client):
        """Test adding a payment successfully."""
        payload = {
            "loan_id": 1,
            "payment_date": "2025-03-10",
            "amount": 100.00
        }
        
        response = client.post(
            "/api/payments",
            data=json.dumps(payload),
            content_type="application/json"
        )
        
        assert response.status_code == 201
        data = json.loads(response.data)
        assert "message" in data
        assert "payment" in data
        assert data["payment"]["loan_id"] == 1
    
    def test_add_payment_without_date(self, client):
        """Test adding a payment without date should fail validation."""
        payload = {
            "loan_id": 1,
            "amount": 100.00
        }
        
        response = client.post(
            "/api/payments",
            data=json.dumps(payload),
            content_type="application/json"
        )
        
        assert response.status_code == 400
        data = json.loads(response.data)
        assert "error" in data
        assert "payment_date" in str(data).lower() or "required" in str(data).lower()
    
    def test_add_payment_missing_loan_id(self, client):
        """Test adding a payment without loan_id."""
        payload = {}
        
        response = client.post(
            "/api/payments",
            data=json.dumps(payload),
            content_type="application/json"
        )
        
        assert response.status_code == 400
        data = json.loads(response.data)
        assert "error" in data
    
    def test_add_payment_invalid_loan_id(self, client):
        """Test adding a payment for non-existent loan."""
        payload = {
            "loan_id": 999,
            "payment_date": "2025-03-10",
            "amount": 100.00
        }
        
        response = client.post(
            "/api/payments",
            data=json.dumps(payload),
            content_type="application/json"
        )
        
        assert response.status_code == 400
        data = json.loads(response.data)
        assert "error" in data
    
    
    def test_add_payment_empty_body(self, client):
        """Test adding a payment with empty body."""
        response = client.post(
            "/api/payments",
            data=json.dumps({}),
            content_type="application/json"
        )
        
        assert response.status_code == 400
        data = json.loads(response.data)
        assert "error" in data
    
    def test_add_payment_without_amount(self, client):
        """Test adding a payment without amount should fail validation."""
        payload = {
            "loan_id": 1,
            "payment_date": "2025-03-10"
        }
        
        response = client.post(
            "/api/payments",
            data=json.dumps(payload),
            content_type="application/json"
        )
        
        assert response.status_code == 400
        data = json.loads(response.data)
        assert "error" in data
        assert "amount" in str(data).lower() or "required" in str(data).lower()
    
    def test_add_payment_invalid_date_format(self, client):
        """Test adding a payment with invalid date format."""
        payload = {
            "loan_id": 1,
            "payment_date": "invalid-date",
            "amount": 100.00
        }
        
        response = client.post(
            "/api/payments",
            data=json.dumps(payload),
            content_type="application/json"
        )
        
        assert response.status_code == 400
        data = json.loads(response.data)
        assert "error" in data

