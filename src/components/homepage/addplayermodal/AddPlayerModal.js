import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const AddPlayerModal = (props) => {
  const { visible, toggle, addPlayer } = props;
  const [player, updatePlayer] = useState('');

  const handleButton = (e) => {
    const playerType = e.target.innerHTML.toLowerCase();
    updatePlayer(playerType);
  }

  const handleOk = () => {
    addPlayer(player)
    toggle();
  };

  /**
   * When you click cancel / X
   */
  const handleCancel = () => {
    toggle();
  };

  return (
    <Modal
      title="Add Player"
      centered
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Button onClick={(e) => handleButton(e)}>Player</Button>
      <Button onClick={(e) => handleButton(e)}>Opponent</Button>
      <Button onClick={(e) => handleButton(e)}>Player with Disc</Button>
    </Modal>
  )
}

export default AddPlayerModal;