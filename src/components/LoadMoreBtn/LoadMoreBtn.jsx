import PropTypes from 'prop-types'; // ES6

import { Button } from './LoadMoreBtn.styled';

export const LoadMoreBtn = props => {
  const { onButton, type } = props;
  return (
    <Button onClick={onButton} type={type}>
      Load more...
    </Button>
  );
};

LoadMoreBtn.propTypes = {
  type: PropTypes.string.isRequired,
  onButton: PropTypes.func.isRequired,
};
