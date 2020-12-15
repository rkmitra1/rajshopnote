module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // secondary: '#2B6CB0',

        // colorList for documentation (colorschemedesigner)
        colorlist: {
          one: '#043A6B',
          two: '#163550',
          three: '#012546',
          four: '#3277B5',
          five: '#5588B5',
        },

        // secondary tetrad
        // #0D0973	1D1B57	06034B	3E39B9	5F5BB9

        // primary: {
        //   DEFAULT: '#0c5da5',
        //   100: '#cedfed',
        //   200: '#9ebedb',
        //   300: '#6d9ec9',
        //   400: '#3d7db7',
        //   500: '#0c5da5',
        //   600: '#0a4a84',
        //   700: '#073863',
        //   800: '#052542',
        //   900: '#021321',
        // },

        // color one
        primary: {
          DEFAULT: '#043A6B',
          50: '#F2F5F8',
          100: '#E6EBF0',
          200: '#C0CEDA',
          300: '#9BB0C4',
          400: '#4F7597',
          500: '#043A6B',
          600: '#043460',
          700: '#022340',
          800: '#021A30',
          900: '#011120',
        },

        // secondary: {
        //   DEFAULT: '#408dd2',
        //   100: '#d9e8f6',
        //   200: '#b3d1ed',
        //   300: '#8cbbe4',
        //   400: '#66a4db',
        //   500: '#408dd2',
        //   600: '#3371a8',
        //   700: '#26557e',
        //   800: '#1a3854',
        //   900: '#0d1c2a',
        // },

        //color five
        secondary: {
          DEFAULT: '#5588B5',
          50: '#F7F9FB',
          100: '#EEF3F8',
          200: '#D5E1ED',
          300: '#BBCFE1',
          400: '#88ACCB',
          500: '#5588B5',
          600: '#4D7AA3',
          700: '#33526D',
          800: '#263D51',
          900: '#1A2936',
        },

        tertiary: {
          DEFAULT: '#163550',
          50: '#F3F5F6',
          100: '#E8EBEE',
          200: '#C5CDD3',
          300: '#A2AEB9',
          400: '#5C7285',
          500: '#163550',
          600: '#143048',
          700: '#0D2030',
          800: '#0A1824',
          900: '#071018',
        },

        // from secondary tetrad one
        'button-primary': {
          DEFAULT: '#0D0973',
          50: '#F3F3F8',
          100: '#E7E6F1',
          200: '#C3C2DC',
          300: '#9E9DC7',
          400: '#56539D',
          500: '#0D0973',
          600: '#0C0868',
          700: '#080545',
          800: '#060434',
          900: '#040323',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
