const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      },
      colors: {
        primary: "#00E3B5",    // turquoise
        secondary: "#5FDBFD",  // light blue
        accent: "#F9C62C",     // gold
        highlight: "#80EED3",  // mint green
        background: "#F4EBA7", // light yellow
        dark: "#131313",       // black
        light: "#FFFFFF"       // white
      },
      fontFamily: {
        pixel: ["'Press Start 2P'", "cursive"],
      },
    },
  },
  plugins: [],
});