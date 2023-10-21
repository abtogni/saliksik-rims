/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    backgroundColor: theme => ({
             ...theme('colors'),
             'button': '#D1462F',
             'button-hover': '#C2412C',
             'danger': '#e3342f',
            })
  },
  plugins: []
};

