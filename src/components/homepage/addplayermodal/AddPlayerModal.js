import React, { useState } from 'react';
import { Modal, Button, Switch} from 'antd';

const AddPlayerModal = (props) => {
  const { visible, toggle, addPlayer } = props;
  const [player, updatePlayer] = useState('');
  const [hasDisc, updateDisc] = useState(false);

  const handleButton = (playerType) => {
    if (playerType === 'opponent' || playerType === 'none') updateDisc(false);
    updatePlayer(playerType);
  }

  const handleOk = () => {
    addPlayer({
      type: player,
      hasDisc: hasDisc
    })
    toggle();
  };

  /**
   * When you click cancel / X
   */
  const handleCancel = () => {
    toggle();
  };

  const onSwitch = () => {
    updateDisc(!hasDisc);
  }

  return (
    <Modal
      title="Add Player"
      centered
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <h3>Position</h3>
      <Button style={{'marginRight': 8}} onClick={(e) => handleButton('cutter')}>Cutter</Button>
      <Button style={{'marginRight': 8}} onClick={(e) => handleButton('handler')}>Handler</Button>
      <Button style={{'marginRight': 8}} onClick={(e) => handleButton('opponent')}>Opponent</Button>
      <Button style={{'marginRight': 8}} onClick={(e) => handleButton('none')}>Remove</Button>
      { (player === 'handler' || player === 'cutter') ? <Switch onChange={(e) => onSwitch()} checkedChildren="Disc" unCheckedChildren="No Disc"></Switch> : ''}
    </Modal>
  )
}

export default AddPlayerModal;