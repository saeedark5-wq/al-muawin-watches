const watches = [
    { id: 1, name: 'Chronograph Sport', category: 'sport', price: 1299, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
    { id: 2, name: 'Classic Elegance', category: 'dress', price: 2499, image: 'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=400&h=400&fit=crop' },
    { id: 3, name: 'Urban Explorer', category: 'casual', price: 899, image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&h=400&fit=crop' },
    { id: 4, name: 'Diamond Elite', category: 'luxury', price: 5999, image: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=400&h=400&fit=crop' },
    { id: 5, name: 'Diver Pro', category: 'sport', price: 1799, image: 'https://images.unsplash.com/photo-1606390291165-7bf80a7182f4?w=400&h=400&fit=crop' },
    { id: 6, name: 'Tuxedo Master', category: 'dress', price: 3299, image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop' },
    { id: 7, name: 'Weekend Casual', category: 'casual', price: 699, image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=400&h=400&fit=crop' },
    { id: 8, name: 'Royal Collection', category: 'luxury', price: 8999, image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&h=400&fit=crop' },
    { id: 9, name: 'Racing Edition', category: 'sport', price: 2199, image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=400&h=400&fit=crop' },
    { id: 10, name: 'Business Class', category: 'dress', price: 1899, image: 'https://images.unsplash.com/photo-1639006570490-79c0c53f1080?w=400&h=400&fit=crop' },
    { id: 11, name: 'Street Style', category: 'casual', price: 799, image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=400&h=400&fit=crop' },
    { id: 12, name: 'Platinum Heritage', category: 'luxury', price: 12999, image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop' }
];

let cart = [];
let currentCategory = 'all';
let isLoggedIn = false;
let currentUser = null;
let isSignupMode = false;
let users = JSON.parse(localStorage.getItem('alMuawinUsers')) || [];

function renderWatches(category = 'all') {
    const watchesGrid = document.getElementById('watchesGrid');
    const filteredWatches = category === 'all'
        ? watches
        : watches.filter(watch => watch.category === category);

    watchesGrid.innerHTML = filteredWatches.map(watch => {
        const inCart = cart.find(item => item.id === watch.id);
        return `
            <div class="watch-card">
                <div class="watch-image-container">
                    <img src="${watch.image}" alt="${watch.name}" class="watch-image">
                    <div class="watermark">AL MUAWIN</div>
                </div>
                <div class="category">${watch.category}</div>
                <h4>${watch.name}</h4>
                <div class="price">$${watch.price.toLocaleString()}</div>
                <button
                    class="add-to-cart-btn"
                    onclick="addToCart(${watch.id})"
                    ${inCart ? 'disabled' : ''}
                >
                    ${inCart ? 'In Cart' : 'Add to Cart'}
                </button>
            </div>
        `;
    }).join('');
}

function addToCart(watchId) {
    if (!isLoggedIn) {
        showLoginModal();
        return;
    }

    const watch = watches.find(w => w.id === watchId);
    if (!watch) return;

    const existingItem = cart.find(item => item.id === watchId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...watch, quantity: 1 });
    }

    updateCart();
    renderWatches(currentCategory);
}

function removeFromCart(watchId) {
    cart = cart.filter(item => item.id !== watchId);
    updateCart();
    renderWatches(currentCategory);
}

function updateQuantity(watchId, change) {
    const item = cart.find(item => item.id === watchId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(watchId);
    } else {
        updateCart();
    }
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartSlideItemsContainer = document.getElementById('cartSlideItems');
    const cartCount = document.getElementById('cartCount');
    const cartBadge = document.getElementById('cartBadge');
    const cartCountSlide = document.getElementById('cartCountSlide');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const checkoutBtnSlide = document.getElementById('checkoutBtnSlide');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartSlideItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartCount.textContent = '0';
        cartBadge.textContent = '0';
        cartCountSlide.textContent = '0';
        checkoutBtn.disabled = true;
        checkoutBtnSlide.disabled = true;
        updateTotals(0, 0, 0);
        return;
    }

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartBadge.textContent = totalItems;
    cartCountSlide.textContent = totalItems;
    checkoutBtn.disabled = false;
    checkoutBtnSlide.disabled = false;

    const cartHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="price">$${item.price.toLocaleString()}</div>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');

    cartItemsContainer.innerHTML = cartHTML;
    cartSlideItemsContainer.innerHTML = cartHTML;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    updateTotals(subtotal, tax, total);
}

function updateTotals(subtotal, tax, total) {
    document.getElementById('subtotal').textContent = `$${subtotal.toLocaleString()}`;
    document.getElementById('tax').textContent = `$${tax.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('total').textContent = `$${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

    document.getElementById('subtotalSlide').textContent = `$${subtotal.toLocaleString()}`;
    document.getElementById('taxSlide').textContent = `$${tax.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('totalSlide').textContent = `$${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

function showNotification(type, title, message) {
    const modal = document.getElementById('notificationModal');
    const icon = document.getElementById('notificationIcon');
    const titleEl = document.getElementById('notificationTitle');
    const messageEl = document.getElementById('notificationMessage');

    // Set icon based on type
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };

    icon.textContent = icons[type] || icons.info;
    icon.className = `notification-icon ${type}`;
    titleEl.textContent = title;
    messageEl.textContent = message;

    modal.style.display = 'flex';
}

function closeNotification() {
    document.getElementById('notificationModal').style.display = 'none';
}

function toggleCartPanel() {
    const panel = document.getElementById('cartSlidePanel');
    const overlay = document.getElementById('cartOverlay');

    panel.classList.toggle('open');
    overlay.classList.toggle('open');
}

function checkout() {
    if (cart.length === 0 || !isLoggedIn) return;

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalWithTax = total * 1.1;

    showNotification('success', 'Order Confirmed!', `Thank you for your purchase, ${currentUser}! Your order total is $${totalWithTax.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}. Your order will be processed shortly.`);

    cart = [];
    updateCart();
    renderWatches(currentCategory);

    // Close cart panel if open
    const panel = document.getElementById('cartSlidePanel');
    const overlay = document.getElementById('cartOverlay');
    if (panel.classList.contains('open')) {
        panel.classList.remove('open');
        overlay.classList.remove('open');
    }
}

function showLoginModal() {
    // Ensure we're in login mode
    if (isSignupMode) {
        isSignupMode = false;
        const event = { preventDefault: () => {} };
        toggleAuthMode(event);
    }
    document.getElementById('loginModal').style.display = 'flex';
}

function showSignupModal() {
    // Ensure we're in signup mode
    if (!isSignupMode) {
        isSignupMode = true;
        const event = { preventDefault: () => {} };
        toggleAuthMode(event);
    }
    document.getElementById('loginModal').style.display = 'flex';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
    // Reset to login mode when closing
    if (isSignupMode) {
        isSignupMode = false;
        const event = { preventDefault: () => {} };
        toggleAuthMode(event);
    }
}

function login(event) {
    event.preventDefault();
    const name = document.getElementById('loginName').value;
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (isSignupMode) {
        // Signup mode
        if (!name || !email || !password || !confirmPassword) {
            showNotification('error', 'Missing Information', 'Please fill in all fields to create your account.');
            return;
        }

        if (password !== confirmPassword) {
            showNotification('error', 'Password Mismatch', 'The passwords you entered do not match. Please try again.');
            return;
        }

        if (password.length < 6) {
            showNotification('error', 'Weak Password', 'Your password must be at least 6 characters long for security.');
            return;
        }

        // Check if user already exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            showNotification('warning', 'Account Exists', 'An account with this email already exists. Please login instead.');
            return;
        }

        // Create new user
        const newUser = {
            name: name,
            email: email,
            password: password,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('alMuawinUsers', JSON.stringify(users));

        showNotification('success', 'Account Created!', 'Your account has been created successfully. You can now login.');
        toggleAuthMode(event);
        document.getElementById('loginForm').reset();
    } else {
        // Login mode
        if (!email || !password) {
            showNotification('error', 'Missing Credentials', 'Please enter both email and password to login.');
            return;
        }

        // Check credentials
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            isLoggedIn = true;
            currentUser = user.name || user.email.split('@')[0];
            document.getElementById('authSection').innerHTML = `
                <span class="user-name">Welcome, ${currentUser}</span>
                <button class="logout-btn" onclick="logout()">Logout</button>
            `;
            closeLoginModal();
            document.getElementById('loginForm').reset();
            showNotification('success', 'Welcome Back!', `You have successfully logged in as ${currentUser}.`);
        } else {
            showNotification('error', 'Invalid Credentials', 'The email or password you entered is incorrect. Please try again or create a new account.');
        }
    }
}

function toggleAuthMode(event) {
    event.preventDefault();
    isSignupMode = !isSignupMode;

    const modalTitle = document.getElementById('modalTitle');
    const nameLabel = document.getElementById('nameLabel');
    const nameInput = document.getElementById('loginName');
    const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const submitBtn = document.getElementById('submitBtn');
    const toggleText = document.getElementById('toggleText');
    const toggleLink = document.getElementById('toggleLink');

    if (isSignupMode) {
        modalTitle.textContent = 'Create Your Account';
        nameLabel.style.display = 'block';
        nameInput.style.display = 'block';
        nameInput.required = true;
        confirmPasswordGroup.style.display = 'block';
        confirmPasswordInput.required = true;
        submitBtn.textContent = 'Create User';
        toggleText.textContent = 'Already have an account? ';
        toggleLink.textContent = 'Login';
    } else {
        modalTitle.textContent = 'Login to Al Muawin Watches';
        nameLabel.style.display = 'none';
        nameInput.style.display = 'none';
        nameInput.required = false;
        confirmPasswordGroup.style.display = 'none';
        confirmPasswordInput.required = false;
        submitBtn.textContent = 'Login';
        toggleText.textContent = "Don't have an account? ";
        toggleLink.textContent = 'Create User';
    }

    document.getElementById('loginForm').reset();
}

function logout() {
    isLoggedIn = false;
    currentUser = null;
    cart = [];
    updateCart();
    renderWatches(currentCategory);
    document.getElementById('authSection').innerHTML = `
        <button class="signup-btn" onclick="showSignupModal()">Create User</button>
        <button class="login-btn" onclick="showLoginModal()">Login</button>
    `;
    showNotification('info', 'Logged Out', 'You have been successfully logged out.');
}

document.addEventListener('DOMContentLoaded', () => {
    renderWatches();

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentCategory = e.target.dataset.category;
            renderWatches(currentCategory);
        });
    });

    document.getElementById('checkoutBtn').addEventListener('click', checkout);
    document.getElementById('loginForm').addEventListener('submit', login);

    window.onclick = function(event) {
        const modal = document.getElementById('loginModal');
        if (event.target === modal) {
            closeLoginModal();
        }
    };
});
