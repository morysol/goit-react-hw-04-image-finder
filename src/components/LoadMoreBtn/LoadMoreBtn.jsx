import PropTypes from 'prop-types'; // ES6

import { Button } from './LoadMoreBtn.styled';

// class LoadMoreBtn extends Component {
//   render() {
//     const { onButton, type } = this.props;
//     return (
//       <Button onClick={onButton} type={type}>
//         Load more...
//       </Button>
//     );
//   }
// }

// export default LoadMoreBtn;

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
