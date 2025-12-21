#!/bin/bash

# Test queries script for Loan Application API
# Make sure the server is running on http://localhost:2024

BASE_URL="http://localhost:2024"

echo "=========================================="
echo "Testing Loan Application API"
echo "=========================================="
echo ""

echo "1. Testing Health Check..."
curl -s "$BASE_URL/health" | jq .
echo ""

echo "2. Testing Home Endpoint..."
curl -s "$BASE_URL/" | jq .
echo ""

echo "3. Testing GET /api/loans..."
curl -s "$BASE_URL/api/loans" | jq .
echo ""

echo "4. Testing GET /api/payments..."
curl -s "$BASE_URL/api/payments" | jq .
echo ""

echo "5. Testing POST /api/payments (with date)..."
curl -s -X POST "$BASE_URL/api/payments" \
  -H "Content-Type: application/json" \
  -d '{
    "loan_id": 1,
    "payment_date": "2025-03-10"
  }' | jq .
echo ""

echo "6. Testing POST /api/payments (without date)..."
curl -s -X POST "$BASE_URL/api/payments" \
  -H "Content-Type: application/json" \
  -d '{
    "loan_id": 2
  }' | jq .
echo ""

echo "7. Testing POST /api/payments (error - invalid loan_id)..."
curl -s -X POST "$BASE_URL/api/payments" \
  -H "Content-Type: application/json" \
  -d '{
    "loan_id": 999,
    "payment_date": "2025-03-10"
  }' | jq .
echo ""

echo "8. Testing GraphQL Query - Get All Loans..."
curl -s -X POST "$BASE_URL/graphql" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { loans { id name interestRate principal dueDate } }"
  }' | jq .
echo ""

echo "9. Testing GraphQL Query - Get Loan with Payments..."
curl -s -X POST "$BASE_URL/graphql" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { loan(id: 1) { id name interestRate principal dueDate loanPayments { id loanId paymentDate } } }"
  }' | jq .
echo ""

echo "10. Testing GraphQL Query - Get All Payments..."
curl -s -X POST "$BASE_URL/graphql" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { loanPayments { id loanId paymentDate } }"
  }' | jq .
echo ""

echo "=========================================="
echo "Testing Complete!"
echo "=========================================="


