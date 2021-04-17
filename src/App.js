import React, { useState } from 'react'
import './App.css'

import uploadFile from './utils/uploadPicture'

function App() {
  const [image, setImage] = useState(null)
  const [message, setMessage] = useState('')

  const handleImageChange = async (event) => {
    const [imageBase64 = '', resultMessage = ''] = await uploadFile(event)
    setImage(`data:image/jpeg;base64,${imageBase64}`)
    setMessage(resultMessage)
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Exif-Test Photo</h1>
      </div>
      <div className="uploadInput">
        <input
          type="file"
          name="imageUp"
          id="imageUp"
          onChange={handleImageChange}
        />
      </div>
      <p className="debug">{message}</p>
      <div className="imageContainer">
        {image && <img alt="" src={image} />}
      </div>
    </div>
  )
}

export default App
