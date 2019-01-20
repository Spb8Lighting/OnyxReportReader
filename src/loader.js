const $Loader = document.getElementById('loader')

module.exports = {
  Show: () => $Loader.classList.add('show'),
  Hide: () => $Loader.classList.remove('show')
}
