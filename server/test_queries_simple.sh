#!/bin/bash

# Simple test queries script (no jq required)
# Make sure the server is running on http://localhost:2024

BASE_URL="http://localhost:2024"

echo "=========================================="
echo "Testing Loan Application API"
echo "=========================================="
echo ""

echo "1. Health Check:"
curl -s "$BASE_URL/health"
echo -e "\n"

echo "2. Home Endpoint:"
curl -s "$BASE_URL/"
echo -e "\n"

echo "3. GET /api/loans:"
curl -s "$BASE_URL/api/loans"
echo -e "\n"

echo "4. GET /api/payments:"
curl -s "$BASE_URL/api/payments"
echo -e "\n"

echo "5. POST /api/payments (with date):"
curl -s -X POST "$BASE_URL/api/payments" \
  -H "Content-Type: application/json" \
  -d '{"loan_id": 1, "payment_date": "2025-03-10"}'
echo -e "\n"

echo "6. POST /api/payments (without date):"
curl -s -X POST "$BASE_URL/api/payments" \
  -H "Content-Type: application/json" \
  -d '{"loan_id": 2}'
echo -e "\n"

echo "7. POST /api/payments (error - invalid loan_id):"
curl -s -X POST "$BASE_URL/api/payments" \
  -H "Content-Type: application/json" \
  -d '{"loan_id": 999, "payment_date": "2025-03-10"}'
echo -e "\n"

echo "8. GraphQL - Get All Loans:"
curl -s -X POST "$BASE_URL/graphql" \
  -H "Content-Type: application/json" \
  -d '{"query": "query { loans { id name interestRate principal dueDate } }"}'
echo -e "\n"

echo "9. GraphQL - Get Loan with Payments:"
curl -s -X POST "$BASE_URL/graphql" \
  -H "Content-Type: application/json" \
  -d '{"query": "query { loan(id: 1) { id name interestRate principal dueDate loanPayments { id loanId paymentDate } } }"}'
echo -e "\n"

echo "10. GraphQL - Get All Payments:"
curl -s -X POST "$BASE_URL/graphql" \
  -H "Content-Type: application/json" \
  -d '{"query": "query { loanPayments { id loanId paymentDate } }"}'
echo -e "\n"

echo "=========================================="
echo "Testing Complete!"
echo "=========================================="


