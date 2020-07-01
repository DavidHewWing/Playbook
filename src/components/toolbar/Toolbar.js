import { Menu } from 'antd';
import {
  HomeOutlined, SettingOutlined, ContactsOutlined, MediumOutlined, LinkedinOutlined, GithubOutlined,
} from '@ant-design/icons';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';
import React, { useState } from 'react';
import HomePage from '../homepage/HomePage';
import './styles.scss';

const { SubMenu } = Menu;

const Toolbar = () => {
  const [current, setCurrent] = useState('home');

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Router>
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
          <Link to="/">
            Home
          </Link>
        </Menu.Item>
      </Menu>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
};

export default Toolbar;
