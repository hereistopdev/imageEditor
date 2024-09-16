import React, { useContext, useState } from "react";
import axios from "axios";
import { ImageContext } from "../context/ImageContext";

const ImageEditor: React.FC = () => {
  const { previewUrl, setPreviewUrl } = useContext(ImageContext)!;
  const [brightness, setBrightness] = useState<number>(1);
  const [contrast, setContrast] = useState<number>(1);
  const [saturation, setSaturation] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);

  const updateImage = async () => {
    try {
      console.log(previewUrl);
      const response = await axios.post(
        "http://localhost:5000/api/images/process",
        {
          path: previewUrl,
          brightness,
          contrast,
          saturation,
          rotation,
        }
      );

      // Set the preview URL from the backend response
      setPreviewUrl(response.data.previewUrl);
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

  return (
    <div>
      <input
        type="range"
        min="0.5"
        max="2"
        step="0.1"
        value={brightness}
        onChange={(e) => setBrightness(parseFloat(e.target.value))}
      />
      <input
        type="range"
        min="0.5"
        max="2"
        step="0.1"
        value={contrast}
        onChange={(e) => setContrast(parseFloat(e.target.value))}
      />
      <input
        type="range"
        min="0.5"
        max="2"
        step="0.1"
        value={saturation}
        onChange={(e) => setSaturation(parseFloat(e.target.value))}
      />
      <input
        type="range"
        min="0"
        max="360"
        value={rotation}
        onChange={(e) => setRotation(parseInt(e.target.value, 10))}
      />
      <button onClick={updateImage}>Update Preview</button>
    </div>
  );
};

export default ImageEditor;
