import React from "react";
import { ImageProvider } from "./context/ImageContext";
import ImageUploader from "./components/ImageUploader";
import ImageEditor from "./components/ImageEditor";
import Preview from "./components/Preview";

const App: React.FC = () => {
  return (
    <ImageProvider>
      <div>
        <h1>Image Processing App</h1>
        <ImageUploader />
        <ImageEditor />
        <Preview />
      </div>
    </ImageProvider>
  );
};

export default App;
