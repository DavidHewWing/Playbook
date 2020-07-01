import React, { useState } from 'react';
import { Modal, Input } from 'antd';
import PropTypes from 'prop-types';

const AddPlayModal = (props) => {
  const { visible, toggle, addPlay } = props;
  const [playName, setPlayName] = useState('');

  const handleChange = (e) => {
    setPlayName(e.target.value);
  };

  const handleOk = () => {
    addPlay(playName);
    toggle();
  };

  const handleCancel = () => {
    toggle();
  };

  return (
    <Modal
      title="Add a play"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Input id="add-play" placeholder="Play name" onChange={handleChange} onPressEnter={handleOk} />
    </Modal>
  );
};

AddPlayModal.defaultProps = {
  toggle: () => {},
  addPlay: () => {},
  visible: true,
};

AddPlayModal.propTypes = {
  toggle: PropTypes.func,
  addPlay: PropTypes.func,
  visible: PropTypes.bool,
};

export default AddPlayModal;
