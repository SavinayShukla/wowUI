/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Inter"'],
      },
      backgroundColor: {
        primary: '#030712',
        secondary: '#042f2e',
        button: '#6366f1'
      },
      textColor: {
        primary: '#ffffff',
        secondary: '#cbd5e0',
      },
      borderColor: {
        primary: '#4a5568',
        secondary: '#718096',
      },
      extend: {
        colors: {
          accent: {
            primary: '#3498db',
            secondary: '#e74c3c',
          },
        },
      },
    },
  },
  plugins: [],
}
