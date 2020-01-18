import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';

import {
  setComponents,
  setComponentOrder,
  incrementCounter
} from 'reducers/componentDux';
import RightBar from './RightBar';
import Portfolio from './Portfolio';
import LeftBar from './LeftBar';

import './Main.scss';

const Main = () => {
  const dispatch = useDispatch();
  const components = useSelector(state => state.components.components);
  const componentOrder = useSelector(state => state.components.componentOrder);
  const componentCounter = useSelector(
    state => state.components.componentCounter
  );

  const onDragEnd = result => {
    const { draggableId, source, destination } = result;
    if (
      (source.droppableId === 'left-sidebar' ||
        source.droppableId === 'right-sidebar') &&
      destination &&
      destination.droppableId === 'main-portfolio'
    ) {
      const newComponentIndex = `component-${componentCounter}`;
      dispatch(incrementCounter());
      const newComponentOrder = Array.from(componentOrder);
      newComponentOrder.splice(destination.index, 0, newComponentIndex);
      switch (draggableId) {
        case 'title':
          // eslint-disable-next-line no-case-declarations
          const newComponents = {
            ...components,
            [newComponentIndex]: {
              id: newComponentIndex,
              type: 'title',
              text: 'Enter your title here'
            }
          };
          dispatch(setComponents(newComponents));
          break;
        default:
      }
      dispatch(setComponentOrder(newComponentOrder));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="main">
        <RightBar />
        <Portfolio />
        <LeftBar />
      </div>
    </DragDropContext>
  );
};

export default Main;
