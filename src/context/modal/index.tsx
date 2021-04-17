import React, { useContext, useState } from 'react';

export interface IModalContext {
  modalContent: IModalContent | null;
  setModalContent: React.Dispatch<React.SetStateAction<IModalContent | null>>;
}

export const ModalContext = React.createContext<IModalContext | null>(null);

export interface IModalContent {
  title: string;
  text: string;
  buttons?: IModalButton[];
}

export interface IModalButton {
  text: string;
  moveName?: string;
  moveArgs?: any[];
}

export const ModalProvider: React.FC = ({ children }) => {
  const [modalContent, setModalContent] = useState<IModalContent | null>(null);

  return (
    <ModalContext.Provider value={{ modalContent, setModalContent }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const modalContext = useContext(ModalContext);
  if (!modalContext) {
    throw new Error('Components must be wrapped in modalProvider to use modalContext');
  }
  return modalContext;
};
