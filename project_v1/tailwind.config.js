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
        primary: '#18181b',
        secondary: '#262626',
        tertiary: '#404040',
      },
      textColor: {
        primary: '#ffffff',
        secondary: '#cbd5e0',
      },
      borderColor: {
        primary: '#3f3f46',
        secondary: '#71717a',
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
