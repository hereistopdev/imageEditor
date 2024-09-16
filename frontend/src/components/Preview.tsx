import React, { useContext } from "react";
import { ImageContext } from "../context/ImageContext";

const Preview: React.FC = () => {
  const { previewUrl } = useContext(ImageContext)!;

  return (
    <div>
      {previewUrl ? (
        <img src={previewUrl} alt="Preview" width={"70%"} />
      ) : (
        <p>No image uploaded</p>
      )}
    </div>
  );
};

export default Preview;
