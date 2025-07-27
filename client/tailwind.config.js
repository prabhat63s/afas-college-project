/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero": "url('https://png.pngtree.com/thumb_back/fw800/background/20231019/pngtree-wallpaper-featuring-the-texture-of-tropical-forest-trees-and-banana-leaves-image_13673089.png')"
      },
    },
  },
  plugins: [],
}