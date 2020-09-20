import React, { useState } from 'react';

const ModalContext = React.createContext();

const ModalProvider = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <ModalContext.Provider value={{ isModalVisible, toggleModal }} {...props} />
  );
};

const useModal = () => {
  const context = React.useContext(ModalContext);
  if (context === undefined) {
    throw new Error(`useModal must be used within a ModalProvider`);
  }
  return context;
};

export { ModalProvider, useModal };
