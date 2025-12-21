"""
Unit tests for GraphQL schema.
"""
import pytest
from app.schemas.schema import schema


class TestGraphQLSchema:
    """Tests for GraphQL schema."""
    
    def test_query_all_loans(self):
        """Test querying all loans."""
        query = """
        query {
            loans {
                loans {
                    id
                    name
                    interestRate
                    principal
                    dueDate
                }
                pagination {
                    total
                }
            }
        }
        """
        
        result = schema.execute(query)
        
        assert result.errors is None or len(result.errors) == 0
        assert "loans" in result.data
        assert "loans" in result.data["loans"]
        assert len(result.data["loans"]["loans"]) == 4
        assert result.data["loans"]["pagination"]["total"] == 4
    
    def test_query_loans_with_payments(self):
        """Test querying loans with their payments."""
        query = """
        query {
            loans {
                loans {
                    id
                    name
                    loanPayments {
                        id
                        loanId
                        paymentDate
                    }
                }
                pagination {
                    total
                }
            }
        }
        """
        
        result = schema.execute(query)
        
        assert result.errors is None or len(result.errors) == 0
        assert "loans" in result.data
        assert len(result.data["loans"]["loans"]) > 0
        assert "loanPayments" in result.data["loans"]["loans"][0]
    
    def test_query_loans_with_pagination(self):
        """Test querying loans with pagination."""
        query = """
        query {
            loans(page: 1, pageSize: 2) {
                loans {
                    id
                    name
                }
                pagination {
                    page
                    pageSize
                    total
                    totalPages
                    hasNext
                    hasPrev
                }
            }
        }
        """
        
        result = schema.execute(query)
        
        assert result.errors is None or len(result.errors) == 0
        assert "loans" in result.data
        assert len(result.data["loans"]["loans"]) == 2
        assert result.data["loans"]["pagination"]["page"] == 1
        assert result.data["loans"]["pagination"]["pageSize"] == 2
        assert result.data["loans"]["pagination"]["hasNext"] is True

