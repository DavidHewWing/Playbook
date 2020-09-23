import React, { useState, useEffect } from 'react';
import './styles.scss';

import useDimensions from '../../../hooks/window-utils/DimensionsHook';

const Whiteboard = () => {
  const [ref, { height, width }] = useDimensions(true);
  const [grid, updateGrid] = useState([]);

  const numRows = 15;
  const numCols = 25;

  const generateCells = () => {
    const cellWidth = width / numCols;
    const divs = [];
    for (let i = 0; i < numCols; i += 1) {
      const div = (
        <div style={{ width: cellWidth }}>
          {i}
        </div>
      );
      divs.push(div);
    }
    return divs;
  };

  const generateGrid = () => {
    const tempGrid = [];
    const cellHeight = height / numRows;
    for (let i = 0; i < numRows; i += 1) {
      const div = (
        <div style={{ height: cellHeight, display: 'flex' }}>
          {generateCells()}
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
