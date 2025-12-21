![Numida](./logo.numida.png)

# SERVER SETUP INSTRUCTIONS

This is a python server and requires that you have `python 3.9+` installed on your machine.

## Installation

> You will need docker installed in order to run the server

1. Change directory to the server folder `cd server`
2. Build and run the server `docker compose up --build`
3. Confirm your application is available at http://localhost:2024

## Local Development (Without Docker)

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the application:
   ```bash
   python app.py
   ```

4. Or use Makefile:
   ```bash
   make install
   make run
   ```

## Running Tests

```bash
# Run all tests
pytest

# Run tests with coverage
pytest --cov=app --cov-report=html

# Or use Makefile
make test
make test-cov
```

## Project Structure

```
server/
├── app/
│   ├── __init__.py          # Application factory
│   ├── config.py            # Configuration management
│   ├── errors.py            # Error handlers
│   ├── models/              # Data models
│   │   ├── __init__.py
│   │   └── loan.py
│   ├── schemas/             # GraphQL schemas
│   │   ├── __init__.py
│   │   └── schema.py
│   ├── services/            # Business logic
│   │   ├── __init__.py
│   │   └── loan_service.py
│   └── routes/              # REST API routes
│       ├── __init__.py
│       └── rest.py
├── tests/                   # Unit tests
│   ├── __init__.py
│   ├── conftest.py
│   ├── test_models.py
│   ├── test_services.py
│   ├── test_routes.py
│   └── test_graphql.py
├── app.py                   # Application entry point
├── requirements.txt         # Python dependencies
├── pytest.ini              # Pytest configuration
├── Dockerfile              # Docker configuration
├── compose.yaml            # Docker Compose configuration
└── Makefile                # Make commands
```

## API Documentation

### GraphQL Endpoint

**URL:** `/graphql`

**Method:** `POST`

**Description:** This endpoint allows you to query loan products and loan applications using GraphQL.

**Example Queries:**

To get all loans:
```graphql
{
  loans {
    id
    name
    interestRate
    principal
    dueDate
  }
}
```

To get a single loan with payments:
```graphql
{
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

To get all loan payments:
```graphql
{
  loanPayments {
    id
    loanId
    paymentDate
  }
}
```

To get payments for a specific loan:
```graphql
{
  loanPaymentsByLoan(loanId: 1) {
    id
    loanId
    paymentDate
  }
}
```

### REST Endpoints

#### Home Endpoint

**URL:** `/`  
**Method:** `GET`

**Description:** This endpoint returns a welcome message.

**Response:**
```json
{
  "message": "Welcome to the Loan Application API",
  "status": "healthy"
}
```

#### Health Check

**URL:** `/health`  
**Method:** `GET`

**Description:** Health check endpoint for monitoring.

**Response:**
```json
{
  "status": "healthy"
}
```

#### Get All Loans

**URL:** `/api/loans`  
**Method:** `GET`

**Description:** Get all loans.

**Response:**
```json
{
  "loans": [
    {
      "id": 1,
      "name": "Tom's Loan",
      "interest_rate": 5.0,
      "principal": 10000,
      "due_date": "2025-03-01"
    }
  ]
}
```

#### Get All Payments

**URL:** `/api/payments`  
**Method:** `GET`

**Description:** Get all loan payments.

**Response:**
```json
{
  "payments": [
    {
      "id": 1,
      "loan_id": 1,
      "payment_date": "2024-03-04"
    }
  ]
}
```

#### Add Payment

**URL:** `/api/payments`  
**Method:** `POST`

**Description:** Add a new payment.

**Request Body:**
```json
{
  "loan_id": 1,
  "payment_date": "2025-03-10"
}
```

**Response:**
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

**Error Response (400):**
```json
{
  "error": "Loan with id 999 does not exist"
}
```

## Configuration

Configuration is managed through environment variables. See `.env.example` for available options.

Key environment variables:
- `SECRET_KEY`: Flask secret key (required in production)
- `FLASK_DEBUG`: Enable debug mode (default: False)
- `HOST`: Server host (default: 0.0.0.0)
- `PORT`: Server port (default: 5000)
- `GRAPHIQL_ENABLED`: Enable GraphiQL interface (default: True)
- `LOG_LEVEL`: Logging level (default: INFO)

## Production Deployment

1. Set environment variables (especially `SECRET_KEY`)
2. Set `FLASK_DEBUG=False`
3. Set `GRAPHIQL_ENABLED=False` for production
4. Use a production WSGI server like Gunicorn:
   ```bash
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:5000 app:app
   ```

## Testing

The project includes comprehensive unit tests covering:
- Models (Loan, LoanPayment)
- Services (LoanService)
- REST API routes
- GraphQL schema

Run tests with:
```bash
pytest
```

Generate coverage report:
```bash
pytest --cov=app --cov-report=html
```

## Code Quality

The codebase follows best practices:
- Separation of concerns (models, services, routes, schemas)
- Comprehensive error handling
- Logging for debugging and monitoring
- Unit tests with high coverage
- Production-ready configuration management
- Docker support for containerization
