from flask import Flask, redirect, url_for, render_template

app = Flask(__name__)

# @app.route('/<name>')
# def home(name):
#     return render_template('index.html', content=name)


@app.route('/<name>')
def home(name):
    return render_template('index.html', content=['Tony', 'steve', 'peter', 'Ashwin', 'Sairam', 'varman', 'Kishan', 'Menaga'])

if __name__ == "__main__":
    app.run()
