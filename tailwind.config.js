/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'surface-variant': '#e0e3e5',
        'error': '#ba1a1a',
        'on-error-container': '#93000a',
        'on-secondary-fixed-variant': '#3f465c',
        'primary-container': '#2563eb',
        'surface-container-high': '#e6e8ea',
        'on-tertiary-fixed': '#002114',
        'secondary-container': '#dae2fd',
        'on-primary-container': '#eeefff',
        'secondary-fixed': '#dae2fd',
        'error-container': '#ffdad6',
        'inverse-on-surface': '#eff1f3',
        'primary': '#004ac6',
        'on-secondary-fixed': '#131b2e',
        'surface': '#f7f9fb',
        'outline-variant': '#c3c6d7',
        'primary-fixed-dim': '#b4c5ff',
        'on-secondary': '#ffffff',
        'primary-fixed': '#dbe1ff',
        'on-tertiary-fixed-variant': '#005137',
        'on-primary-fixed-variant': '#003ea8',
        'on-error': '#ffffff',
        'surface-container-lowest': '#ffffff',
        'on-primary': '#ffffff',
        'tertiary-fixed-dim': '#68dba9',
        'secondary': '#565e74',
        'on-secondary-container': '#5c647a',
        'on-surface-variant': '#434655',
        'surface-tint': '#0053db',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#007d57',
        'secondary-fixed-dim': '#bec6e0',
        'inverse-primary': '#b4c5ff',
        'outline': '#737686',
        'on-primary-fixed': '#00174b',
        'surface-dim': '#d8dadc',
        'surface-container-highest': '#e0e3e5',
        'surface-container': '#eceef0',
        'tertiary-fixed': '#85f8c4',
        'surface-container-low': '#f2f4f6',
        'background': '#f7f9fb',
        'inverse-surface': '#2d3133',
        'on-background': '#191c1e',
        'surface-bright': '#f7f9fb',
        'on-surface': '#191c1e',
        'on-tertiary-container': '#bdffdc',
        'tertiary': '#006243',
        'muted': {
          DEFAULT: '#5A5D6E',
          light: '#7A7D8E'
        }
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'DEFAULT': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px'
      },
      fontFamily: {
        'headline': ['Newsreader', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'label': ['Inter', 'sans-serif']
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
};
