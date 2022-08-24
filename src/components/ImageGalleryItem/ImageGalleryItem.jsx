// import { Component } from 'react';
import PropTypes from 'prop-types'; // ES6

import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = props => {
  // const { gallery, onImageClick } = props;
  const { item, onImageClick } = props;

  return (
    <Item
      onClick={() => {
        onImageClick(item.id);
      }}
    >
      <Image src={item.webformatURL} alt={item.tags} />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
};
