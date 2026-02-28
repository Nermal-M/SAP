/* ===================================
   LUXE GLOW — E-Commerce JavaScript
   =================================== */

// ---- Product Data ----
const products = [
  {
    id: 1,
    name: "Radiance Revival Serum",
    category: "Skincare",
    price: 68.00,
    originalPrice: 85.00,
    image: "images/product-serum.png",
    badge: "bestseller",
    rating: 4.8,
    reviews: 324,
    description: "A luxurious vitamin C serum that brightens, firms, and revitalizes your skin. Infused with hyaluronic acid and botanical extracts for a radiant, youthful glow.",
    features: ["Paraben-Free", "Cruelty-Free", "Dermatologist Tested", "Vegan"]
  },
  {
    id: 2,
    name: "Velvet Rose Moisturizer",
    category: "Skincare",
    price: 54.00,
    originalPrice: null,
    image: "images/product-cream.png",
    badge: "new",
    rating: 4.9,
    reviews: 189,
    description: "An ultra-hydrating moisturizer enriched with rosehip oil and shea butter. Provides 72-hour moisture lock for irresistibly soft, supple skin.",
    features: ["Organic Ingredients", "Fragrance-Free", "Non-Comedogenic", "Recyclable Packaging"]
  },
  {
    id: 3,
    name: "Crimson Kiss Lipstick",
    category: "Makeup",
    price: 32.00,
    originalPrice: 40.00,
    image: "images/product-lipstick.png",
    badge: "sale",
    rating: 4.7,
    reviews: 256,
    description: "A bold, long-wearing matte lipstick that delivers intense color payoff. Enriched with jojoba oil to keep lips moisturized all day.",
    features: ["Long-Wearing", "Transfer-Proof", "Hydrating Formula", "12 Shades"]
  },
  {
    id: 4,
    name: "Éclat de Rose Perfume",
    category: "Fragrance",
    price: 120.00,
    originalPrice: null,
    image: "images/product-perfume.png",
    badge: "bestseller",
    rating: 4.9,
    reviews: 412,
    description: "An enchanting blend of Bulgarian rose, jasmine absolute, and warm sandalwood. A timeless fragrance that captivates from dawn to dusk.",
    features: ["Eau de Parfum", "Long-Lasting 8hrs+", "Hand-Crafted", "Gift Box Included"]
  },
  {
    id: 5,
    name: "Golden Hour Palette",
    category: "Makeup",
    price: 48.00,
    originalPrice: 62.00,
    image: "images/product-palette.png",
    badge: "sale",
    rating: 4.6,
    reviews: 198,
    description: "12 stunning shades from warm nudes to shimmering golds. Buttery-soft, highly pigmented formula that blends effortlessly for any look.",
    features: ["Mirror Included", "Talc-Free", "Buildable Formula", "Cruelty-Free"]
  },
  {
    id: 6,
    name: "Lash Luxe Mascara",
    category: "Makeup",
    price: 28.00,
    originalPrice: null,
    image: "images/product-mascara.png",
    badge: "new",
    rating: 4.8,
    reviews: 167,
    description: "Volumizing and lengthening mascara with a precision curved brush. Delivers dramatic, clump-free lashes that last all day without flaking.",
    features: ["Waterproof", "Smudge-Proof", "Easy Removal", "Ophthalmologist Tested"]
  },
  {
    id: 7,
    name: "Silk Bloom Shampoo",
    category: "Haircare",
    price: 36.00,
    originalPrice: null,
    image: "images/product-shampoo.png",
    badge: null,
    rating: 4.7,
    reviews: 143,
    description: "A gentle, sulfate-free shampoo enriched with silk proteins and argan oil. Cleanses while nourishing for salon-worthy shine and smoothness.",
    features: ["Sulfate-Free", "Color-Safe", "All Hair Types", "Eco-Friendly"]
  },
  {
    id: 8,
    name: "Petal Soft Night Cream",
    category: "Skincare",
    price: 72.00,
    originalPrice: 90.00,
    image: "images/product-cream.png",
    badge: "sale",
    rating: 4.8,
    reviews: 231,
    description: "An intensive overnight treatment with retinol and peptides. Works while you sleep to reduce fine lines and restore your skin's natural radiance.",
    features: ["Anti-Aging", "Clinically Proven", "Night Treatment", "Glass Jar"]
  },
  {
    id: 9,
    name: "Glow Primer SPF 30",
    category: "Skincare",
    price: 42.00,
    originalPrice: null,
    image: "images/product-serum.png",
    badge: "new",
    rating: 4.5,
    reviews: 98,
    description: "A lightweight, illuminating primer with built-in sun protection. Creates a flawless, dewy canvas that helps makeup last up to 16 hours.",
    features: ["SPF 30", "Oil-Free", "Illuminating", "Universal Tint"]
  },
  {
    id: 10,
    name: "Blossom Body Oil",
    category: "Skincare",
    price: 58.00,
    originalPrice: null,
    image: "images/product-perfume.png",
    badge: null,
    rating: 4.7,
    reviews: 176,
    description: "A luxurious dry body oil infused with cherry blossom extract and vitamin E. Absorbs quickly to leave skin silky smooth and subtly scented.",
    features: ["Fast-Absorbing", "Non-Greasy", "Natural Fragrance", "Multi-Use"]
  },
  {
    id: 11,
    name: "Blush & Bronze Duo",
    category: "Makeup",
    price: 38.00,
    originalPrice: 48.00,
    image: "images/product-palette.png",
    badge: "sale",
    rating: 4.6,
    reviews: 134,
    description: "A versatile compact featuring a silky blush and sun-kissed bronzer. Create a natural, sculpted look with just one product.",
    features: ["Duo Compact", "Mirror Included", "Buildable", "Travel-Friendly"]
  },
  {
    id: 12,
    name: "Jasmine Hair Mist",
    category: "Haircare",
    price: 29.00,
    originalPrice: null,
    image: "images/product-shampoo.png",
    badge: null,
    rating: 4.4,
    reviews: 87,
    description: "A lightweight, alcohol-free hair perfume that leaves a delicate trail of jasmine and white musk. Refreshes and adds shine between washes.",
    features: ["Alcohol-Free", "UV Protection", "Lightweight", "Long-Lasting Scent"]
  }
];

// ---- Auth Manager ----
class AuthManager {
  constructor() {
    this.token = localStorage.getItem('luxeToken') || null;
    this.user = JSON.parse(localStorage.getItem('luxeUser')) || null;
  }

  isLoggedIn() {
    return !!this.token && !!this.user;
  }

  saveSession(token, user) {
    this.token = token;
    this.user = user;
    localStorage.setItem('luxeToken', token);
    localStorage.setItem('luxeUser', JSON.stringify(user));
  }

  clearSession() {
    this.token = null;
    this.user = null;
    localStorage.removeItem('luxeToken');
    localStorage.removeItem('luxeUser');
  }

  getHeaders() {
    const headers = { 'Content-Type': 'application/json' };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  async signup(name, email, password, phone) {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, phone })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    this.saveSession(data.token, data.user);
    return data;
  }

  async login(email, password) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    this.saveSession(data.token, data.user);
    return data;
  }

  async logout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: this.getHeaders()
      });
    } catch (e) { }
    this.clearSession();
    window.location.href = 'login.html';
  }

  async checkSession() {
    if (!this.token) return false;
    try {
      const res = await fetch('/api/auth/me', { headers: this.getHeaders() });
      if (!res.ok) {
        this.clearSession();
        return false;
      }
      const data = await res.json();
      this.user = data.user;
      localStorage.setItem('luxeUser', JSON.stringify(data.user));
      return true;
    } catch {
      return false;
    }
  }
}

const auth = new AuthManager();

// ---- Cart Management ----
class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('luxeCart')) || [];
    this.updateCartCount();
  }

  save() {
    localStorage.setItem('luxeCart', JSON.stringify(this.items));
    this.updateCartCount();
  }

  addItem(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = this.items.find(item => item.id === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: quantity
      });
    }
    this.save();
    showToast(`${product.name} added to cart!`);
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.save();
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.save();
    }
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  clear() {
    this.items = [];
    this.save();
  }

  updateCartCount() {
    const countElements = document.querySelectorAll('.cart-count');
    const count = this.getItemCount();
    countElements.forEach(el => {
      el.textContent = count;
      el.classList.toggle('show', count > 0);
    });
  }
}

const cart = new Cart();

// ---- Order API (server-backed) ----
class OrderAPI {
  static async placeOrder(items, subtotal, shipping, total, shippingInfo) {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: auth.getHeaders(),
      body: JSON.stringify({ items, subtotal, shipping, total, shippingInfo })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  }

  static async getOrders() {
    const res = await fetch('/api/orders', { headers: auth.getHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.orders;
  }

  static async getOrder(orderNumber) {
    const res = await fetch(`/api/orders/${orderNumber}`, { headers: auth.getHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.order;
  }
}

// ---- Toast Notification ----
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
      <span class="toast-message"></span>
    `;
    document.body.appendChild(toast);
  }

  toast.querySelector('.toast-message').textContent = message;
  toast.classList.add('show');

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ---- Star Rating Helper ----
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

// ---- Product Card Renderer ----
function renderProductCard(product) {
  return `
    <div class="product-card animate-on-scroll" data-id="${product.id}">
      <div class="product-image">
        <a href="product-detail.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </a>
        ${product.badge ? `<span class="product-badge ${product.badge}">${product.badge}</span>` : ''}
        <div class="product-actions">
          <button class="action-btn" onclick="cart.addItem(${product.id})" title="Add to Cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </button>
          <button class="action-btn" onclick="window.location.href='product-detail.html?id=${product.id}'" title="View Details">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <h3 class="product-name">
          <a href="product-detail.html?id=${product.id}">${product.name}</a>
        </h3>
        <div class="product-rating">
          <span class="stars">${renderStars(product.rating)}</span>
          <span class="rating-count">(${product.reviews})</span>
        </div>
        <div class="product-price">
          <span class="current-price">$${product.price.toFixed(2)}</span>
          ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
        </div>
        <button class="quick-add" onclick="cart.addItem(${product.id})">Add to Cart</button>
      </div>
    </div>
  `;
}

// ---- Product Grid Renderer ----
function renderProductGrid(containerId, productList) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = productList.map(renderProductCard).join('');
  observeAnimations();
}

// ---- Header with Auth ----
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('active');
      navLinks.classList.toggle('mobile-open');
    });
  }

  // Update header with user state
  updateHeaderAuth();
}

function updateHeaderAuth() {
  const navActions = document.querySelector('.nav-actions');
  if (!navActions) return;

  // Remove existing user nav
  const existingUserNav = navActions.querySelector('.user-nav-item');
  const existingLoginLink = navActions.querySelector('.login-link');
  if (existingUserNav) existingUserNav.remove();
  if (existingLoginLink) existingLoginLink.remove();

  const cartBtn = navActions.querySelector('.cart-btn');

  if (auth.isLoggedIn()) {
    const initials = auth.user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    const firstName = auth.user.name.split(' ')[0];
    const userEl = document.createElement('div');
    userEl.className = 'user-nav-item';
    userEl.innerHTML = `
      <div class="user-avatar-sm">${initials}</div>
      <span>${firstName}</span>
      <div class="user-dropdown">
        <a href="my-orders.html">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
          My Orders
        </a>
        <a href="order-tracking.html">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
          </svg>
          Track Order
        </a>
        <div class="dropdown-divider"></div>
        <button class="logout-btn" onclick="auth.logout()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Sign Out
        </button>
      </div>
    `;
    if (cartBtn) {
      navActions.insertBefore(userEl, cartBtn);
    } else {
      navActions.appendChild(userEl);
    }
  } else {
    const loginLink = document.createElement('a');
    loginLink.href = 'login.html';
    loginLink.className = 'login-link btn btn-sm btn-primary';
    loginLink.style.marginRight = '8px';
    loginLink.textContent = 'Sign In';
    if (cartBtn) {
      navActions.insertBefore(loginLink, cartBtn);
    } else {
      navActions.appendChild(loginLink);
    }
  }
}

// ---- Scroll Animations ----
function observeAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.animate-on-scroll:not(.visible)').forEach(el => {
    observer.observe(el);
  });
}

// ---- Homepage Specific ----
function initHomepage() {
  renderProductGrid('featured-products', products.slice(0, 8));
  observeAnimations();
}

// ---- Products Page Specific ----
function initProductsPage() {
  let currentCategory = 'all';
  let currentSort = 'featured';
  let currentPriceMin = 0;
  let currentPriceMax = 999;

  function filterAndSort() {
    let filtered = [...products];
    if (currentCategory !== 'all') {
      filtered = filtered.filter(p => p.category.toLowerCase() === currentCategory.toLowerCase());
    }
    filtered = filtered.filter(p => p.price >= currentPriceMin && p.price <= currentPriceMax);

    switch (currentSort) {
      case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
      case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
      case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
      case 'newest': filtered.sort((a, b) => { const order = { new: 0, bestseller: 1, sale: 2 }; return (order[a.badge] ?? 3) - (order[b.badge] ?? 3); }); break;
    }
    renderProductGrid('shop-products', filtered);
    const countEl = document.querySelector('.results-count');
    if (countEl) countEl.textContent = `Showing ${filtered.length} of ${products.length} products`;
  }

  document.querySelectorAll('input[name="category"]').forEach(input => {
    input.addEventListener('change', (e) => { currentCategory = e.target.value; filterAndSort(); });
  });

  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) sortSelect.addEventListener('change', (e) => { currentSort = e.target.value; filterAndSort(); });

  const priceFilterBtn = document.getElementById('price-filter-btn');
  if (priceFilterBtn) {
    priceFilterBtn.addEventListener('click', () => {
      currentPriceMin = parseFloat(document.getElementById('price-min')?.value) || 0;
      currentPriceMax = parseFloat(document.getElementById('price-max')?.value) || 999;
      filterAndSort();
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('category');
  if (catParam) {
    currentCategory = catParam;
    const radio = document.querySelector(`input[name="category"][value="${catParam}"]`);
    if (radio) radio.checked = true;
  }

  filterAndSort();
}

// ---- Product Detail Page ----
function initProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  const product = products.find(p => p.id === productId);

  if (!product) {
    document.querySelector('.product-detail-section .container').innerHTML = `
      <div class="empty-cart">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <a href="products.html" class="btn btn-primary">Browse Products</a>
      </div>
    `;
    return;
  }

  document.title = `${product.name} — Luxe Glow`;
  const breadcrumb = document.getElementById('product-breadcrumb');
  if (breadcrumb) breadcrumb.textContent = product.name;

  const mainImg = document.getElementById('main-product-image');
  if (mainImg) mainImg.src = product.image;

  document.getElementById('detail-category').textContent = product.category;
  document.getElementById('detail-name').textContent = product.name;
  document.getElementById('detail-stars').textContent = renderStars(product.rating);
  document.getElementById('detail-rating-count').textContent = `${product.rating} (${product.reviews} reviews)`;
  document.getElementById('detail-current-price').textContent = `$${product.price.toFixed(2)}`;

  const originalPriceEl = document.getElementById('detail-original-price');
  const discountEl = document.getElementById('detail-discount');
  if (product.originalPrice) {
    originalPriceEl.textContent = `$${product.originalPrice.toFixed(2)}`;
    originalPriceEl.style.display = 'inline';
    const discount = Math.round((1 - product.price / product.originalPrice) * 100);
    discountEl.textContent = `-${discount}%`;
    discountEl.style.display = 'inline';
  } else {
    originalPriceEl.style.display = 'none';
    discountEl.style.display = 'none';
  }

  document.getElementById('detail-description').textContent = product.description;

  const featuresEl = document.getElementById('detail-features');
  if (featuresEl) {
    featuresEl.innerHTML = product.features.map(f => `
      <div class="feature">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <span>${f}</span>
      </div>
    `).join('');
  }

  let quantity = 1;
  const qtyDisplay = document.getElementById('qty-display');
  document.getElementById('qty-minus')?.addEventListener('click', () => { quantity = Math.max(1, quantity - 1); qtyDisplay.textContent = quantity; });
  document.getElementById('qty-plus')?.addEventListener('click', () => { quantity++; qtyDisplay.textContent = quantity; });
  document.getElementById('add-to-cart-btn')?.addEventListener('click', () => { cart.addItem(product.id, quantity); });

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  renderProductGrid('related-products', related);
}

// ---- Cart Page ----
function initCartPage() {
  renderCartItems();
}

function renderCartItems() {
  const container = document.getElementById('cart-items-list');
  const emptyCart = document.getElementById('empty-cart');
  const cartContent = document.getElementById('cart-content');
  if (!container) return;

  if (cart.items.length === 0) {
    if (emptyCart) emptyCart.style.display = 'block';
    if (cartContent) cartContent.style.display = 'none';
    return;
  }

  if (emptyCart) emptyCart.style.display = 'none';
  if (cartContent) cartContent.style.display = 'grid';

  container.innerHTML = cart.items.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="item-product">
        <div class="item-image"><img src="${item.image}" alt="${item.name}"></div>
        <div>
          <div class="item-name">${item.name}</div>
          <div class="item-cat">${item.category}</div>
        </div>
      </div>
      <div class="item-price">$${item.price.toFixed(2)}</div>
      <div class="item-qty">
        <button onclick="updateCartItem(${item.id}, ${item.quantity - 1})">−</button>
        <span>${item.quantity}</span>
        <button onclick="updateCartItem(${item.id}, ${item.quantity + 1})">+</button>
      </div>
      <div class="item-total">$${(item.price * item.quantity).toFixed(2)}</div>
      <button class="remove-btn" onclick="removeCartItem(${item.id})" title="Remove">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  `).join('');

  const subtotal = cart.getTotal();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;
  document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('cart-shipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
  document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
}

function updateCartItem(productId, quantity) {
  if (quantity < 1) { removeCartItem(productId); return; }
  cart.updateQuantity(productId, quantity);
  renderCartItems();
}

function removeCartItem(productId) {
  cart.removeItem(productId);
  renderCartItems();
}

// ---- Checkout Page (Auth-Required) ----
function initCheckoutPage() {
  // Redirect to login if not authenticated
  if (!auth.isLoggedIn()) {
    window.location.href = 'login.html?redirect=checkout.html';
    return;
  }

  let currentStep = 1;
  updateCheckoutSummary();

  // Pre-fill email from user account
  const emailInput = document.getElementById('email');
  if (emailInput && auth.user) {
    emailInput.value = auth.user.email;
  }

  // Pre-fill name from user account
  const nameInput = document.getElementById('first-name');
  if (nameInput && auth.user) {
    const nameParts = auth.user.name.split(' ');
    nameInput.value = nameParts[0] || '';
    const lastNameInput = document.getElementById('last-name');
    if (lastNameInput) lastNameInput.value = nameParts.slice(1).join(' ') || '';
  }

  document.getElementById('to-step-2')?.addEventListener('click', () => { if (validateStep1()) goToStep(2); });
  document.getElementById('to-step-3')?.addEventListener('click', () => { if (validateStep2()) goToStep(3); });
  document.getElementById('back-to-step-1')?.addEventListener('click', () => goToStep(1));
  document.getElementById('back-to-step-2')?.addEventListener('click', () => goToStep(2));
  document.getElementById('place-order-btn')?.addEventListener('click', () => { placeOrder(); });

  function goToStep(step) {
    currentStep = step;
    document.querySelectorAll('.checkout-step').forEach((el, i) => {
      el.classList.remove('active', 'completed');
      if (i + 1 < step) el.classList.add('completed');
      if (i + 1 === step) el.classList.add('active');
    });
    document.querySelectorAll('.checkout-form-section').forEach(el => { el.style.display = 'none'; });
    const activeSection = document.getElementById(`step-${step}`);
    if (activeSection) activeSection.style.display = 'block';
  }

  function validateStep1() {
    let valid = true;
    ['first-name', 'last-name', 'email', 'address', 'city', 'zip'].forEach(fieldId => {
      const input = document.getElementById(fieldId);
      const group = input?.closest('.form-group');
      if (!input?.value.trim()) { group?.classList.add('error'); valid = false; }
      else { group?.classList.remove('error'); }
    });
    return valid;
  }

  function validateStep2() {
    let valid = true;
    ['card-number', 'card-expiry', 'card-cvv', 'card-name'].forEach(fieldId => {
      const input = document.getElementById(fieldId);
      const group = input?.closest('.form-group');
      if (!input?.value.trim()) { group?.classList.add('error'); valid = false; }
      else { group?.classList.remove('error'); }
    });
    return valid;
  }

  async function placeOrder() {
    const btn = document.getElementById('place-order-btn');
    if (btn) { btn.disabled = true; btn.textContent = 'Placing Order...'; }

    try {
      const subtotal = cart.getTotal();
      const shipping = subtotal > 100 ? 0 : 9.99;
      const total = subtotal + shipping;

      const shippingInfo = {
        name: `${document.getElementById('first-name')?.value || ''} ${document.getElementById('last-name')?.value || ''}`.trim(),
        email: document.getElementById('email')?.value || '',
        address: document.getElementById('address')?.value || '',
        city: document.getElementById('city')?.value || '',
        zip: document.getElementById('zip')?.value || '',
        country: document.getElementById('country')?.value || 'United States'
      };

      const result = await OrderAPI.placeOrder(cart.items, subtotal, shipping, total, shippingInfo);

      document.querySelectorAll('.checkout-form-section').forEach(el => { el.style.display = 'none'; });
      document.querySelector('.checkout-steps').style.display = 'none';

      const confirmation = document.getElementById('order-confirmation');
      if (confirmation) {
        confirmation.style.display = 'block';
        document.getElementById('order-number').textContent = `Order #${result.orderNumber}`;
      }

      cart.clear();
    } catch (err) {
      showToast('Error placing order: ' + err.message);
      if (btn) { btn.disabled = false; btn.textContent = 'Place Order'; }
    }
  }

  function updateCheckoutSummary() {
    const container = document.getElementById('checkout-items-summary');
    if (!container) return;
    container.innerHTML = cart.items.map(item => `
      <div class="summary-row">
        <span>${item.name} × ${item.quantity}</span>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    `).join('');

    const subtotal = cart.getTotal();
    const shipping = subtotal > 100 ? 0 : 9.99;
    const total = subtotal + shipping;
    document.getElementById('checkout-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkout-shipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    document.getElementById('checkout-total').textContent = `$${total.toFixed(2)}`;
  }
}

// ---- Login Page ----
function initLoginPage() {
  // If already logged in, redirect
  if (auth.isLoggedIn()) {
    const redirect = new URLSearchParams(window.location.search).get('redirect');
    window.location.href = redirect || 'index.html';
    return;
  }

  const form = document.getElementById('login-form');
  const errorEl = document.getElementById('login-error');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEl.style.display = 'none';

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const btn = document.getElementById('login-btn');

    if (btn) { btn.disabled = true; btn.textContent = 'Signing in...'; }

    try {
      await auth.login(email, password);
      const redirect = new URLSearchParams(window.location.search).get('redirect');
      window.location.href = redirect || 'index.html';
    } catch (err) {
      errorEl.textContent = err.message;
      errorEl.style.display = 'flex';
      if (btn) { btn.disabled = false; btn.textContent = 'Sign In'; }
    }
  });
}

// ---- Signup Page ----
function initSignupPage() {
  if (auth.isLoggedIn()) {
    window.location.href = 'index.html';
    return;
  }

  const form = document.getElementById('signup-form');
  const errorEl = document.getElementById('signup-error');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEl.style.display = 'none';

    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const phone = document.getElementById('signup-phone')?.value.trim() || '';
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;
    const btn = document.getElementById('signup-btn');

    if (password !== confirm) {
      errorEl.textContent = 'Passwords do not match';
      errorEl.style.display = 'flex';
      return;
    }

    if (btn) { btn.disabled = true; btn.textContent = 'Creating account...'; }

    try {
      await auth.signup(name, email, password, phone);
      window.location.href = 'index.html';
    } catch (err) {
      errorEl.textContent = err.message;
      errorEl.style.display = 'flex';
      if (btn) { btn.disabled = false; btn.textContent = 'Create Account'; }
    }
  });
}

// ---- Tracking helpers ----
function generateTrackingTimeline(orderDate) {
  const d = new Date(orderDate);
  const now = new Date();
  const diffHours = (now - d) / (1000 * 60 * 60);

  const steps = [
    { status: 'Order Placed', detail: 'Your order has been confirmed and is being prepared.', icon: 'check', hours: 0 },
    { status: 'Processing', detail: 'We are carefully packaging your beauty essentials.', icon: 'package', hours: 2 },
    { status: 'Shipped', detail: 'Your package has been handed to the courier.', icon: 'truck', hours: 24 },
    { status: 'In Transit', detail: 'Your package is on its way to you.', icon: 'map', hours: 48 },
    { status: 'Out for Delivery', detail: 'Your package will be delivered today.', icon: 'home', hours: 72 },
    { status: 'Delivered', detail: 'Your package has been delivered. Enjoy!', icon: 'star', hours: 96 }
  ];

  return steps.map(step => {
    const stepTime = new Date(d.getTime() + step.hours * 60 * 60 * 1000);
    return {
      ...step,
      completed: diffHours >= step.hours,
      active: diffHours >= step.hours && diffHours < (step.hours + 24),
      time: stepTime.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    };
  });
}

function getOverallStatus(orderDate) {
  const d = new Date(orderDate);
  const diffHours = (new Date() - d) / (1000 * 60 * 60);
  if (diffHours >= 96) return 'Delivered';
  if (diffHours >= 72) return 'Out for Delivery';
  if (diffHours >= 48) return 'In Transit';
  if (diffHours >= 24) return 'Shipped';
  if (diffHours >= 2) return 'Processing';
  return 'Order Placed';
}

function getStatusClass(status) {
  const map = {
    'Order Placed': 'status-placed', 'Processing': 'status-processing',
    'Shipped': 'status-shipped', 'In Transit': 'status-transit',
    'Out for Delivery': 'status-delivery', 'Delivered': 'status-delivered'
  };
  return map[status] || 'status-placed';
}

function getTrackingIcon(type) {
  const icons = {
    check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>',
    package: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    truck: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
    map: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>',
    home: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    star: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'
  };
  return icons[type] || icons.check;
}

// ---- My Orders Page (server-backed) ----
async function initMyOrdersPage() {
  if (!auth.isLoggedIn()) {
    window.location.href = 'login.html?redirect=my-orders.html';
    return;
  }

  const container = document.getElementById('orders-list');
  const emptyState = document.getElementById('empty-orders');
  if (!container) return;

  try {
    const orders = await OrderAPI.getOrders();

    if (orders.length === 0) {
      if (emptyState) emptyState.style.display = 'block';
      container.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    container.style.display = 'flex';

    container.innerHTML = orders.map(order => {
      const status = getOverallStatus(order.date);
      const statusClass = getStatusClass(status);
      const orderDate = new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      const itemCount = order.items.reduce((sum, i) => sum + i.quantity, 0);

      return `
        <div class="order-card animate-on-scroll">
          <div class="order-card-header">
            <div class="order-card-info">
              <h3 class="order-number-title">${order.orderNumber}</h3>
              <span class="order-date">Placed on ${orderDate}</span>
            </div>
            <span class="order-status-badge ${statusClass}">${status}</span>
          </div>
          <div class="order-card-items">
            ${order.items.map(item => `
              <div class="order-item-row">
                <div class="order-item-img"><img src="${item.image}" alt="${item.name}"></div>
                <div class="order-item-details">
                  <span class="order-item-name">${item.name}</span>
                  <span class="order-item-meta">${item.category} · Qty: ${item.quantity}</span>
                </div>
                <span class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            `).join('')}
          </div>
          <div class="order-card-footer">
            <div class="order-card-total">
              <span>${itemCount} item${itemCount > 1 ? 's' : ''}</span>
              <span class="order-total-amount">Total: $${order.total.toFixed(2)}</span>
            </div>
            <div class="order-card-actions">
              <a href="order-tracking.html?order=${order.orderNumber}" class="btn btn-sm btn-primary">Track Order</a>
              <a href="products.html" class="btn btn-sm btn-secondary">Buy Again</a>
            </div>
          </div>
        </div>
      `;
    }).join('');

    observeAnimations();
  } catch (err) {
    container.innerHTML = `<p style="text-align:center; color: var(--color-text-light);">Error loading orders. Please try again.</p>`;
  }
}

// ---- Order Tracking Page (server-backed) ----
function initOrderTrackingPage() {
  if (!auth.isLoggedIn()) {
    window.location.href = 'login.html?redirect=order-tracking.html';
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const orderNum = urlParams.get('order');

  const trackingForm = document.getElementById('tracking-form');
  const trackingInput = document.getElementById('tracking-input');

  if (orderNum) {
    if (trackingInput) trackingInput.value = orderNum;
    showTracking(orderNum);
  }

  trackingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const num = trackingInput?.value.trim();
    if (num) showTracking(num);
  });

  async function showTracking(orderNumber) {
    const trackingResult = document.getElementById('tracking-result');
    const trackingError = document.getElementById('tracking-error');

    try {
      const order = await OrderAPI.getOrder(orderNumber);

      if (trackingError) trackingError.style.display = 'none';
      if (trackingResult) trackingResult.style.display = 'block';

      const status = getOverallStatus(order.date);
      const statusClass = getStatusClass(status);
      const timeline = generateTrackingTimeline(order.date);
      const orderDate = new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      const estimatedDelivery = new Date(new Date(order.date).getTime() + 96 * 60 * 60 * 1000)
        .toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

      document.getElementById('tracking-order-number').textContent = order.orderNumber;
      document.getElementById('tracking-status-badge').textContent = status;
      document.getElementById('tracking-status-badge').className = `order-status-badge ${statusClass}`;
      document.getElementById('tracking-order-date').textContent = orderDate;
      document.getElementById('tracking-estimated').textContent = estimatedDelivery;
      document.getElementById('tracking-ship-to').textContent = order.shippingInfo?.name || 'N/A';
      document.getElementById('tracking-address').textContent =
        `${order.shippingInfo?.address || ''}, ${order.shippingInfo?.city || ''} ${order.shippingInfo?.zip || ''}`;

      const timelineEl = document.getElementById('tracking-timeline');
      if (timelineEl) {
        timelineEl.innerHTML = timeline.map(step => `
          <div class="timeline-step ${step.completed ? 'completed' : ''} ${step.active ? 'active' : ''}">
            <div class="timeline-dot">${getTrackingIcon(step.icon)}</div>
            <div class="timeline-content">
              <h4>${step.status}</h4>
              <p>${step.detail}</p>
              ${step.completed ? `<span class="timeline-time">${step.time}</span>` : ''}
            </div>
          </div>
        `).join('');
      }

      const itemsEl = document.getElementById('tracking-items');
      if (itemsEl) {
        itemsEl.innerHTML = order.items.map(item => `
          <div class="order-item-row">
            <div class="order-item-img"><img src="${item.image}" alt="${item.name}"></div>
            <div class="order-item-details">
              <span class="order-item-name">${item.name}</span>
              <span class="order-item-meta">Qty: ${item.quantity}</span>
            </div>
            <span class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        `).join('');
      }

      document.getElementById('tracking-subtotal').textContent = `$${order.subtotal.toFixed(2)}`;
      document.getElementById('tracking-shipping-cost').textContent = order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`;
      document.getElementById('tracking-total').textContent = `$${order.total.toFixed(2)}`;
    } catch (err) {
      if (trackingResult) trackingResult.style.display = 'none';
      if (trackingError) trackingError.style.display = 'block';
    }
  }
}

// ---- Initialize on DOM Ready ----
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  observeAnimations();

  const path = window.location.pathname;
  if (path.endsWith('index.html') || path.endsWith('/') || path === '') {
    initHomepage();
  } else if (path.endsWith('products.html')) {
    initProductsPage();
  } else if (path.endsWith('product-detail.html')) {
    initProductDetail();
  } else if (path.endsWith('cart.html')) {
    initCartPage();
  } else if (path.endsWith('checkout.html')) {
    initCheckoutPage();
  } else if (path.endsWith('my-orders.html')) {
    initMyOrdersPage();
  } else if (path.endsWith('order-tracking.html')) {
    initOrderTrackingPage();
  } else if (path.endsWith('login.html')) {
    initLoginPage();
  } else if (path.endsWith('signup.html')) {
    initSignupPage();
  }
});
