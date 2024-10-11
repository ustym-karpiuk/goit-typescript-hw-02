import React from 'react';
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

export interface ImageItem {
  id: string;
  urls: {
    regular: string;
    full: string;
  };
  description: string;
}

interface ImageGalleryProps {
  images: ImageItem[];
  onImageClick: ({
    bigUrl,
    description,
  }: {
    bigUrl: string;
    description: string;
  }) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImageClick,
}) => {
  return (
    <ul className={css.gallery}>
      {images.map(({ id, urls: { full, regular }, description }) => (
        <li key={id}>
          <ImageCard
            smallUrl={regular}
            bigUrl={full}
            description={description}
            onImageClick={onImageClick}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
