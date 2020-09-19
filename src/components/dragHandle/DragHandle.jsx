import React from 'react';

import './DragHandle.scss';

const DragHandle = (props) => {
  return <i {...props} className="fas fa-bars draghandle" />;
};

export default DragHandle;
