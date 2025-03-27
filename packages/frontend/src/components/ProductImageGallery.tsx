import React from 'react';
import { useState } from 'react';

export const ProductImageGallery = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(product.main_img_url);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center lg:items-start">
      {/* Main Image Container (Fixed Size, 4:3 Ratio) */}
      <div
        className="w-100 h-75 lg:w-full flex items-center justify-center rounded-lg cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src={import.meta.env.VITE_BASE_IMG_URL + selectedImage}
          alt={product.name}
          className="max-w-full max-h-full object-contain rounded-xl"
        />
      </div>

      {/* Thumbnails */}
      <div className="mt-4 flex gap-2 overflow-x-auto">
        {[product.main_img_url, ...product.img_urls].map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className="w-20 h-15 border-2 border-transparent hover:border-primary rounded-lg overflow-hidden"
          >
            <img
              src={import.meta.env.VITE_BASE_IMG_URL + img}
              alt={`Thumbnail ${index}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Modal for Enlarged Image (Fixed Size) */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="max-w-4xl w-full p-4 relative flex items-center justify-center">
            <button className="absolute top-2 right-2 text-white text-3xl" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
            <div className="w-[60vw] h-[45vw] max-w-[800px] max-h-[600px] flex items-center justify-center rounded-lg">
              <img
                src={import.meta.env.VITE_BASE_IMG_URL + selectedImage}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
