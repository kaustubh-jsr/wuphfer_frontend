module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontSize: {
        10: "10px",
        14: "14px",
      },
      backgroundColor: {
        "main-bg": "#FFF",
        "main-dark-bg": "#15202B",
        "secondary-dark-bg": "rgb(30, 39, 50);",
        "hover-dark-bg": "rgb(247,249,249,0.1)",
        "light-gray": "#F7F7F7",
        "half-transparent": "rgba(0, 0, 0, 0.5)",
        "light-blue": "rgba(29,155,240,0.1)",
        "dark-blue": "rgba(29,156,241,1)",
      },
      borderColor: {
        "light-border": "rgb(239,243,244,1)",
        "dark-border": "rgb(56,68,77,1)",
      },
    },
  },
  plugins: [],
};
