# Ace Vogue
Open index.html directly, or run a local server:
  cd site && python3 -m http.server 8000   -> http://localhost:8000
Edit prices, copy, contact details and social links at the top of js/app.js (PRODUCTS and CONFIG).
Needs integration: payments (Paystack/Flutterwave) and a mail service for the contact form (currently opens a mail draft).
Animations load GSAP from cdnjs; if it cannot load, the site falls back to a static layout.
