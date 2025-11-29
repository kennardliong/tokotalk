# utils.py
import os
import traceback
import smtplib
from email.mime.text import MIMEText

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USERNAME = os.getenv("SMTP_USERNAME")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
DEFAULT_NOTIFY_EMAIL = os.getenv("WAITLIST_NOTIFY_EMAIL", "kennardliong1@gmail.com")


def log_error(source, error):
    print(f"[ERROR] in {source}: {str(error)}")
    traceback.print_exc()  # Optional: Full traceback for debugging


def error_response(message, status_code=500):
    return {"error": message}, status_code


def send_email_notification(subject, body, recipient=None):
    """Send transactional emails through SMTP, falls back to logging if creds missing."""
    if not SMTP_USERNAME or not SMTP_PASSWORD:
        print("[WARN] SMTP credentials missing, skipping email notification.")
        return False

    recipient = recipient or DEFAULT_NOTIFY_EMAIL
    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = SMTP_USERNAME
    msg["To"] = recipient

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.sendmail(SMTP_USERNAME, [recipient], msg.as_string())
        return True
    except Exception as e:
        log_error("send_email_notification", e)
        return False
