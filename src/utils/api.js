/**
 * API base URL resolver.
 * - In development: Vite proxy handles /api/* → localhost:5000
 * - In production:  Set VITE_API_URL in Vercel env vars to your Render backend URL
 *   e.g. VITE_API_URL=https://myportfolio-api.onrender.com
 */
const API_BASE = import.meta.env.VITE_API_URL || '';

export function apiUrl(path) {
  return `${API_BASE}${path}`;
}
