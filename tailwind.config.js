module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'netflix-red': '#e50914',
        'netflix-hover' : '#ff5059',
        'gray-clear': "rgba(180, 180, 180, .2)",
        'gray-clear2': "rgba(0, 0, 0, .5)",
        'gray-clear3': "rgba(0, 0, 0, .8)",
        'gray-light' : "rgba(121, 121, 121, 0.5)",
        'gray-lighter' : "rgba(200, 200, 200, 0.5)",
        'white-clear' : "rgba(255, 255, 255, 0.8)",
        'gray-dark' : "rgb(22, 22, 22)"

      },
      screens :{
        'xs' : "450px",
        "md2" : "950px"
      },
      zIndex: {
        '100': '100',
      }
    },
  },
  plugins: [],
}


