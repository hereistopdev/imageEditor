import React, { useContext } from "react";
import axios from "axios";
import { ImageContext } from "../context/ImageContext";

const ImageUploader: React.FC = () => {
  const { setImage, setPreviewUrl } = useContext(ImageContext)!;

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          "http://localhost:5000/api/images/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response);

        // Set the preview URL from the backend response
        setPreviewUrl(response.data.previewUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <input
      type="file"
      accept="image/png, image/jpeg"
      onChange={handleFileChange}
    />
  );
};

export default ImageUploader;
