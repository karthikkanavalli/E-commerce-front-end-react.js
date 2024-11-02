/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        cart: "url('./src/assets/cart.avif')",
        cartLable: "url('./src/assets/cart-style.avif')",
        homeBanner:"url('./src/assets/home.jpg')",
      },
      minHeight: {
        dvh: "100dvh", // Custom minimum height for dynamic viewport height
      },
    },
  },
  plugins: [],
};

