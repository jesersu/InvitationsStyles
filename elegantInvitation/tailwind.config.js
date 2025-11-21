/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        floatImage: "floatImage 4s ease-in-out infinite",
        fadeInDown: "fadeInDown 1s ease-out 0.3s both",
        fadeInUp: "fadeInUp 1s ease-out 0.6s both",
        scaleIn: "scaleIn 1s ease-out 0.9s both",
      },
      keyframes: {
        floatImage: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        fadeInDown: {
          from: {
            opacity: "0",
            transform: "translateY(-30px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeInUp: {
          from: {
            opacity: "0",
            transform: "translateY(30px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        scaleIn: {
          from: {
            opacity: "0",
            transform: "scale(0.8)",
          },
          to: {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
}
