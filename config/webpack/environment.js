const { environment } = require('@rails/webpacker');
const path = require('path');
const { resolve } = require('path');
const tailwindConfig = path.resolve(__dirname, '..', '..', 'tailwind.config.js');
const tailwindcss = require('tailwindcss')(tailwindConfig);



// Add the following lines
const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      ident: 'postcss',
      plugins: [require('tailwindcss')(tailwindConfig), require('autoprefixer')],
    },
  },
};

// Find and update the CSS loader rule
const CSSLoader = environment.loaders.get('css');
if (CSSLoader) {
  const postcssLoaderIndex = CSSLoader.use.findIndex(
    (item) => item.loader && item.loader.includes('postcss-loader'),
  );
  if (postcssLoaderIndex !== -1) {
    CSSLoader.use[postcssLoaderIndex] = postcssLoader;
  }
}

// Find and update the SCSS loader rule
const SCSSLoader = environment.loaders.get('sass');
if (SCSSLoader) {
  const postcssLoaderIndex = SCSSLoader.use.findIndex(
    (item) => item.loader && item.loader.includes('postcss-loader'),
  );
  if (postcssLoaderIndex !== -1) {
    SCSSLoader.use[postcssLoaderIndex] = postcssLoader;
  }
}

module.exports = environment;
