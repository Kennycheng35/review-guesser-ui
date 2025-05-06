import React from "react";
import ReactDOM from "react-dom";
import "./modal.css"; 

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> =  ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay pt-20 pb-20 backdrop-blur-sm max-h-200" onClick={onClose}>
      <div className="modal-content shadow-xl transform transition-all animate-modalFadeIn" onClick={e => e.stopPropagation()}>
        <div className="p-4">
            <button className="modal-close-button text-black" onClick={onClose}>×</button>
        </div>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;