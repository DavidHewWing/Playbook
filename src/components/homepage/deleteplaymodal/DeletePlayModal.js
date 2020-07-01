import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

const DeletePlayModal = (props) => {
  const {
    currentPlayName, toggle, visible, deletePlay,
  } = props;
  const name = currentPlayName.split('_').join(' ');

  const handleOk = () => {
    deletePlay(currentPlayName);
    toggle();
  };

  const handleCancel = () => {
    toggle();
  };

  return (
    <Modal
      title="Delete this play?"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>{`Are you sure you want to delete ${name}?`}</p>
    </Modal>
  );
};

DeletePlayModal.defaultProps = {
  toggle: () => {},
  deletePlay: () => {},
  visible: false,
  currentPlayName: '',
};

DeletePlayModal.propTypes = {
  toggle: PropTypes.func,
  deletePlay: PropTypes.func,
  visible: PropTypes.bool,
  currentPlayName: PropTypes.string,
};

export default DeletePlayModal;
