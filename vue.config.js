const path = require('path');
const fs = require('fs');

// Generate pages object
const pages = {};

function getEntryFile(entryPath) {
  const files = fs.readdirSync(entryPath);
  return files;
}

const chromeName = getEntryFile(path.resolve('src/entry'));

function getFileExtension(filename) {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined;
}

chromeName.forEach((name) => {
  const fileExtension = getFileExtension(name);
  const fileName = name.replace('.' + fileExtension, '');
  pages[fileName] = {
    entry: `src/entry/${name}`,
    template: 'public/index.html',
    filename: `${fileName}.html`
  };
});

const isDevMode = process.env.NODE_ENV === 'development';

module.exports = {
  pages,
  runtimeCompiler: true,
  filenameHashing: false,
  chainWebpack: (config) => {
    config.plugin('copy').use(require('copy-webpack-plugin'), [
      {
        patterns: [
          {
            from: path.resolve(`src/manifest.${process.env.NODE_ENV}.json`),
            to: `${path.resolve('dist')}/manifest.json`
          },
          {
            from: path.resolve('public/'),
            to: `${path.resolve('dist')}/`
          },
          {
            from: path.resolve('icons/'),
            to: `${path.resolve('dist')}/`
          }
        ]
      }
    ]);
  },
  configureWebpack: {
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js'
    },
    devtool: isDevMode ? 'inline-source-map' : false
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/styles/global.scss";'
      }
    }
  }
};
