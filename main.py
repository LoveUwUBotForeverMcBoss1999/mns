from flask import Flask, send_from_directory, abort

app = Flask(__name__)

# Serve static files like .html, .css, .js, images from the root directory
@app.route('/', defaults={'filename': 'index.html'})
@app.route('/<path:filename>')
def serve_files(filename):
    try:
        return send_from_directory('.', filename)
    except Exception as e:
        abort(404)

if __name__ == '__main__':
    app.run(debug=True)
