/* ===================================
   LUXE GLOW — Express Backend Server
   =================================== */

const express = require('express');
const path = require('path');
const initSqlJs = require('sql.js');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, 'luxeglow.db');

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// ---- Database Setup ----
let db;

async function initDatabase() {
    const SQL = await initSqlJs();

    // Load existing database or create new
    if (fs.existsSync(DB_PATH)) {
        const buffer = fs.readFileSync(DB_PATH);
        db = new SQL.Database(buffer);
    } else {
        db = new SQL.Database();
    }

    // Create tables
    db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      phone TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

    db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      order_number TEXT NOT NULL UNIQUE,
      items TEXT NOT NULL,
      subtotal REAL NOT NULL,
      shipping REAL NOT NULL,
      total REAL NOT NULL,
      shipping_name TEXT DEFAULT '',
      shipping_email TEXT DEFAULT '',
      shipping_address TEXT DEFAULT '',
      shipping_city TEXT DEFAULT '',
      shipping_zip TEXT DEFAULT '',
      shipping_country TEXT DEFAULT 'United States',
      status TEXT DEFAULT 'Order Placed',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

    db.run(`
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      token TEXT NOT NULL UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

    saveDatabase();
    console.log('✅ Database initialized');
}

function saveDatabase() {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_PATH, buffer);
}

// ---- Auth Middleware ----
function authenticate(req, res, next) {
    const token = req.headers['authorization']?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    const session = db.exec("SELECT user_id FROM sessions WHERE token = ?", [token]);
    if (!session.length || !session[0].values.length) {
        return res.status(401).json({ error: 'Invalid or expired session' });
    }

    const userId = session[0].values[0][0];
    const user = db.exec("SELECT id, name, email, phone, created_at FROM users WHERE id = ?", [userId]);
    if (!user.length || !user[0].values.length) {
        return res.status(401).json({ error: 'User not found' });
    }

    const row = user[0].values[0];
    req.user = {
        id: row[0],
        name: row[1],
        email: row[2],
        phone: row[3],
        created_at: row[4]
    };
    next();
}

// ==============================
//  AUTH ROUTES
// ==============================

// POST /api/auth/signup
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        // Check if email exists
        const existing = db.exec("SELECT id FROM users WHERE email = ?", [email.toLowerCase()]);
        if (existing.length && existing[0].values.length) {
            return res.status(400).json({ error: 'An account with this email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        db.run("INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)", [
            name.trim(),
            email.toLowerCase().trim(),
            hashedPassword,
            phone || ''
        ]);
        saveDatabase();

        // Get the new user
        const newUser = db.exec("SELECT id, name, email FROM users WHERE email = ?", [email.toLowerCase().trim()]);
        const row = newUser[0].values[0];

        // Create session
        const token = uuidv4();
        db.run("INSERT INTO sessions (user_id, token) VALUES (?, ?)", [row[0], token]);
        saveDatabase();

        res.status(201).json({
            message: 'Account created successfully',
            token,
            user: { id: row[0], name: row[1], email: row[2] }
        });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find user
        const result = db.exec("SELECT id, name, email, password FROM users WHERE email = ?", [email.toLowerCase().trim()]);
        if (!result.length || !result[0].values.length) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const row = result[0].values[0];
        const user = { id: row[0], name: row[1], email: row[2], password: row[3] };

        // Verify password
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Create session
        const token = uuidv4();
        db.run("INSERT INTO sessions (user_id, token) VALUES (?, ?)", [user.id, token]);
        saveDatabase();

        res.json({
            message: 'Login successful',
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/auth/me
app.get('/api/auth/me', authenticate, (req, res) => {
    res.json({ user: req.user });
});

// POST /api/auth/logout
app.post('/api/auth/logout', (req, res) => {
    const token = req.headers['authorization']?.replace('Bearer ', '');
    if (token) {
        db.run("DELETE FROM sessions WHERE token = ?", [token]);
        saveDatabase();
    }
    res.json({ message: 'Logged out' });
});

// ==============================
//  ORDER ROUTES
// ==============================

// POST /api/orders — Place new order
app.post('/api/orders', authenticate, (req, res) => {
    try {
        const { items, subtotal, shipping, total, shippingInfo } = req.body;

        if (!items || !items.length) {
            return res.status(400).json({ error: 'Order must contain at least one item' });
        }

        const orderNumber = 'LG-' + Math.random().toString(36).substr(2, 8).toUpperCase();

        db.run(`INSERT INTO orders 
      (user_id, order_number, items, subtotal, shipping, total, shipping_name, shipping_email, shipping_address, shipping_city, shipping_zip, shipping_country)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
            req.user.id,
            orderNumber,
            JSON.stringify(items),
            subtotal,
            shipping,
            total,
            shippingInfo?.name || '',
            shippingInfo?.email || '',
            shippingInfo?.address || '',
            shippingInfo?.city || '',
            shippingInfo?.zip || '',
            shippingInfo?.country || 'United States'
        ]);
        saveDatabase();

        res.status(201).json({
            message: 'Order placed successfully',
            orderNumber
        });
    } catch (err) {
        console.error('Order error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/orders — Get all orders for current user
app.get('/api/orders', authenticate, (req, res) => {
    try {
        const result = db.exec(
            "SELECT id, order_number, items, subtotal, shipping, total, shipping_name, shipping_email, shipping_address, shipping_city, shipping_zip, shipping_country, status, created_at FROM orders WHERE user_id = ? ORDER BY created_at DESC",
            [req.user.id]
        );

        if (!result.length) {
            return res.json({ orders: [] });
        }

        const orders = result[0].values.map(row => ({
            id: row[0],
            orderNumber: row[1],
            items: JSON.parse(row[2]),
            subtotal: row[3],
            shipping: row[4],
            total: row[5],
            shippingInfo: {
                name: row[6],
                email: row[7],
                address: row[8],
                city: row[9],
                zip: row[10],
                country: row[11]
            },
            status: row[12],
            date: row[13]
        }));

        res.json({ orders });
    } catch (err) {
        console.error('Get orders error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/orders/:orderNumber — Get specific order
app.get('/api/orders/:orderNumber', authenticate, (req, res) => {
    try {
        const result = db.exec(
            "SELECT id, order_number, items, subtotal, shipping, total, shipping_name, shipping_email, shipping_address, shipping_city, shipping_zip, shipping_country, status, created_at FROM orders WHERE user_id = ? AND order_number = ?",
            [req.user.id, req.params.orderNumber]
        );

        if (!result.length || !result[0].values.length) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const row = result[0].values[0];
        const order = {
            id: row[0],
            orderNumber: row[1],
            items: JSON.parse(row[2]),
            subtotal: row[3],
            shipping: row[4],
            total: row[5],
            shippingInfo: {
                name: row[6],
                email: row[7],
                address: row[8],
                city: row[9],
                zip: row[10],
                country: row[11]
            },
            status: row[12],
            date: row[13]
        };

        res.json({ order });
    } catch (err) {
        console.error('Get order error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ==============================
//  ADMIN: View all users and orders (for debugging)
// ==============================
app.get('/api/admin/users', (req, res) => {
    const result = db.exec("SELECT id, name, email, phone, created_at FROM users ORDER BY created_at DESC");
    if (!result.length) return res.json({ users: [] });
    const users = result[0].values.map(row => ({
        id: row[0], name: row[1], email: row[2], phone: row[3], created_at: row[4]
    }));
    res.json({ users });
});

app.get('/api/admin/orders', (req, res) => {
    const result = db.exec(`
    SELECT o.id, o.order_number, o.user_id, u.name, u.email, o.items, o.subtotal, o.shipping, o.total, o.status, o.created_at
    FROM orders o JOIN users u ON o.user_id = u.id ORDER BY o.created_at DESC
  `);
    if (!result.length) return res.json({ orders: [] });
    const orders = result[0].values.map(row => ({
        id: row[0], orderNumber: row[1], userId: row[2], userName: row[3], userEmail: row[4],
        items: JSON.parse(row[5]), subtotal: row[6], shipping: row[7], total: row[8], status: row[9], date: row[10]
    }));
    res.json({ orders });
});

// ---- Start Server ----
async function start() {
    await initDatabase();
    app.listen(PORT, () => {
        console.log(`\n🌸 Luxe Glow server running at http://localhost:${PORT}\n`);
    });
}

start();
