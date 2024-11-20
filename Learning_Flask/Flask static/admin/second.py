from flask import Blueprint, render_template

second = Blueprint("second", __name__, static_folder="static", template_folder="templates")

@second.route("/hello")
@second.route("/")
def hello():
    return "<h1>Hello!</h1>"

@second.route("/test")
def test():
    return "<h1>Testing</h1>"