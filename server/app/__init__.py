import logging
from flask import Flask
from flask_cors import CORS
from flask_graphql import GraphQLView
from app.config import Config
from app.schemas.schema import schema
from app.routes.rest import rest_bp
from app.errors import register_error_handlers


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    CORS(app, resources={r"/*": {"origins": "*"}})
    
    log_level = getattr(config_class, "LOG_LEVEL", "INFO")
    logging.basicConfig(
        level=getattr(logging, log_level),
        format='%(asctime)s %(levelname)s %(name)s %(message)s'
    )
    
    register_error_handlers(app)
    
    app.add_url_rule(
        "/graphql",
        view_func=GraphQLView.as_view(
            "graphql",
            schema=schema,
            graphiql=app.config.get("GRAPHIQL_ENABLED", True)
        )
    )
    
    app.register_blueprint(rest_bp)
    
    @app.route("/")
    def home():
        return {"message": "Welcome to the Loan Application API", "status": "healthy"}
    
    @app.route("/health")
    def health():
        return {"status": "healthy"}
    
    return app

