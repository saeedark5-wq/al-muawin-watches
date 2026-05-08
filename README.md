# Al Muawin Watches

A luxury watch e-commerce website with user authentication and shopping cart functionality.

## Features

- **Beautiful UI/UX** - Modern dark theme with gold accents
- **User Authentication** - Create account and login system with localStorage
- **Shopping Cart** - Add watches, adjust quantities, remove items
- **Category Filtering** - Filter watches by Sport, Dress, Casual, and Luxury
- **Real Watch Images** - High-quality product photography from Unsplash
- **Watermarked Images** - All product images branded with "AL MUAWIN"
- **Responsive Design** - Works on desktop and mobile devices
- **Sliding Cart Panel** - Convenient side panel for cart management
- **Beautiful Notifications** - Custom modal notifications for all user actions

## Technologies Used

- HTML5
- CSS3 (with animations and gradients)
- Vanilla JavaScript
- LocalStorage for user data persistence

## How to Use

1. Open `index.html` in your web browser
2. Click "Create User" to register a new account
3. Login with your credentials
4. Browse watches by category
5. Add watches to your cart (requires login)
6. Click the cart icon to view and manage your cart
7. Adjust quantities or remove items as needed
8. Click "Checkout" to complete your purchase

## Project Structure

```
watch-website/
├── index.html      # Main HTML file
├── styles.css      # All styling and animations
├── script.js       # JavaScript functionality
└── README.md       # Project documentation
```

## Features in Detail

### Authentication System
- Create new user accounts with name, email, and password
- Password validation (minimum 6 characters)
- Duplicate email prevention
- Secure login with credential verification
- User data stored in browser localStorage
- Logout functionality with cart clearing

### Shopping Cart
- Protected cart (login required)
- Add/remove products
- Quantity adjustment (+/-)
- Real-time price calculation
- Tax calculation (10%)
- Subtotal and total display
- Checkout with order confirmation

### Product Catalog
- 12 luxury watches across 4 categories
- Real product images with watermarks
- Price range: $699 - $12,999
- Category filtering
- Hover effects and animations

## Browser Compatibility

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## License

© 2026 Al Muawin Watches. All rights reserved.

## Author

Developed for Al Muawin Watches
