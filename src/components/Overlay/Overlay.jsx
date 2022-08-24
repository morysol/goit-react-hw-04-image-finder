import React from 'react';
import PropTypes from 'prop-types'; // ES6
import { Overlay, Modal } from './Overlay.styled';

import PortalReactDOM from 'react-dom';

// class BigPicture extends Component {
//   render() {
//     const { link, tags, closeOverlay } = this.props;
//     return (
//       <Overlay onClick={closeOverlay}>
//         <Modal>
//           <img src={link} alt={tags} />
//         </Modal>
//       </Overlay>
//     );
//   }
// }

// export default BigPicture;

export const BigPicture = props => {
  const { link, closeOverlay } = props;
  return PortalReactDOM.createPortal(
    <React.StrictMode>
      <Overlay onClick={closeOverlay}>
        <Modal>
          <img src={link} alt="large" />
        </Modal>
      </Overlay>
    </React.StrictMode>,
    document.getElementById('portal-root')
  );
};
BigPicture.propTypes = {
  link: PropTypes.string.isRequired,
  closeOverlay: PropTypes.func.isRequired,
};
