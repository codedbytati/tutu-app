export const fileToDataUrl = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('Arquivo inválido'))
      }
    }

    reader.onerror = () => {
      reject(new Error('Não foi possível ler o anexo'))
    }

    reader.readAsDataURL(file)
  })
}