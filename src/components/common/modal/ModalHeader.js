import React from "react";

const ModalHeader = ({ title, handleClose, icon }) => {
  return (
    <div className="modal-header bg-steel-400 text-steel-100 p-3 pl-5">
      <i
        onClick={handleClose}
        className="fal fa-times close float-right text-lg mt-2 font-bold hover-black focus-black no-underline cursor-pointer"
      ></i>
      {icon}
      <div className="modal-title text-2xl inline">{title}</div>
    </div>
  );
};

export default ModalHeader;
