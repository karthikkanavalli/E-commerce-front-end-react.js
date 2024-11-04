/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        cart: "url('./src/assets/cart.avif')",
        cartLable: "url('./src/assets/cart-style.avif')",
        homeBanner: "url('./src/assets/home.jpg')",
        homeBanner2:"url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTOvCMNDLE42adYSjyvpOUZbv88b5dMM9NdQ&s')",
      },
      imageRendering: {
        crisp: "crisp-edges",
        "optimize-contrast": "-webkit-optimize-contrast",
      },
      minHeight: {
        dvh: "100dvh", // Custom minimum height for dynamic viewport height
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".image-crisp": { "image-rendering": "crisp-edges" },
        ".image-optimize-contrast": {
          "image-rendering": "-webkit-optimize-contrast",
        },
      });
    },
  ],
};

