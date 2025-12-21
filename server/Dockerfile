ARG PYTHON_VERSION=3.9.19
FROM python:${PYTHON_VERSION}-slim as base

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser

# Install dependencies as root
RUN --mount=type=cache,target=/root/.cache/pip \
    --mount=type=bind,source=requirements.txt,target=requirements.txt \
    python -m pip install --no-cache-dir --upgrade pip && \
    python -m pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY --chown=appuser:appuser . .

# Switch to non-root user
USER appuser

EXPOSE 5000

# Use environment variables for configuration
ENV FLASK_APP=app.py
ENV FLASK_ENV=production

CMD ["python", "app.py"]
