
import pytest
from app.schemas.schema import schema


class TestGraphQLSchema:
    """Tests for GraphQL schema."""
    
    def test_query_loans_with_payments(self):
        """Test querying loans with their payments."""
        query = """
        query {
            loans {
                id
                name
                loanPayments {
                    id
                    loanId
                    paymentDate
                }
            }
        }
        """
        
        result = schema.execute(query)
        
        assert result.errors is None or len(result.errors) == 0
        assert "loans" in result.data
        assert len(result.data["loans"]) > 0
        assert "loanPayments" in result.data["loans"][0]

