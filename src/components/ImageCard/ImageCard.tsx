import React from 'react';
import css from './ImageCard.module.css';

interface ImageCardProps {
  smallUrl: string;
  bigUrl: string;
  description: string;
  onImageClick: ({
    bigUrl,
    description,
  }: {
    bigUrl: string;
    description: string;
  }) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  smallUrl,
  bigUrl,
  description,
  onImageClick,
}) => {
  return (
    <div className={css.card}>
      <img
        className={css.img}
        src={smallUrl}
        alt={description}
        onClick={() => onImageClick({ bigUrl, description })}
      />
    </div>
  );
};

export default ImageCard;
