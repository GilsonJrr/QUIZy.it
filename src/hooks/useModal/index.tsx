import { ReactNode, useState } from "react";

const useModal = () => {
  let [modal, setModal] = useState(false);
  let [modalContent, setModalContent] = useState<ReactNode | ReactNode[]>();

  const handleModal = (content: ReactNode | ReactNode[]) => {
    setModal(!modal);
    if (content) {
      setModalContent(content);
    }
  };

  return { modal, handleModal, modalContent };
};

export default useModal;
