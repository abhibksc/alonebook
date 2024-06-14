module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  // darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: '#E65763', 
        secondary: '#080808', 
        // Add more custom colors as needed
      },
      fontFamily: {
        customFont: ['"Alex Brush"', "cursive" ],
        customMyFont: ['Poppins'],
        // Add more custom font families as needed
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
      animation: {
        blink: 'blink 1s step-start infinite',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      // Function to generate Arimo font utility classes
      function generateArimoFont(weight, uniquifier) {
        return {
          [`.arimo-${uniquifier}`]: {
            fontFamily: `"Arimo", sans-serif`,
            fontOpticalSizing: 'auto',
            fontWeight: weight,
            fontStyle: 'normal',
          },
        };
      }
      
      // Generate Arimo font utility classes for various weights
      const arimoFontUtilities = {};
      const weights = [400, 500, 600, 700]; // Adjust weights as needed
      const uniquifiers = ['regular', 'medium', 'semibold', 'bold']; // Adjust uniquifiers as needed
      weights.forEach(weight => {
        uniquifiers.forEach(uniquifier => {
          Object.assign(arimoFontUtilities, generateArimoFont(weight, uniquifier));
        });
      });

      // Add Arimo font utility classes to Tailwind CSS
      addUtilities(arimoFontUtilities, ['responsive']);

      // Utility to hide scrollbar
      addUtilities({
        '.scrollbar-none': {
          '::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',  /* IE and Edge */
          'scrollbar-width': 'none',  /* Firefox */
        },
      }, ['responsive']);
    },
  ],
};
