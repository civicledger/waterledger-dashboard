import React from 'react';
import classNames from 'classnames';

const Modal = ({ show, children }) => {

  return (
    <div className={
        classNames(
          "modal fixed z-10 pt-6 pin-t pin-l w-full h-full overflow-y-auto",
          {"block": show},
          {"hidden": !show}
        )
      }>
      <section className="modal-content w-4/5 md:w-2/5 rounded bg-gray-100 border-gray-700 m-auto p-5">
        {children}
      </section>
    </div>
  );
};

export default Modal;