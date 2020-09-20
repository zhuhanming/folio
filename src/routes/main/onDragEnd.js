export const onDragEndProducer = (
  components,
  componentCounter,
  componentOrder,
  dispatch,
  incrementCounter,
  setComponents,
  setComponentOrder,
  updateComponent
) => {
  const onDragEnd = (result) => {
    const { draggableId, source, destination, type } = result;

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
              text: 'Enter your title here',
            },
          };
          dispatch(setComponents(newComponents));
          break;
        case 'subtitle':
          newComponents = {
            ...components,
            [newComponentIndex]: {
              id: newComponentIndex,
              type: 'subtitle',
              text: 'Enter your subtitle here',
            },
          };
          dispatch(setComponents(newComponents));
          break;
        case 'image':
          newComponents = {
            ...components,
            [newComponentIndex]: {
              id: newComponentIndex,
              type: 'image',
              images: [''],
            },
          };
          dispatch(setComponents(newComponents));
          break;
        case 'caption':
          newComponents = {
            ...components,
            [newComponentIndex]: {
              id: newComponentIndex,
              type: 'caption',
              text: 'Enter your caption here',
            },
          };
          dispatch(setComponents(newComponents));
          break;
        case 'description':
          newComponents = {
            ...components,
            [newComponentIndex]: {
              id: newComponentIndex,
              type: 'description',
              text: 'Enter your description here',
            },
          };
          dispatch(setComponents(newComponents));
          break;
        case 'message':
          newComponents = {
            ...components,
            [newComponentIndex]: {
              id: newComponentIndex,
              type: 'message',
              text: 'Enter your message here',
            },
          };
          dispatch(setComponents(newComponents));
          break;
        case 'video':
          newComponents = {
            ...components,
            [newComponentIndex]: {
              id: newComponentIndex,
              type: 'video',
              url: '',
            },
          };
          dispatch(setComponents(newComponents));
          break;
        case 'music':
          newComponents = {
            ...components,
            [newComponentIndex]: {
              id: newComponentIndex,
              type: 'music',
              url: '',
            },
          };
          dispatch(setComponents(newComponents));
          break;
        case 'site':
          newComponents = {
            ...components,
            [newComponentIndex]: {
              id: newComponentIndex,
              type: 'site',
              sites: [
                {
                  title: 'Enter site title here',
                  image: '',
                  url: '',
                },
              ],
            },
          };
          dispatch(setComponents(newComponents));
          break;
        case 'code':
          newComponents = {
            ...components,
            [newComponentIndex]: {
              id: newComponentIndex,
              type: 'code',
              text: '// enter your code here',
            },
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
      type === 'image'
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
            images: newImageOrder,
          },
        })
      );
      return;
    }
    if (
      destination &&
      source.droppableId === destination.droppableId &&
      type === 'site'
    ) {
      // eslint-disable-next-line no-unused-vars
      const [componentId, position, componentContent] = draggableId.split(
        '_',
        3
      );
      const component = components[componentId];
      const newSiteOrder = Array.from(component.sites);
      newSiteOrder.splice(source.index, 1);
      newSiteOrder.splice(destination.index, 0, JSON.parse(componentContent));

      dispatch(
        updateComponent({
          id: componentId,
          component: {
            ...component,
            sites: newSiteOrder,
          },
        })
      );
    }
  };
  return onDragEnd;
};
