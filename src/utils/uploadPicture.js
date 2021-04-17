import { getData } from 'exif-js'
import exifOrient from 'exif-orient'
import loadBase64 from './loadBase64'

const uploadPicture = async ({ target }) => {
  const {
    files: [file],
    files,
  } = target

  try {
    const base64ImageStr = await loadBase64(file)
    const onlyBase64String = base64ImageStr.replace(/(.*)base64,/, '')
    console.log('file', files)

    return new Promise((resolve, reject) => {
      getData(file, function () {
        const { exifdata, exifdata: { Orientation } = {} } = this
        if (!exifdata || !Orientation) {
          return resolve([onlyBase64String, `no exif present - ${Orientation}`])
        }

        exifOrient(base64ImageStr, Orientation, (err, canvas) => {
          if (err) {
            return reject(err)
          }

          // const newCanvas = canvas
          //   .toDataURL('image/jpeg', 100)
          //   .replace(/(.*)base64,/, '')
          // return resolve([
          //   newCanvas,
          //   `reading exif - ${JSON.stringify(exifdata)}`,
          // ])
          return resolve([
            onlyBase64String,
            `reading exif - ${JSON.stringify(exifdata)}`,
          ])
        })
      })
    })
  } catch (error) {
    console.log('error')
  }
}

export default uploadPicture
