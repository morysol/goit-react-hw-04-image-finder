import PropTypes from 'prop-types'; // ES6
//
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = props => {
  const { imageGallery, onImageClick } = props;
  return (
    <Gallery>
      {imageGallery.map(item => {
        return (
          <ImageGalleryItem
            key={item.id}
            item={item}
            onImageClick={onImageClick}
          />
        );
      })}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  imageGallery: PropTypes.array.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
