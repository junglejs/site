module.exports = {
  purge: [],
  theme: {
    extend: {
      colors: {
        primary: "rgb(70,170,86)",
      },
      fontSize: {
        '5xl': '3.3rem',
      },
    },
  },
  variants: {},
  plugins: [
    /*function({ addBase, config }) {
      addBase({
        body: {
          color: config("theme.colors.black"),
          backgroundColor: config("theme.colors.white")
        },
        "@screen dark": {
          body: {
            color: config("theme.colors.white"),
            backgroundColor: config("theme.colors.black")
          }
        }
      });
    }*/
  ],
}
