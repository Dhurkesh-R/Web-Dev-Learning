from flask import Flask, redirect, url_for, render_template, request, session, flash
from datetime import timedelta
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.secret_key = "hello"
app.permanent_session_lifetime = timedelta(days=5)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Users(db.Model):  # Class name should be capitalized
    _id = db.Column("id", db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))

    def __init__(self, name, email):  # Correct the order of parameters
        self.name = name
        self.email = email

@app.route('/')
def home():
    return render_template('index-2.html')

@app.route("/view")
def view():
    return render_template("view.html", values=Users.query.all())

@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == "POST":
        session.permanent = True
        user = request.form['nm']
        session['user'] = user

        found_user = Users.query.filter_by(name=user).first()
        if found_user:
            session["email"] = found_user.email
        else:
            usr = Users(user, "")
            db.session.add(usr)
            db.session.commit()

        flash("Login Successful!")
        return redirect(url_for("user"))
    else:
        if 'user' in session:
            flash('Already logged In!')
            return redirect(url_for('user'))
        
        return render_template('login-2.html')

@app.route('/user', methods=["POST", "GET"])
def user():
    email = None
    if 'user' in session:
        user = session['user']

        if request.method == "POST":
            email = request.form['email']
            session["email"] = email
            found_user = Users.query.filter_by(name=user).first()
            if found_user:  # Add this check
                found_user.email = email
                db.session.commit()
                flash("Email was saved!")
        
        else:
            if 'email' in session:
                email = session['email']

        return render_template('user.html', email=email)
    else:
        flash("You are not logged in!")
        return redirect(url_for('login'))

@app.route("/logout")
def logout():
    flash("You have been logged out!")
    session.pop("user", None)
    session.pop("email", None)
    return redirect(url_for("login"))

if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # Ensure the database tables are created
    app.run(debug=True)
