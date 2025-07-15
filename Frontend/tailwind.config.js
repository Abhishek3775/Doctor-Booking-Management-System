//  @type {import('tailwindcss').Config} 
import tailwindcss from '@tailwindcss/vite'
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#5f6fff"
        },
      },
    },
    plugins: [tailwindcss()],
  }
  