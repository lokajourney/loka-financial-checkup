/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        loka: {
          green:   '#2E4D33',
          'green-mid': '#4A7A52',
          orange:  '#D8895B',
          cream:   '#FAF8F4',
          dark:    '#1A2E1C',
          text:    '#243127',
          muted:   '#5E6A60',
          border:  '#E8E2DA',
          success: '#5B8A68',
          danger:  '#DC2626',
          'success-bg': 'rgba(91,138,104,0.1)',
          'orange-bg':  'rgba(216,137,91,0.08)',
          'danger-bg':  'rgba(220,38,38,0.07)',
          'green-bg':   'rgba(46,77,51,0.06)',
          'green-hover':'rgba(46,77,51,0.05)',
          'green-ring': 'rgba(46,77,51,0.08)',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.5rem',
        '5xl': '1.75rem',
      },
      boxShadow: {
        card: '0 2px 20px rgba(36,49,39,0.08)',
        'card-hover': '0 4px 28px rgba(36,49,39,0.14)',
        green: '0 4px 16px rgba(46,77,51,0.25)',
        orange: '0 4px 16px rgba(216,137,91,0.3)',
      },
      maxWidth: {
        form: '420px',
      },
    },
  },
  plugins: [],
}
