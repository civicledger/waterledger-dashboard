import React from "react";

const ModalHeader = ({ title, handleClose, icon }) => {
  return (
    <div className="modal-header">
      <i
        onClick={handleClose}
        className="fal fa-times close text-steel-700 float-right text-lg font-bold hover-black focus-black no-underline cursor-pointer"
      ></i>
      {icon}
      <div className="modal-title text-steel-900 text-2xl inline">{title}</div>
    </div>
  );
};

export default ModalHeader;
