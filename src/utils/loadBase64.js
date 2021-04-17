const loadBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.addEventListener('load', () => resolve(reader.result))
    reader.addEventListener('error', reject)
  })
}

export default loadBase64
