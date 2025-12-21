.PHONY: help install test run docker-build docker-up docker-down clean

help:
	@echo "Available commands:"
	@echo "  make install     - Install dependencies"
	@echo "  make test        - Run tests"
	@echo "  make run         - Run the application"
	@echo "  make docker-build - Build Docker image"
	@echo "  make docker-up   - Start Docker containers"
	@echo "  make docker-down - Stop Docker containers"
	@echo "  make clean       - Clean up generated files"

install:
	pip install -r requirements.txt

test:
	pytest

test-cov:
	pytest --cov=app --cov-report=html

run:
	python app.py

docker-build:
	docker compose build

docker-up:
	docker compose up -d

docker-down:
	docker compose down

clean:
	find . -type d -name __pycache__ -exec rm -r {} +
	find . -type f -name "*.pyc" -delete
	find . -type d -name "*.egg-info" -exec rm -r {} +
	rm -rf .pytest_cache
	rm -rf htmlcov
	rm -rf .coverage

