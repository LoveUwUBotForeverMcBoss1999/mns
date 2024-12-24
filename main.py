from flask import Flask, send_from_directory, abort

app = Flask(__name__)

@app.route('/')
def index():
    try:
        return send_from_directory('.', 'index.html')
    except Exception as e:
        return f"Error loading index.html: {str(e)}", 500

@app.route('/<path:filename>')
def static_files(filename):
    try:
        return send_from_directory('.', filename)
    except Exception as e:
        return f"Error loading {filename}: {str(e)}", 404

if __name__ == '__main__':
    app.run(debug=True)
