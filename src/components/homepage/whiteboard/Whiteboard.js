import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import './styles.scss';

import useDimensions from '../../../hooks/window-utils/DimensionsHook';

const Whiteboard = () => {
  const [ref, { height, width }] = useDimensions(true);
  const [grid, updateGrid] = useState([]);
  const [cells, updateCells] = useState([]);

  const numRows = 15;
  const numCols = 20;

  const setUpCells = () => {
    let grid = [];
    for (let i = 0; i < numRows; i++) {
      grid[i] = [];
      for (let j = 0; j < numCols; j++) {
        grid[i][j] = {
          type: 'empty'
        }
      }
    }
    updateCells(grid);
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
          <div key={[row, i]} style={{width: cellWidth, borderRight: '2px solid black', borderBottom: '1px solid rgb(211,211,211)'}}>

          </div>
        )
      } else if (backFour) {
        div = (
          <div key={[row, i]} style={{width: cellWidth, borderLeft: '2px solid black', borderBottom: '1px solid rgb(211,211,211)', borderRight: '1px solid rgb(211,211,211)'}}>
          </div>
        )
      } else {
        div = (
          <div key={[row, i]} style={{width: cellWidth, borderBottom: '1px solid rgb(211,211,211)', borderRight: '1px solid rgb(211,211,211)'}}>
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

  useEffect(() => {
    generateGrid();
  }, [height, width]);

  return (
    <div ref={ref} className="whiteboard-container">
      {grid}
    </div>
  );
};

export default Whiteboard;
