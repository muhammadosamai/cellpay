mkdir api-gateway && cd api-gateway
npm init -y
npm install express express-rate-limit helmet cors jsonwebtoken axios
npm install --save-dev typescript @types/express @types/node
npx tsc --init
2. Payments Service (Java/Spring Boot)
Setup
bash
# Use Spring Initializr (https://start.spring.io/)
# Dependencies: Web, JPA, PostgreSQL, Security
3. KYC/AML Service (Python/FastAPI)
Setup
bash
mkdir kyc-service && cd kyc-service
python -m venv venv
source venv/bin/activate  # Linux/Mac | venv\Scripts\activate (Windows)
pip install fastapi uvicorn python-jose[cryptography] requests
