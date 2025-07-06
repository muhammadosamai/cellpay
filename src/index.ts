import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const app = express();
const PORT = 3000;

// ======================
// Security Middleware
// ======================
app.use(helmet()); // Sets security headers
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json());

// Rate limiting (1000 requests/minute)
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 1000,
  message: 'Too many requests, please try again later.'
});
app.use(limiter);

// ======================
// JWT Authentication
// ======================
const JWT_SECRET = process.env.JWT_SECRET || 'replace-with-hsm-key';

const authenticate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// ======================
// Routes
// ======================
// Login (Mock)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // In production, validate against KYC service
  if (email !== 'user@celltopay.com' || password !== 'securepassword') {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: '123' }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Payments Proxy (Routes to Payments Service)
app.post('/payments', authenticate, async (req, res) => {
  try {
    const response = await axios.post('http://payments-service:8080/process', req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Payment failed' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
});