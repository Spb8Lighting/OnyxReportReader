const GetSVG = async SVG => {
  let response = await window.fetch(`./img/${SVG}`)
  return response.text()
}

export const MPlay = {
  SVG: async () => GetSVG('M-Play.svg')
}
export const MTouch = {
  SVG: async () => GetSVG('M-Touch.svg')
}
export const M1HD = {
  SVG: async () => GetSVG('M1.svg')
}
