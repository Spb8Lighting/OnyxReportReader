export const escape = es => es.replace(/[&<>'"]/g, m => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;'
})[m])

export const unescape = un => un.replace(/&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g, m => ({
  '&amp;': '&',
  '&#38;': '&',
  '&lt;': '<',
  '&#60;': '<',
  '&gt;': '>',
  '&#62;': '>',
  '&apos;': "'",
  '&#39;': "'",
  '&quot;': '"',
  '&#34;': '"'
})[m])
