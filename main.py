from flask import Flask, send_from_directory, abort

app = Flask(__name__)

@app.route('/', defaults={'filename': 'index.html'})
@app.route('/<path:filename>')
def serve_files(filename):
    try:
        # Serve the requested file from the root directory
        return send_from_directory('.', filename)
    except:
        # If the file is not found, return a 404 error
        abort(404)

if __name__ == '__main__':
    app.run(debug=True)
