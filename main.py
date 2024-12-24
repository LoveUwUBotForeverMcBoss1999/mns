from flask import Flask, send_from_directory

app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')  # Serve index.html from the root directory

@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory('.', filename)  # Serve other files from the root directory

if __name__ == '__main__':
    app.run(debug=True)
