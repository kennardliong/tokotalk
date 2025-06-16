# utils.py
import traceback

def log_error(source, error):
    print(f"[ERROR] in {source}: {str(error)}")
    traceback.print_exc()  # Optional: Full traceback for debugging

def error_response(message, status_code=500):
    return {"error": message}, status_code
