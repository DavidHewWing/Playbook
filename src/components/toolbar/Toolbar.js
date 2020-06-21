import { Menu } from 'antd';
import {
  HomeOutlined, SettingOutlined, ContactsOutlined, MediumOutlined, LinkedinOutlined, GithubOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import './styles.scss';

const { SubMenu } = Menu;

const Toolbar = () => {
  const [current, setCurrent] = useState('home');

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <SubMenu style={{ float: 'right' }} icon={<ContactsOutlined />} title="About Me">
        <Menu.Item key="linkedin" icon={<LinkedinOutlined />}>LinkedIn</Menu.Item>
        <Menu.Item key="github" icon={<GithubOutlined />}>Github</Menu.Item>
        <Menu.Item key="medium" icon={<MediumOutlined />}>Medium</Menu.Item>
      </SubMenu>
      <Menu.Item style={{ float: 'right' }} key="settings" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Item key="home" icon={<HomeOutlined />}>
        Home
      </Menu.Item>
    </Menu>
  );
};

export default Toolbar;
