/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
 
    darkMode: 'class',
   
  
  theme: {
    extend: {
      backgroundColor: {
        'custom-bg-color': '#111927',
        'custom-btnColor': '#9FEF00',
        'custom-cyan' : '#04D2C8',
        'profile-card-color': '#4d44b5',
        'dashboard-bg' : '#1F1F1F',
        'teacher-card-bg' : '#272738',
        'teacher-btn' : '#FB7D5B',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      height: {
        'homeBanner': '80vh', 
        'homeBanner-sm': '60vh',
        'screen+50': '150vh'
      },
      fontSize: {
        'verySmall': '0.625rem',
        'verySmall-1': '0.725rem',
        'veryLarge': '2.5rem'
      },
      colors: {
        'profile-color' : '#4d44b5',
        'dashboard' : '#9FEF00',
        'profile-color' : '#4d44b5',
      }
    },
  },
  plugins: [],
}

