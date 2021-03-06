import React from "react";
import classNames from "classnames";

const Modal = ({ show, children }) => {
  return (
    <div className={classNames("modal fixed z-10 pt-6 pin-t pin-l w-full h-full overflow-y-auto", { block: show }, { hidden: !show })}>
      <section className="modal-content w-4/5 md:w-2/5 rounded bg-steel-300 m-auto">{children}</section>
    </div>
  );
};

export default Modal;
