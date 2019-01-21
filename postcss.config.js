module.exports = {
  plugins: [
    require('autoprefixer')({
      'browsers': [
        'last 3 version',
        '> 1%',
        'IE 10'
      ]
    })
  ]
}
