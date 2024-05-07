/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gradientBlack: "#201B1B",
        gradientBG1: "#2A3275",
        gradientBG2: "#2B1030",
        gradientBG3: "#39014C",
        black: "#201B1B",
        dark: "#030101",
        stealPink: "#D709D8",
        federalBlue: "#080F58",
        russianViolet: "#39014C",
        eminence: "#763583",
      },
      fontFamily: {
        "roboto": ['Roboto', 'sans-serif'],
      },
      fontWeight: {
        "light": 300,
        "regular": 400,
        "medium": 500,
        "bold": 700,
        "black": 900,
      },
    },
    fontSize: {
      "h1": "56px",
      "h2": "48px",
      "h3": "40px",
      "h4": "32px",
      "subheading": "20px",
      "paragraph": "18px",
      "small": "16px",
    }

  },
  
  plugins: [],
}


// theme: {
//   extend: {
//   colors: {
//     white: "#fff",
//     midnightblue: "#39014c",
//     whitesmoke: "rgba(245, 245, 245, 0.5)"
//   },
//     spacing: {}
//   },
//     fontSize: {
//     inherit: "inherit"
//   }
//   },
//   corePlugins: {
//     preflight: false
//   }
