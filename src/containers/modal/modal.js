import Modal from 'components/modal';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Consumer,
} from 'store/createContext';

const ModalContainer = ({children}) => <Consumer>
  {({open, showModal, hideModal}) => <Modal hideModal={hideModal} open={open} showModal={showModal}>
    {children}
  </Modal>}
</Consumer>;
ModalContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalContainer;
