import os
import smtplib
from email.message import EmailMessage

from dotenv import load_dotenv
from flask import Flask, redirect, render_template, request, url_for


load_dotenv()

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/services")
def services():
    return render_template("services.html")

@app.route("/pricing")
def pricing():
    return render_template("pricing.html")

@app.route("/privacy")
def privacy():
    return render_template("privacy.html")

@app.route("/faq")
def faq():
    return render_template("faq.html")

@app.route("/termsConditions")
def terms_conditions():
    return render_template("terms_conditions.html")

@app.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        form_data = get_quote_form_data()

        if not all([form_data["name"], form_data["email"], form_data["phone"], form_data["message"]]):
            return contact_error("Please fill in all required fields.")

        try:
            send_quote_email(form_data)
        except Exception as exc:
            app.logger.exception("Could not send quote request email")
            return contact_error(f"Could not send your request right now. Error: {exc}", 500)

        if is_ajax_request():
            return "Your quote request has been sent successfully."
        return redirect(url_for("contact", sent="1"))

    return render_template(
        "contact.html",
        form_success=request.args.get("sent") == "1",
    )

def get_quote_form_data():
    return {
        "name": request.form.get("name", "").strip(),
        "email": request.form.get("email", "").strip(),
        "phone": request.form.get("phone", "").strip(),
        "message": request.form.get("message", "").strip(),
    }

def send_quote_email(form_data):
    smtp_config = get_smtp_config()
    email_message = build_quote_email(form_data, smtp_config["username"])

    with smtplib.SMTP(smtp_config["host"], smtp_config["port"]) as server:
        server.starttls()
        server.login(smtp_config["username"], smtp_config["password"])
        server.send_message(email_message)

def contact_error(message, status_code=400):
    if is_ajax_request():
        return message, status_code
    return render_template("contact.html", form_error=message), status_code

def is_ajax_request():
    return request.headers.get("X-Requested-With") == "XMLHttpRequest"

def get_smtp_config():
    config = {
        "host": os.getenv("SMTP_HOST") or os.getenv("SMTP_SERVER"),
        "port": int(os.getenv("SMTP_PORT", "587")),
        "username": os.getenv("SMTP_USERNAME") or os.getenv("EMAIL_ADDRESS"),
        "password": os.getenv("SMTP_PASSWORD") or os.getenv("EMAIL_PASSWORD"),
    }

    if not all([config["host"], config["username"], config["password"]]):
        raise RuntimeError("Email is not configured yet. Please set SMTP settings and restart the app.")

    return config


def build_quote_email(form_data, sender_email):
    email_message = EmailMessage()
    email_message["Subject"] = f"New Quote Request from {form_data['name']}"
    email_message["From"] = os.getenv("SMTP_FROM_EMAIL", sender_email)
    email_message["To"] = os.getenv("QUOTE_RECIPIENT", "bilalazhar125@gmail.com")
    email_message["Reply-To"] = form_data["email"]
    email_message.set_content(
        f"Name: {form_data['name']}\n"
        f"Email: {form_data['email']}\n"
        f"Phone: {form_data['phone']}\n"
        f"Message:\n{form_data['message']}\n"
    )
    return email_message


if __name__ == "__main__":
    app.run(debug=True)
