import React, { createContext, useState, ReactNode } from "react";

interface ImageContextType {
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
  previewUrl: string | null;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

export const ImageContext = createContext<ImageContextType | undefined>(
  undefined
);

export const ImageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  return (
    <ImageContext.Provider
      value={{ image, setImage, previewUrl, setPreviewUrl }}
    >
      {children}
    </ImageContext.Provider>
  );
};
