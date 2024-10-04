/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightblue: {
          400: "#3AB0FF", // Adjust to your desired shade
        },
      },
    },
  },
  plugins: [],
};
