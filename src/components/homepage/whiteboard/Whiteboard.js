import React, { useState, useEffect } from 'react';
import useModal from '../../../hooks/homepage/UseModalHook';
import AddPlayerModal from '../addplayermodal/AddPlayerModal';
import './styles.scss';

import useDimensions from '../../../hooks/window-utils/DimensionsHook';

const Whiteboard = () => {
  const [ref, { height, width }] = useDimensions(true);
  const [grid, updateGrid] = useState([]);
  const [cells, updateCells] = useState([[]]);
  const [currCell, updateCurrCell] = useState({});
  const [addPlayerModalOpen, toggleAddPlayerModal] = useModal();

  const numRows = 15;
  const numCols = 20;


  useEffect(() => {
    if (!height && !width) setUpCells();
    console.log('cells', cells);
    generateGrid();
  }, [cells, height, width]);

  const setUpCells = () => {
    let tempCells = [];
    for (let i = 0; i < numRows; i++) {
      tempCells[i] = [];
      for (let j = 0; j < numCols; j++) {
        tempCells[i][j] = {
          type: 'none'
        }
      }
    }
    updateCells(tempCells);
  }

  const addPlayer = (player) => {
    cells[currCell.row][currCell.col].type = player;
    updateCells([...cells]);
  }

  const handleCellClick = (row, col) => {
    updateCurrCell({
      row,
      col,
    })
    toggleAddPlayerModal();
  }

  const renderCellType = (row, col) => {
    const { type } = cells[row][col];
    if (type === 'player') {
      return <p> player </p>;
    } else if (type === 'opponent') {
      return <p> opponent </p>;
    } else if (type === 'player with disc') {
      return <p> player w/ disc </p>;
    } else {
      return;
    }
  }

  const generateCells = (row) => {
    if (!width || !height) return;
    const cellWidth = width / numCols;
    const divs = [];
    for (let i = 0; i < numCols; i += 1) {
      const fourth = (i == 2);
      const backFour = (i == 17);
      let div = null;
      if (fourth) {
        div = (
          <div key={[row, i]} style={{width: cellWidth, borderRight: '2px solid black', borderBottom: '1px solid rgb(211,211,211)'}} onClick={() => handleCellClick(row, i)}>
            {renderCellType(row, i)}
          </div>
        )
      } else if (backFour) {
        div = (
          <div key={[row, i]} style={{width: cellWidth, borderLeft: '2px solid black', borderBottom: '1px solid rgb(211,211,211)', borderRight: '1px solid rgb(211,211,211)'}} onClick={() => handleCellClick(row, i)}>
            {renderCellType(row, i)}
          </div>
        )
      } else {
        div = (
          <div key={[row, i]} style={{width: cellWidth, borderBottom: '1px solid rgb(211,211,211)', borderRight: '1px solid rgb(211,211,211)'}} onClick={() => handleCellClick(row, i)}>
            {renderCellType(row, i)}
          </div>
        )
      }
      divs.push(div);
    }
    return divs;
  };

  const generateGrid = () => {
    if (!width || !height) return;
    const tempGrid = [];
    const cellHeight = height / numRows;
    for (let i = 0; i < numRows; i += 1) {
      const div = (
        <div key={i}style={{ height: cellHeight, display: 'flex' }}>
          {generateCells(i)}
        </div>
      );
      tempGrid.push(div);
    }
    updateGrid(tempGrid);
  };

  return (
    <div ref={ref} className="whiteboard-container">
      <AddPlayerModal visible={addPlayerModalOpen} toggle={toggleAddPlayerModal} addPlayer={addPlayer}/>
      {grid}
    </div>
  );
};

export default Whiteboard;
