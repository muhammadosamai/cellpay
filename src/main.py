from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from pydantic import BaseModel

app = FastAPI()

# Mock Database
fake_users_db = {
    "user@celltopay.com": {
        "password": "securepassword",
        "kyc_verified": True
    }
}

# JWT Setup
SECRET_KEY = "replace-with-hsm-key"
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class User(BaseModel):
    email: str
    password: str

@app.post("/verify")
async def verify_kyc(user: User):
    if user.email not in fake_users_db:
        raise HTTPException(status_code=400, detail="User not found")
    if not fake_users_db[user.email]["kyc_verified"]:
        raise HTTPException(status_code=403, detail="KYC not verified")
    return {"status": "verified"}

# Run: uvicorn main:app --reload --port 8000