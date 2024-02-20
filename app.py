from flask import Flask, render_template #Creates Flask instance. Render HTML templates

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(host='0.0.0.0')# host='0.0.0.0' Allows access from any device on the same network.