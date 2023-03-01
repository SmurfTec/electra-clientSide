/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/elektra/pages/**/*.{js,ts,jsx,tsx}',
    './apps/elektra/app/components/**/*.{js,ts,jsx,tsx}',
    './libs/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    // due to https://github.com/tailwindlabs/tailwindcss/issues/6602 - buttons disappear
    preflight: false,
  },
}
