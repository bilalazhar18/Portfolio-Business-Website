import json
import os
import smtplib
import urllib.parse
import urllib.request
from email.message import EmailMessage

from dotenv import load_dotenv
from flask import Flask, redirect, render_template, request, url_for


load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

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
    turnstile_enabled = get_env_bool("TURNSTILE_ENABLED", True)
    turnstile_site_key = os.getenv("TURNSTILE_SITE_KEY", "") if turnstile_enabled else ""
    if request.method == "POST":
        form_data = get_quote_form_data()

        if not all([form_data["name"], form_data["email"], form_data["phone"], form_data["message"]]):
            return contact_error("Please fill in all required fields.",
                                 turnstile_enabled=turnstile_enabled, turnstile_site_key=turnstile_site_key)

        # Verify Cloudflare Turnstile token (only when enabled)
        if turnstile_enabled:
            turnstile_token = request.form.get("cf-turnstile-response", "")
            if not verify_turnstile(turnstile_token):
                return contact_error("Security check failed. Please try again.",
                                     turnstile_enabled=turnstile_enabled, turnstile_site_key=turnstile_site_key)

        try:
            send_quote_email(form_data)
        except Exception as exc:
            app.logger.exception("Could not send quote request email")
            return contact_error(f"Could not send your request right now. Error: {exc}", 500,
                                 turnstile_enabled=turnstile_enabled, turnstile_site_key=turnstile_site_key)

        if is_ajax_request():
            return "Your quote request has been sent successfully."
        return redirect(url_for("contact", sent="1"))

    return render_template(
        "contact.html",
        form_success=request.args.get("sent") == "1",
        turnstile_enabled=turnstile_enabled,
        turnstile_site_key=turnstile_site_key,
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

    if smtp_config["use_ssl"]:
        server = smtplib.SMTP_SSL(smtp_config["host"], smtp_config["port"], timeout=20)
    else:
        server = smtplib.SMTP(smtp_config["host"], smtp_config["port"], timeout=20)

    with server:
        if smtp_config["use_starttls"]:
            server.starttls()
        server.login(smtp_config["username"], smtp_config["password"])
        server.send_message(email_message)

def contact_error(message, status_code=400, turnstile_enabled=None, turnstile_site_key=""):
    if turnstile_enabled is None:
        turnstile_enabled = get_env_bool("TURNSTILE_ENABLED", True)
    if not turnstile_site_key and turnstile_enabled:
        turnstile_site_key = os.getenv("TURNSTILE_SITE_KEY", "")
    if is_ajax_request():
        return message, status_code
    return render_template(
        "contact.html",
        form_error=message,
        turnstile_enabled=turnstile_enabled,
        turnstile_site_key=turnstile_site_key,
    ), status_code

def is_ajax_request():
    return request.headers.get("X-Requested-With") == "XMLHttpRequest"

def verify_turnstile(token):
    """Verify a Cloudflare Turnstile token with the siteverify API."""
    secret = os.getenv("TURNSTILE_SECRET_KEY", "")
    if not secret:
        app.logger.error("Turnstile verification failed: TURNSTILE_SECRET_KEY is not configured")
        return False
    if not token:
        app.logger.error("Turnstile verification failed: missing cf-turnstile-response token")
        return False
    try:
        data = urllib.parse.urlencode({
            "secret": secret,
            "response": token,
            "remoteip": request.remote_addr or "",
        }).encode()
        req = urllib.request.Request(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            data=data,
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=10) as resp:
            result = json.loads(resp.read().decode())
        if not result.get("success", False):
            app.logger.error("Turnstile verification failed: %s", result.get("error-codes", []))
            return False
        return True
    except Exception:
        app.logger.exception("Turnstile verification request failed")
        return False

def get_smtp_config():
    config = {
        "host": os.getenv("SMTP_HOST") or os.getenv("SMTP_SERVER"),
        "port": int(os.getenv("SMTP_PORT", "587")),
        "username": os.getenv("SMTP_USERNAME") or os.getenv("EMAIL_ADDRESS"),
        "password": os.getenv("SMTP_PASSWORD") or os.getenv("EMAIL_PASSWORD"),
    }
    config["use_ssl"] = get_env_bool("SMTP_USE_SSL", config["port"] == 465)
    config["use_starttls"] = get_env_bool("SMTP_USE_STARTTLS", not config["use_ssl"])

    if not all([config["host"], config["username"], config["password"]]):
        raise RuntimeError("Email is not configured yet. Please set SMTP settings and restart the app.")

    return config


def get_env_bool(name, default=False):
    value = os.getenv(name)
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


def build_quote_email(form_data, sender_email):
    email_message = EmailMessage()
    email_message["Subject"] = f"New Quote Request from {form_data['name']}"
    email_message["From"] = os.getenv("SMTP_FROM_EMAIL", sender_email)
    email_message["To"] = os.getenv("QUOTE_RECIPIENT", "info@sparknest.com.au")
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
