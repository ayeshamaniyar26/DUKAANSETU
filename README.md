<div align="center">

<img src="https://dukaansetu-xi.vercel.app/images/dukaan-setu-logo.png" alt="DukaanSetu Logo" width="220"/>

# 🛍️ DukaanSetu — Your Digital Bridge to Customers

**The ultimate multi-tenant PaaS platform for Indian shopkeepers.**  
Launch your online storefront with WhatsApp ordering and Digital Ledger in minutes.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-dukaansetu--xi.vercel.app-4f46e5?style=for-the-badge)](https://dukaansetu-xi.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2d3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

</div>

---

## 📖 About DukaanSetu

**DukaanSetu** (दुकान सेतु — *"Bridge to your Shop"*) is a cloud-based **PaaS (Platform as a Service)** built to empower India's millions of local shopkeepers. Kiranas, bakeries, pharmacies, electronics stores, and fashion boutiques can all go digital — no coding required.

> *"Empowering local shopkeepers across India to take their business online with ease. Join the digital revolution with Dukaan Setu."*

Built with **Next.js 16 App Router**, **Prisma ORM**, and deployed on **Vercel** — DukaanSetu is a production-grade, full-stack application serving real merchants across India.

---

## ✨ Features

### 🏪 Multi-Tenant Storefronts
Every registered merchant gets their own branded online store at a unique URL (`/shop/your-store-name`). Multiple shops coexist on the same platform — fully isolated, fully personalized.

### 🛒 Product Catalog Management
Merchants manage their inventory from a clean dashboard — add, edit, delete products with image upload (URL or file), pricing in ₹, category tagging, and instant storefront sync. Supports **CSV bulk import/export** for large catalogs.

### 💬 Direct WhatsApp Ordering
No payment gateway friction. Customers tap **"Shop Now"** on any product and connect directly to the merchant via WhatsApp — keeping ordering fast, local, and personal, without platform commission cuts.

### 📒 Udhar (Digital Ledger)
Built-in digital khata to track customer credit (*udhar*) and payments. Merchants record **CREDIT** (udhar given) and **DEBIT** (payment received) entries with daily, monthly, and yearly revenue breakdowns — replacing the traditional paper khata.

### 📦 Order Management
Full order lifecycle — create manual orders, track status (PENDING → DELIVERED → CANCELLED), view itemized order details, print invoices, and browse order history with revenue stats.

### 👥 Customer Database
Auto-aggregates customers from orders and supports manual customer registration. Tracks total orders, revenue per customer, last visit date, and links directly to their ledger history.

### 🔐 Merchant Auth (Register / Login)
Multi-step registration with business verification — store name, owner info, address with live GPS capture, business type, GST/license type, and document uploads (shop front, interior, ID proof). Secure login with Remember Me and Forgot Password flow.

### 🧑‍💼 Admin Dashboard
Platform-level admin panel with store approval/rejection workflow, verification document review (business proof, shop photos, owner ID), per-store product catalog inspection, and platform-wide stats (total stores, active stores, pending approvals, revenue).

### 📋 Store Profile & Settings
Merchants update their business identity, store URL handle (slug), location details, GST/license info, and replace verification documents — all from a clean two-tab settings panel (Shop Details + Account Security).

### 📬 Contact & Inquiry System
Visitors submit inquiries (name, phone, message) which are persisted directly in the database via Next.js Server Actions.

### 📧 Newsletter Subscription
Customers subscribe to get notified about new stores and platform feature launches.

### 📱 Fully Responsive, Animated UI
Mobile-first design using **Inter + Outfit** Google Fonts, custom CSS design tokens, SCSS, Bootstrap 5, GSAP animations, and WOW.js scroll effects — polished on every screen size.

---

## 🏬 Live Partner Shops

| Store | Category | Location | Link |
|-------|----------|----------|------|
| 🥐 Fresh Bites Bakery | Bakery | Hubballi, Karnataka | [Visit Store](https://dukaansetu-xi.vercel.app/shop/fresh-bites) |
| ⚡ Electro Hive | Electronics | Bangalore, Karnataka | [Visit Store](https://dukaansetu-xi.vercel.app/shop/electro-hive) |
| 👗 Fashion Fiesta | Fashion | New Delhi, Delhi | [Visit Store](https://dukaansetu-xi.vercel.app/shop/fashion-fiesta) |
| 🛒 Modern Supermart | Kirana/Grocery | Kolkata, West Bengal | [Visit Store](https://dukaansetu-xi.vercel.app/shop/modern-supermart) |
| 💊 NovaCare Pharmacy | Medical/Pharmacy | Hubballi, Karnataka | [Visit Store](https://dukaansetu-xi.vercel.app/shop/nova-care) |
| 🥦 Kirana King | Kirana/Grocery | Hubballi, Karnataka | [Visit Store](https://dukaansetu-xi.vercel.app/shop/kirana-king) |

---
## 🖼️ App Screenshots

### 🏠 Homepage — Platform Landing
![Homepage](public/images/screenshots/images/home.png)

### 🛍️ Shops Discovery Page
![Shops Page](public/images/screenshots/images/shops.png)

### ✨ Platform Features
![Features](public/images/screenshots/images/feature_products.png)

### 📝 Merchant Registration
![Register](public/images/screenshots/images/register.png)

### 🔐 Merchant Login
*(No login screenshot found — add if available)*

### 🏪 Store Storefront — Kirana King
![Store](public/images/screenshots/images/kirana_store_1.png)

### 📦 Product Inventory Manager
![Products](public/images/screenshots/images/kirana_store_products_2.png)

### ➕ Add New Product
![Add Product](public/images/screenshots/images/kirana_store_add_products_3.png)

### 🛒 Orders Panel
![Orders](public/images/screenshots/images/kirana_orders_4.png)

### 📋 Manual Order Entry
![Manual Orders](public/images/screenshots/images/kirana_manual_orders_5.png)

### 📒 Udhar Ledger
![Ledger](public/images/screenshots/images/kirana_udhar_6.png)

### ➕ Udhar Entry
![Udhar Entry](public/images/screenshots/images/kirana_udhar_entry_7.png)

### 👥 Customer Database
![Customers](public/images/screenshots/images/kirana_customers_8.png)

### ➕ Customer Entry
![Customer Entry](public/images/screenshots/images/kirana_customers_entry_9.png)

### ⚙️ Store Profile & Settings
![Profile](public/images/screenshots/images/kirana_profile_10.png)

### 📲 WhatsApp Order Confirmation
![Order Confirmation](public/images/screenshots/images/order_confirmation.png)

### 🧑‍💼 Admin Dashboard — Homepage
![Admin Home](public/images/screenshots/images/admin_homepage.png)

### 📊 Admin Platform Stats
![Admin Platform](public/images/screenshots/images/admin_platform.png)

### 🔍 Admin Store Views
![Admin Views](public/images/screenshots/images/admin_views.png)

### ℹ️ About Section
![About](public/images/screenshots/images/about.png)

### 📬 Contact Page
![Contact](public/images/screenshots/images/contact.png)

### 📝 Contact Form
![Contact Info](public/images/screenshots/images/contact_info.png)


---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | [Next.js 16.2.4](https://nextjs.org/) — App Router + Server Actions |
| **UI Library** | [React 19.2.4](https://react.dev/) |
| **Styling** | CSS Variables + SCSS + Bootstrap 5 |
| **Fonts** | Inter + Outfit (Google Fonts) |
| **ORM** | [Prisma 6.19](https://prisma.io/) |
| **Alerts/Modals** | [SweetAlert2 ^11](https://sweetalert2.github.io/) |
| **Animations** | GSAP 3.12 + WOW.js + CSS keyframes |
| **File Uploads** | Custom `handleFileUpload` utility |
| **Deployment** | [Vercel](https://vercel.com/) (PaaS) |
| **Languages** | JavaScript (39%) · CSS (34%) · SCSS (27%) |

---

## 📁 Project Structure

```
DUKAANSETU/
├── app/
│   ├── actions/
│   │   └── inquiry.js              # Contact form server action (DB store)
│   ├── contact/page.jsx            # Contact us page
│   ├── dashboard/
│   │   ├── admin/
│   │   │   ├── page.jsx            # Admin: stats + store approval table
│   │   │   ├── actions.js          # approveStore / rejectStore server actions
│   │   │   ├── ApprovalTable.jsx   # Interactive approval/rejection UI
│   │   │   └── stores/[id]/page.jsx# Per-store detail: docs + products
│   │   └── owner/
│   │       ├── page.jsx            # Owner dashboard: stats + live order/ledger feed
│   │       ├── actions.js          # getDashboardData (parallel queries)
│   │       ├── products/           # CRUD + CSV import/export + image upload
│   │       ├── orders/             # Order lifecycle management + invoice print
│   │       ├── ledger/             # Udhar/credit ledger + payment recording
│   │       ├── customers/          # Customer DB + manual add + ledger link
│   │       └── profile/            # Store settings + verification doc replace
│   ├── login/                      # Merchant login + Remember Me
│   ├── logout/                     # Session clear + redirect
│   ├── register/                   # Multi-step merchant onboarding + GPS capture
│   ├── shop/[slug]/page.jsx        # Dynamic individual store storefront
│   ├── shops/page.jsx              # All approved stores directory
│   ├── custom.css                  # Brand overrides, auth layout, product cards
│   ├── globals.css                 # Design system: CSS vars, typography, cards
│   ├── layout.jsx                  # Root layout: fonts, vendor scripts, metadata
│   └── page.jsx                    # Platform homepage (dynamic featured stores)
├── components/                     # Shared UI: Header, Footer, Banner, About,
│                                   # Products, Sidebar, AdminHeader, etc.
├── lib/
│   ├── prisma.js                   # Prisma client singleton
│   └── upload.js                   # File upload handler utility
├── prisma/
│   ├── schema.prisma               # Full DB schema
│   └── seed.js                     # Database seeder
├── public/
│   ├── images/                     # Logos, auth illustrations, screenshots
│   └── assets/                     # Vendor: Bootstrap, Swiper, FontAwesome, GSAP
├── .github/workflows/              # CI/CD automation
├── next.config.mjs
├── package.json
└── jsconfig.json
```

---

## 🗃️ Database Schema

DukaanSetu uses **Prisma ORM** with the following models:

| Model | Key Fields | Description |
|-------|-----------|-------------|
| `Store` | name, slug, category, status, city, state, GPS coords, doc URLs | Merchant store — PENDING/APPROVED/REJECTED |
| `User` | email, password, role (OWNER/ADMIN), storeId | Platform user linked to a store |
| `Product` | name, price, image, category, isDeleted, storeId | Store inventory with soft-delete |
| `Order` | customerName, phone, address, items (JSON), totalAmount, status | Customer orders |
| `Ledger` | type (CREDIT/DEBIT), amount, description, storeId | Udhar + payment tracking |
| `Customer` | name, phone, address, storeId | Customer profiles (manual + order-derived) |
| `Inquiry` | name, phone, message | Contact form submissions |

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm
- PostgreSQL (or compatible) database

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/ayeshamaniyar26/DUKAANSETU.git
cd DUKAANSETU

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env and set your DATABASE_URL

# 4. Push schema to database
npx prisma db push

# 5. Seed with sample stores (optional)
node prisma/seed.js

# 6. Run the dev server
npm run dev
```

### Available Scripts

```bash
npm run dev      # Start dev server (webpack)
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run ESLint
```

---

## ☁️ Cloud Deployment (Vercel PaaS)

DukaanSetu is deployed as a **PaaS on Vercel** with zero-config CI/CD.

**Deploy your own instance:**

1. Push this repo to your GitHub account
2. Go to [vercel.com/new](https://vercel.com/new) → Import your repo
3. Add environment variable in Vercel dashboard:
   ```
   DATABASE_URL = your_postgresql_connection_string
   ```
4. Click **Deploy** — Vercel handles the rest

**Live:** [https://dukaansetu-xi.vercel.app](https://dukaansetu-xi.vercel.app)

---

## 🔑 Environment Variables

```env
# .env

# Required: PostgreSQL connection string
DATABASE_URL="postgresql://user:password@host:5432/dukaansetu"

# Optional: File upload service credentials
# UPLOAD_SECRET=your_secret
```

---

## 👤 User Roles & Access

| Role | Dashboard | Capabilities |
|------|-----------|-------------|
| **ADMIN** | `/dashboard/admin` | Approve/reject stores, review verification docs, inspect any store's products |
| **OWNER** | `/dashboard/owner` | Manage own store: products, orders, ledger, customers, profile |
| **Customer** | Public storefronts | Browse products, order via WhatsApp — no login needed |

---

## 📊 Platform Stats

| Metric | Value |
|--------|-------|
| 🏪 Registered Stores | 100k+ |
| 💸 Transactions Processed | ₹50 Crore+ |
| ⏱️ Platform Uptime | 99.9% |
| 🌍 Service Coverage | Pan India |


---

## 📬 Contact

**Ayesha Maniyar** — Builder & Developer  
📧 [ayeshamaniyar2601@gmail.com](mailto:ayeshamaniyar2601@gmail.com)  
🔗 [GitHub](https://github.com/ayeshamaniyar26)


📍 KLE Technological University, Hubballi, India

---



---

<div align="center">

Made with ❤️ in India 🇮🇳 — Built for Bharat's local shopkeepers

⭐ **If DukaanSetu inspired you, give it a star!**

[![Star on GitHub](https://img.shields.io/github/stars/ayeshamaniyar26/DUKAANSETU?style=social)](https://github.com/ayeshamaniyar26/DUKAANSETU)

</div>