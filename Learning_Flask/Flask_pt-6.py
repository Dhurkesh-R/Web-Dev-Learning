from flask import Flask, redirect, url_for, render_template, request, session, flash
from datetime import timedelta

app = Flask(__name__)
app.secret_key = "hello"
app.permanent_session_lifetime = timedelta(days=5)

@app.route('/')
def home():
    return render_template('index-2.html')

@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == "POST":
        session.permanent = True
        user = request.form['nm']
        session['user'] = user
        flash("Login Successful!")
        return redirect(url_for("user"))
    else:
        if 'user' in session:
            flash('Already logged In!')
            return redirect(url_for('user'))
        
        return render_template('login-2.html')

@app.route('/user')
def user():
    if 'user' in session:
        user = session['user']
        return render_template('user.html', user=user)
    
    else:
        flash("You are not logged in!")
        return redirect(url_for('login'))
    
@app.route("/logout")
def logout():
    flash("You have been logged out!")
    session.pop("user", None)
    return redirect(url_for("login"))

if __name__ == "__main__":
    app.run(debug=True)
