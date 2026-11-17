import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from server/.env or root .env
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST'],
}));
app.use(express.json());

const REVIEWS_FILE = path.join(__dirname, 'data', 'reviews.json');
const INQUIRIES_FILE = path.join(__dirname, 'data', 'inquiries.json');

// Helper to escape markdown for Telegram if needed
function escapeMarkdown(text = '') {
  return String(text).replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&');
}

// Telegram dispatch helper
async function sendTelegramMessage(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId || token === 'YOUR_BOT_TOKEN' || chatId === 'YOUR_CHAT_ID') {
    console.warn('\n⚠️ [TELEGRAM NOT CONFIGURED]');
    console.warn('To receive alerts on Telegram, set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in server/.env');
    console.log('--- Message Preview ---');
    console.log(text);
    console.log('-----------------------\n');
    return { sent: false, reason: 'unconfigured' };
  }

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
      }),
    });

    const data = await response.json();
    if (!data.ok) {
      console.error('Telegram API error:', data);
      return { sent: false, error: data.description };
    }
    return { sent: true };
  } catch (err) {
    console.error('Failed to dispatch Telegram message:', err.message);
    return { sent: false, error: err.message };
  }
}

// Read JSON helper
async function readJsonFile(filePath, defaultValue = []) {
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

// Write JSON helper
async function writeJsonFile(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Health check
app.get('/api/health', (req, res) => {
  const configured = Boolean(
    process.env.TELEGRAM_BOT_TOKEN &&
    process.env.TELEGRAM_CHAT_ID &&
    process.env.TELEGRAM_BOT_TOKEN !== 'YOUR_BOT_TOKEN' &&
    process.env.TELEGRAM_CHAT_ID !== 'YOUR_CHAT_ID'
  );
  res.json({ status: 'ok', telegramConfigured: configured });
});

// Contact Form Submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, projectType, budget, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const newInquiry = {
      id: 'inq-' + Date.now(),
      name,
      email,
      projectType: projectType || 'Not specified',
      budget: budget || 'Not specified',
      message,
      createdAt: new Date().toISOString(),
      timestamp,
    };

    // Save to local inquiries log
    const inquiries = await readJsonFile(INQUIRIES_FILE, []);
    inquiries.unshift(newInquiry);
    await writeJsonFile(INQUIRIES_FILE, inquiries);

    // Format HTML Telegram message
    const telegramHtml = `
🚀 <b>New Portfolio Inquiry!</b>
━━━━━━━━━━━━━━━━━━━━
👤 <b>Name:</b> ${name}
📧 <b>Email:</b> ${email}
💼 <b>Project:</b> ${projectType || 'Not specified'}
💰 <b>Budget:</b> ${budget || 'Not specified'}

💬 <b>Message:</b>
${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}

🕒 <b>Time:</b> ${timestamp} (IST)
━━━━━━━━━━━━━━━━━━━━
    `.trim();

    const tgResult = await sendTelegramMessage(telegramHtml);

    res.json({
      success: true,
      message: 'Inquiry received successfully!',
      telegram: tgResult,
    });
  } catch (error) {
    console.error('Error handling contact form:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await readJsonFile(REVIEWS_FILE, []);
    res.json({ success: true, reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Add Review
app.post('/api/reviews', async (req, res) => {
  try {
    const { name, role, company, projectType, rating, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ error: 'Name and review message are required.' });
    }

    const numRating = Math.min(5, Math.max(1, parseInt(rating, 10) || 5));
    const avatarColors = ['#7c3aed', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
    const chosenColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const newReview = {
      id: 'rev-' + Date.now(),
      name: name.trim(),
      role: (role || '').trim(),
      company: (company || '').trim(),
      projectType: (projectType || 'Web Development').trim(),
      rating: numRating,
      date: 'Just now',
      message: message.trim(),
      verified: true,
      avatarColor: chosenColor,
      createdAt: new Date().toISOString(),
    };

    const reviews = await readJsonFile(REVIEWS_FILE, []);
    reviews.unshift(newReview);
    await writeJsonFile(REVIEWS_FILE, reviews);

    // Format Telegram alert for new review
    const stars = '⭐'.repeat(numRating);
    const clientRole = role ? (company ? `${role} at ${company}` : role) : (company || 'Client');
    const telegramHtml = `
🌟 <b>New Customer Review Received!</b>
━━━━━━━━━━━━━━━━━━━━
👤 <b>Client:</b> ${name}
🏢 <b>Role:</b> ${clientRole}
💼 <b>Project:</b> ${projectType || 'Web Development'}
⭐ <b>Rating:</b> ${stars} (${numRating}/5)

💬 <b>Review:</b>
"${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}"

🕒 <b>Time:</b> ${timestamp} (IST)
━━━━━━━━━━━━━━━━━━━━
    `.trim();

    await sendTelegramMessage(telegramHtml);

    res.status(201).json({
      success: true,
      review: newReview,
    });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: 'Failed to add review' });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 Backend Server running on http://localhost:${PORT}`);
  console.log(`👉 Contact endpoint: POST http://localhost:${PORT}/api/contact`);
  console.log(`👉 Reviews endpoint: GET/POST http://localhost:${PORT}/api/reviews\n`);
});
