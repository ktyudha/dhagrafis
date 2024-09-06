/* eslint-disable no-undef */

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        'midnight-blue': {
          50: '#edfaff',
          100: '#d6f3ff',
          200: '#b6ebff',
          300: '#84e1ff',
          400: '#4aceff',
          500: '#20b1ff',
          600: '#0992ff',
          700: '#027af3',
          800: '#0961c4',
          900: '#0f5499',
          950: '#103968'
        },
        'golden-dream': {
          50: '#fdfee8',
          100: '#fafdc4',
          200: '#fcfd8b',
          300: '#fbf649',
          400: '#f8e817',
          500: '#e7ce0a',
          600: '#c8a206',
          700: '#a07608',
          800: '#845c0f',
          900: '#704b13',
          950: '#412807'
        }
      }
    },
    fontFamily: {
      body: [
        'Montserrat',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ],
      sans: [
        'Montserrat',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ]
    }
  },
  plugins: [require('flowbite/plugin'), require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#103968',
          secondary: '#E7CE0A'
        },
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#103968',
          secondary: '#E7CE0A',
          'base-content': '#ffff'
        }
      }
    ]
  }
}
