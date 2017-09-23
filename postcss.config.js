module.exports = {
  plugins: [
    require('postcss-cssnext')({
      warnForDuplicates: false
    }),
    require('postcss-modules')({
      generateScopedName: '[local]-[hash:base64:5]'
    }),
    require('cssnano')()
  ]
}