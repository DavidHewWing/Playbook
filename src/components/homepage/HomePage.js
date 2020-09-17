import React from 'react';
import SideMenu from './sidemenu/SideMenu';
import Whiteboard from './whiteboard/Whiteboard';
import './styles.scss';

const HomePage = () => (
  <div className="container">
    <SideMenu />
    <Whiteboard />
  </div>
);

export default HomePage;
