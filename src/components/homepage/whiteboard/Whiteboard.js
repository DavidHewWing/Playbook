import React from 'react';
import './styles.scss';

import useDimensions from '../../../hooks/window-utils/DimensionsHook';

const Whiteboard = () => {
  const [ref, { height, width }] = useDimensions(true);

  return (
    <div ref={ref} className="whiteboard-container">
      <p>
        Height:
        {height}
      </p>
      <p>
        Width:
        {width}
      </p>
      <h1>Hello World</h1>
    </div>
  );
};

export default Whiteboard;
