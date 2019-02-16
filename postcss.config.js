module.exports = {
  plugins: [
    require('autoprefixer')({
      'browsers': [
        '> 1%',
        'last 2 versions',
        'IE >= 10', 'Edge >= 16',
        'Chrome >= 60',
        'Firefox >= 50', 'Firefox ESR',
        'Safari >= 10',
        'ios_saf >= 10',
        'Android >= 5'
      ]
    })
  ]
}
