import React from 'react';
import { useSelector } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import Caption from 'components/caption';
import Title from 'components/title';
import Image from 'components/image';

import './Portfolio.scss';

const Portfolio = () => {
  const components = useSelector(state => state.components.components);
  const componentOrder = useSelector(state => state.components.componentOrder);

  return (
    <Droppable droppableId="main-portfolio" type="portfolio">
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={`portfolio ${
            snapshot.isDraggingOver ? 'portfolio__dragged-over' : ''
          }`}
        >
          {componentOrder.map((componentId, index) => {
            const component = components[componentId];
            switch (component.type) {
              case 'title':
                return (
                  <Title
                    key={componentId}
                    component={component}
                    index={index}
                  />
                );
              case 'image':
                return (
                  <Image
                    key={componentId}
                    component={component}
                    index={index}
                  />
                );
              case 'caption':
                return (
                  <Caption
                    key={componentId}
                    component={component}
                    index={index}
                  />
                );
              default:
                return <></>;
            }
          })}
        </div>
      )}
    </Droppable>
  );
};

export default Portfolio;
