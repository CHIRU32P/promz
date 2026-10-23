import os
import sys
from dotenv import load_dotenv

load_dotenv("backend/.env")
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("ERROR: No GEMINI_API_KEY found in backend/.env")
    sys.exit(1)

from google import genai

client = genai.Client(api_key=api_key)

candidate_models = [
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
    "gemini-flash-latest",
    "gemini-3-flash-preview",
    "gemini-2.5-pro",
]

working_model = None

for m in candidate_models:
    try:
        print(f"Testing {m}...")
        res = client.models.generate_content(
            model=m,
            contents="Hello! Confirm connection with: OK"
        )
        print(f"SUCCESS with {m}: {res.text.strip()}")
        working_model = m
        break
    except Exception as e:
        err_msg = str(e)
        # Avoid logging the key if it happens to be in any error
        if api_key in err_msg:
            err_msg = err_msg.replace(api_key, "[REDACTED]")
        print(f"FAILED {m}: {type(e).__name__} - {err_msg[:120]}")

if working_model:
    print(f"\nRecommended working model: {working_model}")
else:
    print("\nNo candidate model succeeded.")
