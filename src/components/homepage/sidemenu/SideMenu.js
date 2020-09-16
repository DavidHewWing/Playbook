import React, { useState } from 'react';
import { Menu, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './styles.scss';
import AddPlayModal from '../addplaymodal/AddPlayModal';
import DeletePlayModal from '../deleteplaymodal/DeletePlayModal';
import useModal from '../../../hooks/homepage/UseModalHook';

const { SubMenu } = Menu;

const SideMenu = () => {
  const [plays, updatePlays] = useState([{ name: 'Split and Send' }]);
  const [currentPlayName, setCurrentPlayName] = useState('');
  const [currentKey, setCurrentKey] = useState('');
  const [addPlayModalOpen, toggleAddPlay] = useModal();
  const [deletePlayModalOpen, toggleDeletePlay] = useModal();

  /**
   * This method adds a play to the sidemenu.
   * @param {string} playName - Name of the play you would like to add.
   */
  const addPlay = (playName) => {
    const names = plays.map((play) => play.name);
    if (names.includes(playName)) {
      message.error(`"${playName}" already exists.`);
    } else if (playName.includes('_')) {
      message.error('You cannot have an underscore in a play name.');
    } else {
      updatePlays([...plays, { name: playName }]);
    }
  };

  /**
   * Removes the play from the side menu.
   * @param {string} playName - Name of the play you want to delete.
   */
  const deletePlay = (playName) => {
    const nameToDelete = playName.replace(/_/g, ' ');
    const playsRemoved = plays.filter((el) => el.name !== nameToDelete);
    updatePlays(playsRemoved);
    message.success(`"${nameToDelete}" has been removed.`);
  };

  /**
   * Handles click from clicking a side-menu item.
   * @param {Event} e - incoming information from click event.
   */
  const handleClick = (e) => {
    const { key } = e;
    if (key === 'add-play') {
      toggleAddPlay();
    } else if (key.includes('delete')) {
      toggleDeletePlay();
    } else {
      setCurrentKey(key);
    }
  };

  /**
   * Handles click from clicking the title.
   * @param {Event} e - incoming event information from the click
   */
  const handleTitleClick = (e) => {
    setCurrentPlayName(e.key);
    setCurrentKey(`${e.key}_edit`);
  };

  return (
    <div>
      <Menu
        onClick={handleClick}
        className="menu"
        mode="inline"
        selectedKeys={[currentKey]}
        openKeys={[currentPlayName]}
      >
        {
          plays.map((val) => {
            const { name } = val;
            const keyName = name.replace(/\s+/g, '_');
            const editKey = `${keyName}_edit`;
            const deleteKey = `${keyName}_delete`;
            return (
              <SubMenu
                key={keyName}
                title={<span>{name}</span>}
                onTitleClick={handleTitleClick}
              >
                <Menu.Item key={editKey}>
                  Edit
                </Menu.Item>
                <Menu.Item key={deleteKey}>
                  Delete
                </Menu.Item>
              </SubMenu>
            );
          })
        }
        <Menu.Item icon={<PlusOutlined />} key="add-play">
          Add a play.
        </Menu.Item>
      </Menu>
      <AddPlayModal visible={addPlayModalOpen} toggle={toggleAddPlay} addPlay={addPlay} />
      <DeletePlayModal
        visible={deletePlayModalOpen}
        toggle={toggleDeletePlay}
        currentPlayName={currentPlayName}
        deletePlay={deletePlay}
      />
    </div>
  );
};

export default SideMenu;
