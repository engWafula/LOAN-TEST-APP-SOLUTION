# Test Queries for Loan Application API

This document contains example queries and requests you can use to test the API.

## GraphQL Queries

### Test in GraphiQL Interface
Visit `http://localhost:2024/graphql` in your browser to use the GraphiQL interface.

### 1. Get All Loans

```graphql
query {
  loans {
    id
    name
    interestRate
    principal
    dueDate
  }
}
```

### 2. Get a Single Loan by ID

```graphql
query {
  loan(id: 1) {
    id
    name
    interestRate
    principal
    dueDate
  }
}
```

### 3. Get Loan with Payments

```graphql
query {
  loan(id: 1) {
    id
    name
    interestRate
    principal
    dueDate
    loanPayments {
      id
      loanId
      paymentDate
    }
  }
}
```

### 4. Get All Loans with Their Payments

```graphql
query {
  loans {
    id
    name
    interestRate
    principal
    dueDate
    loanPayments {
      id
      loanId
      paymentDate
    }
  }
}
```

### 5. Get All Loan Payments

```graphql
query {
  loanPayments {
    id
    loanId
    paymentDate
  }
}
```

### 6. Get Payments for a Specific Loan

```graphql
query {
  loanPaymentsByLoan(loanId: 1) {
    id
    loanId
    paymentDate
  }
}
```

### 7. Complex Query - Multiple Loans with Payments

```graphql
query {
  loans {
    id
    name
    interestRate
    principal
    dueDate
    loanPayments {
      id
      loanId
      paymentDate
    }
  }
  loanPayments {
    id
    loanId
    paymentDate
  }
}
```

## REST API Requests

### Using cURL

#### 1. Health Check

```bash
curl http://localhost:2024/health
```

Expected Response:
```json
{
  "status": "healthy"
}
```

#### 2. Home Endpoint

```bash
curl http://localhost:2024/
```

Expected Response:
```json
{
  "message": "Welcome to the Loan Application API",
  "status": "healthy"
}
```

#### 3. Get All Loans

```bash
curl http://localhost:2024/api/loans
```

Expected Response:
```json
{
  "loans": [
    {
      "id": 1,
      "name": "Tom's Loan",
      "interest_rate": 5.0,
      "principal": 10000,
      "due_date": "2025-03-01"
    },
    ...
  ]
}
```

#### 4. Get All Payments

```bash
curl http://localhost:2024/api/payments
```

Expected Response:
```json
{
  "payments": [
    {
      "id": 1,
      "loan_id": 1,
      "payment_date": "2024-03-04"
    },
    ...
  ]
}
```

#### 5. Add a Payment (with date)

```bash
curl -X POST http://localhost:2024/api/payments \
  -H "Content-Type: application/json" \
  -d '{
    "loan_id": 1,
    "payment_date": "2025-03-10"
  }'
```

Expected Response:
```json
{
  "message": "Payment added successfully",
  "payment": {
    "id": 4,
    "loan_id": 1,
    "payment_date": "2025-03-10"
  }
}
```

#### 6. Add a Payment (without date - unpaid)

```bash
curl -X POST http://localhost:2024/api/payments \
  -H "Content-Type: application/json" \
  -d '{
    "loan_id": 2
  }'
```

Expected Response:
```json
{
  "message": "Payment added successfully",
  "payment": {
    "id": 5,
    "loan_id": 2,
    "payment_date": null
  }
}
```

#### 7. Error Case - Invalid Loan ID

```bash
curl -X POST http://localhost:2024/api/payments \
  -H "Content-Type: application/json" \
  -d '{
    "loan_id": 999,
    "payment_date": "2025-03-10"
  }'
```

Expected Response (400):
```json
{
  "error": "Loan with id 999 does not exist"
}
```

#### 8. Error Case - Missing loan_id

```bash
curl -X POST http://localhost:2024/api/payments \
  -H "Content-Type: application/json" \
  -d '{
    "payment_date": "2025-03-10"
  }'
```

Expected Response (400):
```json
{
  "error": "loan_id is required"
}
```

#### 9. Error Case - Invalid Date Format

```bash
curl -X POST http://localhost:2024/api/payments \
  -H "Content-Type: application/json" \
  -d '{
    "loan_id": 1,
    "payment_date": "invalid-date"
  }'
```

Expected Response (400):
```json
{
  "error": "Invalid payment_date format. Use YYYY-MM-DD"
}
```

## Using Python requests

```python
import requests

BASE_URL = "http://localhost:2024"

# Get all loans
response = requests.get(f"{BASE_URL}/api/loans")
print(response.json())

# Get all payments
response = requests.get(f"{BASE_URL}/api/payments")
print(response.json())

# Add a payment
response = requests.post(
    f"{BASE_URL}/api/payments",
    json={
        "loan_id": 1,
        "payment_date": "2025-03-10"
    }
)
print(response.json())

# GraphQL query
graphql_query = """
query {
  loans {
    id
    name
    interestRate
    principal
    dueDate
    loanPayments {
      id
      loanId
      paymentDate
    }
  }
}
"""

response = requests.post(
    f"{BASE_URL}/graphql",
    json={"query": graphql_query}
)
print(response.json())
```

## Using JavaScript/Fetch

```javascript
const BASE_URL = "http://localhost:2024";

// Get all loans
fetch(`${BASE_URL}/api/loans`)
  .then(res => res.json())
  .then(data => console.log(data));

// Add a payment
fetch(`${BASE_URL}/api/payments`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    loan_id: 1,
    payment_date: "2025-03-10"
  })
})
  .then(res => res.json())
  .then(data => console.log(data));

// GraphQL query
const graphqlQuery = `
  query {
    loans {
      id
      name
      interestRate
      principal
      dueDate
      loanPayments {
        id
        loanId
        paymentDate
      }
    }
  }
`;

fetch(`${BASE_URL}/graphql`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ query: graphqlQuery })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

## Testing Checklist

- [ ] Health check endpoint returns 200
- [ ] Get all loans returns 4 loans
- [ ] Get all payments returns 3 payments
- [ ] GraphQL query for all loans works
- [ ] GraphQL query for single loan works
- [ ] GraphQL query includes loan payments
- [ ] Add payment with valid data succeeds
- [ ] Add payment without date succeeds (unpaid)
- [ ] Add payment with invalid loan_id fails
- [ ] Add payment with invalid date format fails
- [ ] Add payment without loan_id fails


