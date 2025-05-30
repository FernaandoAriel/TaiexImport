import React, { useState } from 'react';

export default function VehicleGallery({ images, name }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="vehicle-images">
      <div className="main-image">
        <img src={selectedImage} alt={name} />
      </div>
      <div className="thumbnail-gallery">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${name} vista ${index + 1}`}
            onClick={() => setSelectedImage(img)}
            className={selectedImage === img ? 'active' : ''}
          />
        ))}
      </div>
    </div>
  );
}