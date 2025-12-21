import logging
from app import create_app
from app.config import Config

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(levelname)s %(name)s %(message)s'
)

app = create_app(Config)

if __name__ == "__main__":
    app.run(
        host=app.config["HOST"],
        port=app.config["PORT"],
        debug=app.config["DEBUG"]
    )
