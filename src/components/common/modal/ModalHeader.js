import React from 'react';

const ModalHeader = ({ title, handleClose, icon }) => {

  return (
    <div className="modal-header pb-4 mb-4 border border-t-0 border-l-0 border-r-0">
      <i onClick={handleClose} className="fal fa-times close text-gray-700 float-right text-sxl font-bold hover-black focus-black no-underline cursor-pointer"></i>
      {icon}
      <div className="modal-title text-2xl inline">{title}</div>
    </div>
  );
};

export default ModalHeader;