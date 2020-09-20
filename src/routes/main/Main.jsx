import React, { useReducer, useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';

import {
  setComponents,
  setComponentOrder,
  incrementCounter,
  updateComponent,
} from 'reducers/componentDux';
import Modal from 'components/modal';
import { useModal } from 'contexts/ModalContext';
import { SITE_URL } from 'constants/urls';
import { STATIC } from 'constants/routes';
import ApiService from 'services/apiService';
import { generateName } from 'utils/nameUtils';
import RightBar from './RightBar';
import Portfolio from './Portfolio';
import LeftBar from './LeftBar';

import './Main.scss';
import { onDragEndProducer } from './onDragEnd';

const Main = () => {
  const dispatch = useDispatch();
  const components = useSelector((state) => state.components.components);
  const fullComponent = useSelector((state) => state.components);
  const componentOrder = useSelector(
    (state) => state.components.componentOrder
  );
  const componentCounter = useSelector(
    (state) => state.components.componentCounter
  );
  const { toggleModal, isModalVisible } = useModal();
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: true,
    isError: false,
    websiteName: generateName(),
  });
  const [errorTimeout, setErrorTimeout] = useState(undefined);

  useEffect(() => {
    if (isModalVisible) {
      const handleComplete = async () => {
        if (errorTimeout) {
          clearTimeout(errorTimeout);
          setErrorTimeout(undefined);
        }
        setState({
          isLoading: true,
          isError: false,
        });
        try {
          const responses = await ApiService.post('/pages', {
            newName: state.websiteName,
            pageJson: JSON.stringify({
              ...fullComponent,
            }),
          });
          if (responses.status === 200) {
            setState({ isLoading: false });
          } else {
            throw new Error();
          }
        } catch (error) {
          setState({
            isLoading: false,
            isError: true,
          });
        }
      };
      handleComplete();
    }
  }, [isModalVisible, errorTimeout, fullComponent, state.websiteName]);

  const onDragEnd = onDragEndProducer(
    components,
    componentCounter,
    componentOrder,
    dispatch,
    incrementCounter,
    setComponents,
    setComponentOrder,
    updateComponent
  );

  return (
    <>
      <Modal
        isOpen={isModalVisible}
        handleClose={() => {
          toggleModal();
          const t = setTimeout(() => {
            setState({ isError: false, isLoading: true });
          }, 500);
          setErrorTimeout(t);
        }}
      >
        <div className="complete-modal">
          {state.isLoading && <h1 className="title">Loading...</h1>}
          {state.isError && (
            <>
              <h2 className="title has-text-danger">
                Something went wrong... Try again!
              </h2>
              <h4>
                Note: Please refresh the page if you wish to generate another
                link. No data will be lost.
              </h4>
            </>
          )}
          {!state.isLoading && !state.isError && (
            <>
              <h1 className="title">Portfolio saved!</h1>
              <h3 className="subtitle complete-modal__description">
                You can access your portfolio at:
                <br />
                <a
                  href={`${SITE_URL}${STATIC}?code=${state.websiteName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >{`${SITE_URL}${STATIC}?code=${state.websiteName}`}</a>
              </h3>
              <h4>
                Note: Please refresh the page if you wish to generate another
                link. No data will be lost.
              </h4>
            </>
          )}
        </div>
      </Modal>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="main">
          <RightBar />
          <Portfolio />
          <LeftBar />
        </div>
      </DragDropContext>
    </>
  );
};

export default Main;
