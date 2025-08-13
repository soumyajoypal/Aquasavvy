import React, { useState, useRef, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const ImageCropper = ({ image, onCrop }) => {
  const cropperRef = useRef(null);

  useEffect(() => {
    if (cropperRef.current) {
      cropperRef.current.cropper.setCropBoxData({
        left: 0,
        top: 0,
        width: cropperRef.current.cropper.getImageData().naturalWidth,
        height: cropperRef.current.cropper.getImageData().naturalHeight,
      });
    }
  }, [image]);

  const handleCrop = () => {
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
      if (croppedCanvas) {
        croppedCanvas.toBlob((blob) => {
          const croppedFile = new File([blob], "cropped.jpg", {
            type: "image/jpeg",
          });
          onCrop(croppedFile);
        });
      }
    }
  };

  return (
    <div className="flex">
      <div className="w-1/2">
        <Cropper
          src={image}
          style={{ height: "100%", width: "100%" }}
          aspectRatio={1}
          guides={false}
          ref={cropperRef}
          viewMode={1}
          autoCropArea={1}
        />
      </div>
      <div className="w-1/2 p-4">
        <button
          onClick={handleCrop}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Crop Image
        </button>
      </div>
    </div>
  );
};

export default ImageCropper;
