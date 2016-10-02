from flask import Flask
from routes import main as todo_routes
app = Flask(__name__)
app.secret_key = 'skey'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.register_blueprint(todo_routes, url_prefix='/todo')

if __name__ == '__main__':
    config = dict(
        debug=True,
        host='0.0.0.0',
        port=80,
        threaded=True,
    )
    app.run(**config)
