# SparkNest Portfolio Website

SparkNest is a Flask-based business portfolio website for showcasing IT and software services. The site includes company information, service offerings, client-focused pages, legal pages, FAQs, and a contact form for quote requests.

## Features

- Responsive homepage with hero, about, services, portfolio, testimonials, FAQ, and quote sections
- Services page for software development, AI innovation, Shopify, WordPress, mobile apps, maintenance, and UI/UX design
- About, clients, privacy policy, FAQ, and terms and conditions pages
- Contact form with SMTP email support
- Static assets managed through Flask templates and the `static` folder

## Tech Stack

- Python
- Flask
- Jinja2 templates
- HTML, CSS, JavaScript
- python-dotenv for environment configuration

## Project Structure

```text
portfolio/
+-- app.py
+-- requirements.txt
+-- .env.example
+-- static/
|   +-- css/
|   +-- img/
|   +-- js/
+-- templates/
    +-- layouts/
    +-- partials/
    +-- index.html
    +-- services.html
    +-- about.html
    +-- contact.html
    +-- ...
```

## Setup

1. Create and activate a virtual environment:

```bash
python -m venv venv
venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Create a `.env` file from `.env.example` and update the SMTP values:

```bash
copy .env.example .env
```

4. Run the Flask app:

```bash
python app.py
```

5. Open the site in your browser:

```text
http://127.0.0.1:5000
```

## Environment Variables

```text
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
EMAIL_ADDRESS=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
QUOTE_RECIPIENT=recipient@example.com
```

Keep real credentials in `.env` only. Do not commit `.env` to Git.
