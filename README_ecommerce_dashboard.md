# Eommerce Dashboard — Complete Project Documentation

## Overview

This document explains the Complete flow for the **Ecommerce Dashboard** Assessment Project. It covers the architecture, folder structure, development flow, API integration, component flow, state lifecycle, error handling, testing checklist, debugging tips, and deployment notes. This version focuses on clear, step-by-step explanations rather then raw code so that reviewers can easily follow the entire flow.

---

## Goals

- Build a responsive Inventory Dashboard using React and Typescript.
- Use Tailwind CSS for styling and responsive layouts.
- Manage state with Redux Toolkit and async operations with thunks.
- Centralize API calls using Axios and implement interceptors.
- Persist user wishlists and theme in localStorage

---

## Technology Summary

- Frontend: React + TypeScript
- Tooling: Vite
- Styling: Tailwind CSS (utility-first)
- State Management: Redux Toolkit(slices + thunks)
- HTTP Client: Axios (with interceptors)
- Persistence: localStorage for wishlists and theme
- Animation: Framer Motion
- Icons: Lucide React

---

---

## 🏗️ Project Setup (Step-by-Step)

## 1️⃣ Create React + TypeScript Project

```bash
# 1. Create Vite + React + TypeScript project
npm create vite@latest user-dashboard -- --template react-ts
cd user-dashboard

# 2. Install runtime libs
npm install axios @reduxjs/toolkit react-redux react-router-dom

# 3. Install Tailwind dev tools
npm install -D tailwindcss@3 postcss autoprefixer

# 4. Init Tailwind
npx tailwindcss init -p

#5. Install Icon Library
npm install lucide-react(For search box icon)
```

---

## 🎨 Tailwind CSS Configuration

### 🔧 `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### 🧾 `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### ✅ Verify Installation

Run:

```bash
npm run dev
```

---

## 🧰 Vite Configuration

### ⚙️ `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
```

---

# 🌐 API Integration Setup

Example API Endpoint:

```
https://dummyjson.com/products
```

---

## 🧩 Axios Client (Centralized API Layer)

### 📁 `src/api/axiosClient.ts`

```ts
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://dummyjson.com", // Your mock API
  headers: {
    "Content-Type": "application/json",
  },
});
axiosClient.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("[API Request Error]", error);
    return Promise.reject(error);
  }
);
axiosClient.interceptors.response.use(
  (response) => {
    console.log(`[API Response]`, response.status, response.config.url);
    return response;
  },
  (error) => {
    const message = error?.response?.data || error.message || "Network error";
    return Promise.reject(message);
  }
);

export default axiosClient;
```

---

## 🧭 API Methods

### 📁 `src/api/productApi.ts`

```ts
import axiosClient from "./axiosClient";
import type { Product } from "../types/productTypes";

export const productApi = {
  getAll: (limit = 200, skip = 0) =>
    axiosClient.get(`/products?limit=${limit}&skip=${skip}`),
  getById: (id: number) => axiosClient.get(`/products/${id}`),
  add: (product: Partial<Product>) =>
    axiosClient.post("/products/add", product),
  update: (id: number, product: Partial<Product>) =>
    axiosClient.put(`/products/${id}`, product),
  remove: (id: number) => axiosClient.delete(`/products/${id}`),
};
```

---

## Folder Structure (high-level, updated)(Clean Architecture)

```
ECOMMERCE_DASHBOARD/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── src/
    ├── api/                      # API layer (Axios client + endpoint methods)
    │   ├── axiosClient.ts        # Axios setup with interceptors
    │   └── productApi.ts         # Product-related API methods
    │
    ├── app/                      # Redux store configuration
    │    └── store.ts
    │
    ├── content/                  # Search bar
    │    └── SearchBox.tsx
    │
    ├── features/                  # Feature-based folder structure
    │    ├── products/
    │    │   ├── productCard.tsx             # Product display Card
    │    │   ├── productFilters.tsx          # Product filtering options
    │    │   ├── productQuickView.tsx        # Product quick preview modal
    │    │   └── productSlice.ts             # Redux slice for products
    │    │
    │    └── wishlist/
    │        └── wishlistSlice.ts            # Redux slice for wishlist
    │
    ├── hooks/                    # Custom typed Redux hooks
    │    └──useApp.ts
    │
    ├── components/               # Shared components for layout & UI
    │    ├── layout/
    │    │   └── Layout.tsx       # App layout wrapper (header, inventory page, and Footer)
    │    │
    │    ├── ui/
    │    │   ├── Modal.tsx          # Resuable modal component using framer Motion
    │    │   └── ToggleTheme.tsx    # Theme toggle button (light/dark mode)
    │    │
    │    └── Loader.tsx            # Loading spinner component
    │
    ├── type/                       #contains Product interface
    │     productTypes.ts
    │ 
    ├── pages                     # Page-level components
    │    └── inventory.tsx        # Main invetory management page
    │
    └── main.tsx                  # Application entry point
```

---

## Overall End-to-End Flow — Short Version

1. User opens the app (Ecommerce dashboard).
2. The Inventory page dispatches an action to fetch the product list.
3. A Redux async thunk calls the getproducts() method from the api/productApi.ts file.
4. The api layer uses the configured axiosClient.ts, where interceptors handle base URL, errors, or authentication headers.
5. The Axios client sends a request to the mock API (https://dummyjson.com/products).
6. On success, the thunk dispatches a fulfilled action that updates the productSlice (s).
7. The Inventory page automatically re-renders by reading state via useAppSelector.
8. User can filter, search, or view quick product details — each interaction dispatches Redux actions that update the state and trigger UI re-renders.
9. Wishlist actions (add/remove) update a separate wishlistSlice, with data persisted in localStorage.
10. The theme toggle (ToggleTheme.tsx in ui/) stores user preference (dark/light) in localStorage and applies it globally.
11. All shared UI components — Header, Filters, Product Cards, Modal, and Loader — reactively update based on store changes, ensuring a seamless user experience.

---

## Flow Diagram

User Opens App
│
▼
APP Startup & Router
│
▼
Theme Initialization (localStorage)
│
▼
Inventory Page Mount 
│
▼
API Layer (axiosClient)
│
▼
Mock API
│
▼
API Response
│
▼
Thunk Fulfilled / Rejected
│
▼
Redux Store Update 
(Product list, loading, error)
│
▼
Inventory Page Re-renders
│ │ │
│ │ └── Filter Products (category, stock, etc.)
│ └── Search Products (client - side)
└── Quick View ──> ProductQuickView (Modal)
└── Wishlist Action ──> wishlistSlice + localStorage
│
▼
UI Updates Complete (Theme toggle, Loader, Layout)

Explanation of the Flow

1. User Open App
   The browser loads index.html, bootstraps React through main.tsx, and initializes Tailwind styles.

2. App Startup & Router   
    Layout.tsx mounts the header, footer, and main content area, while the router directs to pages/inventory.tsx.

3. Theme Initialization
    ToggleTheme.tsx checks localstorage for theme preference (dark/light) and applies Tailwind dark: classes globally.

4. Inventory Page Mounts
   The Inventory page dispatches a Redux async thunk fetchProducts() from productSlice.ts.

5. API Layer & Axios 

   The thunk calls getProducts() in api/productApi.ts, which uses axiosClient.ts. 

   The Axios client applies interceptors for base URL and error handling.

6. Mock API Request
   Axios sends a request to https://dummyjson.com/products

7. API Response Handling
   Response interceptors normalize or log data.

   On success, the thunk dispatches a fulfilled action; on failure, a rejected one.

8. Redux Store Update
   productSlice updates the store with the product list, loading, and error states.

9. Inventory Page Re-render
   React components use useAppSelector to read updated store values.

   The UI re-renders automatically — showing products, filters, and loading states.

10. User Interactions
    Search and Filter update client - side product display   
    Quick View opens the Modal with product details (productQuickView.tsx)
    Wishlist actions update wishlistSlice, persisted in localStorage.

11. UI Updates Complete
    The dashboard layout (Layout.tsx), theme toggle, and all shared components (Modal, Loader, ProductCard, etc.) reactively sync with the store — providing a smooth, dynamic user experience.    

---

## Detailed Step-by-Step Flow Explanation

## 1) App Startup and Router

- When the app starts, main.tsx initializes React and renders the app root.
- The Router determines which page to show — by default, /inventory.
- Layout.tsx mounts globally, containing the Header (brand + theme toggle) <Outlet /> for rendering pages, optional Footer section.
- Before rendering the theme preference is read from localStorage and applied to the document root, activating Tailwind's dark/light styles immediately.

## 2) Inventory Page Mounts

- The Inventory.tsx page is the default view.
- On mount, it dispatches the fetchProducts thunk from productSlice.ts
- A loading state is set ( loading = true) to show the Loader component while data is fetched.
- The UI also initializes any local filter/search states.

## 3) Thunk Exexution and API Call

- The fetchProducts thunk calls getProducts() from api/productApi.ts
- Inside getProducts(), the centralized axiosClient.ts is used.
- Axios request interceptors set base URL https://dummyjson.com and optionally add headers or log requests.
- The Axios request is sent through the Vite proxy (if configured), avoiding CORS issues during local development.

## 4) API Response Handling

- The mock API responds with a JSON array of product objects.
- Axios response interceptors normalize the data and catch any HTTP errors.
- The processed response is returned to the thunk.
- The thunk then dispatches either fulfilled (success) with payload = product, or rejected (failure) with payload = error.message.

## 5) Redux Store Update 

- The productSlice.ts handles all thunk lifecycle actions:
- pending: sets loading = true
- fulfilled: stores list = payload, loading = false, error = null
- rejected: sets loading = false, error = message  
- The Redux store is now updated with the latest product data.
- React automatically re-renders subscribed components when state changes.

## 6) UI Re-Rendering

- The Inventory.tsx pages uses useAppSelector to read list, loading, and error.
- If loading → the Loader spinner is shown.
- If error → a user-friendly message is displayed.
- Once produces are loaded, the data is mapped into multiple ProductCard components.
- Each ProductCard show product image, title, price, and a quick view/ wishlist button.

## 7) Filtering and Searching  

- ProductFilters.tsx and SearchBox.tsx handle client-side filtering.
- when the user selects a category or enters text a Redux action or local state update triggers filtering logic.
- The visible prodcut list a computed from the master list already in the store.
- No extra API call is needed unless server-side filters are implemented.

## 8) Product Quick View (Modal)

- Clicking on a product opens ProductQuickView.tsx (modal).
- The modal receives the selected product's data via props or local state.
- Uses Modal.tsx (Framer Motion animation) to display details.
- Closing the modal simply resets local state; Redux store remains unchanged.

## 9) Wishlist Management

- When the user click the wishlist button the toggleWishlist(product) action from wishlistSlice.ts is dispatched.
- The slice checks if the product already exists in the wishlist array
  - If yes → it's removed.
  - If no → it's added.
- After every update, the wishlist is persisted to localStorage for future sessions.
- This keeps favorite items available even after reload.

## 10) Theme Toggle & Persistence

- The ToggleTheme.tsx button dispatches an action that flips the theme between 'light' and 'dark'.
- The new theme is saved to localStorage.
- This is reactive and persists across reloads.

## 11) Centralized Error & Loading Handling

- axiosClient.ts normalizes all HTTP errors network failure → "Network Error"
- This prevents repetitive try/catch logic across thunks.
- The Redux slice stores error messages centrally so components can render them consistently.
- Loader animations appear globally whenever any slice's loading = true.

---

## Testing Checklist (What to test and how)

1. Tailwind Test: Change a utility class and check if it updates in the browser.
2. API Test: Open DevTools → confirm requests to https://dummyjson.com/products and valid JSON response.
3. Redux Test: Use Redux DevTools to check pending, fulfilled, rejected actions update state correctly.
4. Inventory Page: Verify products load, loader appears while fetching, and error shows if API fails.
5. Search & Filter: Type in search box or choose a category; product list should update instantly.
6. Quick View Modal: Click a product’s “Quick View,” see correct details, and close modal smoothly.
7. Wishlist: Click “♥” to add/remove product; reload page to confirm wishlist saved in localStorage.
8. Theme Toggle: Switch between light/dark mode; reload to ensure theme preference is saved.
9. Error Handling: Break API URL; app should show error message and retry option.

---

## Debugging Tips

- If requests are failing:
  - Check DevTools Network tab to inspect the request URL. It should point to `localhost:5173/api/...` (Vite proxy).
  - Confirm the Vite proxy configuration is present and the dev server was restarted after changes.
- If Redux state isn't updating:
  - Open Redux DevTools and inspect dispatched actions and state slices.
  - Ensure your `extraReducers` keys match the thunk action lifecycle.
- If Tailwind classes are not working:
  - Ensure `tailwind.config` content paths include your `src` folder and the `index.css` is imported in `main.tsx`.
  - Install Tailwind IntelliSense in VS Code to reduce false positives in CSS validation.
- If modal routing behaves oddly:
  - Use `navigate(-1)` for closing to preserve history; if using a stateful modal, ensure selection is cleared on unmount.

---

## Deployment Notes

- Build with the standard Vite production command.
- For production, remove the local Vite proxy and set the real API base URL in Axios client (or use environment variables).
- Host on platforms like Vercel or Netlify; configure environment variables and any backend endpoints accordingly.

---

## Best Practies and Rationale

---

## Author
 
Priyanka - Fronted Assessment

---