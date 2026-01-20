import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRY = '24h';

export interface TokenPayload {
  userId: string;
  email: string;
  role?: 'user' | 'admin';
  iat?: number;
  exp?: number;
}

export function generateToken(payload: Omit<TokenPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export function extractTokenFromHeader(authHeader: string): string | null {
  if (!authHeader) return null;
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null;
  return parts[1];
}

export function generateMagicLinkToken(email: string): string {
  return jwt.sign({ email, type: 'magic-link' }, JWT_SECRET, { expiresIn: '15m' });
}

export function verifyMagicLinkToken(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (decoded.type !== 'magic-link') return null;
    return decoded.email;
  } catch {
    return null;
  }
}

export function isAdminToken(token: string): boolean {
  const payload = verifyToken(token);
  return payload?.role === 'admin';
}
