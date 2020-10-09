import React, { useState, useEffect } from 'react';
import { Button, message, Radio } from 'antd';
import './styles.scss';

import useModal from '../../../hooks/homepage/UseModalHook';
import AddPlayerModal from '../addplayermodal/AddPlayerModal';
import useDimensions from '../../../hooks/window-utils/DimensionsHook';
import { playPhases } from '../../../mockdata/SplitAndSend/Phase1';

const Whiteboard = () => {
  const [ref, { height, width }] = useDimensions(true); // height, width = size of div
  const [grid, updateGrid] = useState([]); // divs that are on the screen and the elements that fill it.
  const [phases, updatePhases] = useState([]); // this will be pulled in by an API.
  const [currStep, updateCurrStep] = useState(0); // this is for the phase number
  const [currCell, updateCurrCell] = useState({}); // this is for the current cell x, y position in grid
  const [handlerCount, updateHandlerCount] = useState(1); // this is for the identifier of the handler
  const [cutterCount, updateCutterCount] = useState(1); // this is for the identifier of the cutter
  const [addPlayerModalOpen, toggleAddPlayerModal] = useModal(); // this is for the modal

  const numRows = 15;
  const numCols = 20;

  useEffect(() => {
    if (!height && !width) {
      setUpCells2();
    } else {
      generateGrid();
    }
  }, [height, width, phases, currStep, handlerCount, cutterCount]);

  /**
   * For Testing purposes (while we don't have API working, replace this in useEffect to clear all phases)
   */
  const setUpCells = () => {
    let tempCells = [];
    for (let i = 0; i < numRows; i++) {
      tempCells[i] = [];
      for (let j = 0; j < numCols; j++) {
        tempCells[i][j] = {
          type: 'none',
          hasDisc: false
        }
      }
    }
    updatePhases([tempCells]);
  }

  /**
   * Sets up the phases, this code inside here must be replace with an API call later.
   */
  const setUpCells2 = () => {
    updatePhases([...playPhases]);
    renderPhaseButtons();
    console.log('phases', phases);
    console.log('playPhases', playPhases);
  }

  /**
   * Call back from the modal, adds a specific element to the cell.
   * @param {obj} player 
   */
  const addPlayer = (player) => {
    const currPhase = phases[currStep];
    currPhase[currCell.row][currCell.col].type = player.type;
    currPhase[currCell.row][currCell.col].hasDisc = player.hasDisc;
    if (player.type === 'handler') {
      currPhase[currCell.row][currCell.col].count = handlerCount;
      updateHandlerCount(handlerCount + 1);
    } else if (player.type === 'cutter') {
      currPhase[currCell.row][currCell.col].count = cutterCount;
      updateCutterCount(cutterCount + 1);
    }
    updatePhases([...phases]);
    console.log(currStep);
    console.log(phases);
  }

  /**
   * Listener for when we click inside a cell.
   * @param {int} row 
   * @param {int} col 
   */
  const handleCellClick = (row, col) => {
    updateCurrCell({
      row,
      col,
    })
    toggleAddPlayerModal();
  }


  /**
   * Render elements inside the cells according to the value of the cell type.
   * @param {int} row 
   * @param {int} col 
   */
  const renderCellType = (row, col) => {
    const currPhase = phases[currStep];
    const { type, hasDisc, count } = currPhase[row][col];
    const cellHeight = height / numRows;
    const cellWidth = width / numCols;

    let dimension = (cellHeight <= cellWidth) ? cellHeight : cellWidth;
    dimension = dimension - 8;

    if (type === 'handler' && !hasDisc) {
      return <span style={{width: dimension, height: dimension}} className="dot">H{count}</span>;
    } else if (type === 'handler' && hasDisc) {
      return <span style={{width: dimension, height: dimension, backgroundColor: 'lightgray'}} className="dot">H</span>;
    } else if (type === 'cutter' && !hasDisc) {
      return <span style={{width: dimension, height: dimension}} className="dot">C{count}</span>;
    } else if (type === 'cutter' && hasDisc) { 
      return <span style={{width: dimension, height: dimension, backgroundColor: 'lightgray'}} className="dot">C</span>;
    } else if (type === 'opponent') {
      return <span style={{width: dimension, height: dimension, backgroundColor: 'gray'}} className="dot"></span>
    } else if (type === 'disc') {
      return <p> disc </p>;
    } else {
      return 
    }
  }

  const renderPhaseButtons = () => {
    const len = phases.length;
    const buttons = [];
    phases.forEach((phase, index) => {
      const key = `phase-${index + 1}`;
      const button = <Radio.Button key={key} value={key}>{index + 1}</Radio.Button>;
      buttons.push(button);
    })
    return buttons;
  }

  const handlePhaseButtonClick = (e) => {
    const value = e.target.value;
    const arr = value.split('-');
    const phaseNumber = parseInt(arr[1]);
    updateCurrStep(phaseNumber - 1);
  }

  /**
   * Generates the divs for each cell.
   * @param {int} row 
   */
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
          <div key={[row, i]} 
            style={{width: cellWidth, borderRight: '2px solid black', borderBottom: '1px solid rgb(211,211,211)', position: 'relative'}}
            onClick={() => handleCellClick(row, i)}
          >
            {renderCellType(row, i)}
          </div>
        )
      } else if (backFour) {
        div = (
          <div key={[row, i]}
            style={{width: cellWidth, borderLeft: '2px solid black', borderBottom: '1px solid rgb(211,211,211)', borderRight: '1px solid rgb(211,211,211)', position: 'relative'}}
            onClick={() => handleCellClick(row, i)}
          >
            {renderCellType(row, i)}
          </div>
        )
      } else {
        div = (
          <div key={[row, i]}
            style={{width: cellWidth, borderBottom: '1px solid rgb(211,211,211)', borderRight: '1px solid rgb(211,211,211)', position: 'relative'}}
            onClick={() => handleCellClick(row, i)}
          >
            {renderCellType(row, i)}
          </div>
        )
      }
      divs.push(div);
    }
    return divs;
  };

  /**
   * Generates the entire grid.
   */
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

  /**
   * Increase or decreases value of the steps.
   * @param {int} change 
   */
  const handleStepChange = (change) => {
    const num = currStep + change;
    console.log('num', num);
    if (num < 0) {
      message.error('This is the first phase in the play.');
      return;
    }
    if (num > phases.length - 1) {
      message.error('This is the last phase in the play');
      return;
    }

    updateCurrStep(num);
  }

  return (
    <div ref={ref} className="whiteboard-container">
      {grid}
      <AddPlayerModal visible={addPlayerModalOpen} toggle={toggleAddPlayerModal} addPlayer={addPlayer} />
      <div className="button-group">
        <Button onClick={() => {handleStepChange(-1)}}>Prev Phase</Button>
        <Radio.Group value={`phase-${currStep + 1}`}onChange={(e) => {handlePhaseButtonClick(e)}} style={{'marginLeft': 8, 'marginRight': 8}}>
          {renderPhaseButtons()}
        </Radio.Group>
        <Button onClick={() => {handleStepChange(1)}}>Next Phase</Button>
      </div>
    </div>
  );
};

export default Whiteboard;
