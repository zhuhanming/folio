import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';

import {
  setComponents,
  setComponentOrder,
  incrementCounter,
  updateComponent
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
    console.log(result);
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
      let newComponents;
      switch (draggableId) {
        case 'title':
          // eslint-disable-next-line no-case-declarations
          newComponents = {
            ...components,
            [newComponentIndex]: {
              id: newComponentIndex,
              type: 'title',
              text: 'Enter your title here'
            }
          };
          dispatch(setComponents(newComponents));
          break;
        case 'subtitle':
          newComponents = {
            ...components,
            [newComponentIndex]: {
              id: newComponentIndex,
              type: 'subtitle',
              text: 'Enter your subtitle here'
            }
          };
          dispatch(setComponents(newComponents));
          break;
        case 'image':
          newComponents = {
            ...components,
            [newComponentIndex]: {
              id: newComponentIndex,
              type: 'image',
              images: ['']
            }
          };
          dispatch(setComponents(newComponents));
          break;
        case 'caption':
          newComponents = {
            ...components,
            [newComponentIndex]: {
              id: newComponentIndex,
              type: 'caption',
              text: 'Enter your caption here'
            }
          };
          dispatch(setComponents(newComponents));
          break;
        case 'description':
          newComponents = {
            ...components,
            [newComponentIndex]: {
              id: newComponentIndex,
              type: 'description',
              text: 'Enter your description here'
            }
          };
          dispatch(setComponents(newComponents));
          break;
        case 'message':
          newComponents = {
            ...components,
            [newComponentIndex]: {
              id: newComponentIndex,
              type: 'message',
              text: 'Enter your message here'
            }
          };
          dispatch(setComponents(newComponents));
          break;
        default:
      }
      dispatch(setComponentOrder(newComponentOrder));
      return;
    }
    if (
      destination &&
      source.droppableId === destination.droppableId &&
      source.droppableId === 'main-portfolio'
    ) {
      const newComponentOrder = Array.from(componentOrder);
      newComponentOrder.splice(source.index, 1);
      newComponentOrder.splice(destination.index, 0, draggableId);
      dispatch(setComponentOrder(newComponentOrder));
      return;
    }
    if (
      destination &&
      source.droppableId === destination.droppableId &&
      source.droppableId === 'image'
    ) {
      // eslint-disable-next-line no-unused-vars
      const [componentId, position, componentContent] = draggableId.split('_');
      const component = components[componentId];
      const newImageOrder = Array.from(component.images);
      newImageOrder.splice(source.index, 1);
      newImageOrder.splice(destination.index, 0, componentContent);

      dispatch(
        updateComponent({
          id: componentId,
          component: {
            ...component,
            images: newImageOrder
          }
        })
      );
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
