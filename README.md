# ShopKart

ShopKart is an e-commerce website built using the MERN stack. Users can browse products, manage their cart and wishlist, and place orders through checkout.

## Features

- User registration and login
- Browse products and view product details
- Add and remove products from the wishlist
- Add products to the cart and manage quantities
- Checkout with shipping details
- Razorpay test payment integration
- Payment verification on the backend
- View previous orders

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **State Management:** Redux Toolkit
- **Payments:** Razorpay

## Getting Started

### Prerequisites

- Node.js and npm
- A MongoDB database
- Razorpay test account credentials for payment testing

### 1. Clone the repository

\`\`\`bash
git clone https://github.com/bansalrujul07/ShopKart
cd ShopKart
\`\`\`

### 2. Set up the backend

\`\`\`bash
cd backend
npm install
\`\`\`

Create a \`.env\` file inside the \`backend\` directory using \`.env.example\` as a reference. Add your own MongoDB connection string, JWT secret, and Razorpay test credentials.

Start the backend:

\`\`\`bash
node index.js
\`\`\`

### 3. Set up the frontend

Open a second terminal:

\`\`\`bash
cd ~/Desktop/ShopKart/frontend/frontend
npm install
npm run dev
\`\`\`

Open the local URL displayed by Vite in your browser.

## Payment Setup

ShopKart uses Razorpay in test mode. Configure your Razorpay test credentials in the backend \`.env\` file. The backend creates payment orders and verifies payment signatures before confirming successful payments.

## Notes

- Configure your MongoDB connection before starting the backend.
- Keep database credentials, JWT secrets, and Razorpay secret keys private.
- Never upload your \`.env\` file to GitHub.
- Use Razorpay test credentials when testing payments.
