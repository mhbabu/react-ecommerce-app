import React from "react";
import ModalBody from "./modalBody";
import ModalFooter from "./modalFooter";
import ModalHeader from "./modalHeader";

export default function modal() {
  return (
    <div className='modal fade' id='modal'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <ModalHeader />
          <ModalBody />
          <ModalFooter />
        </div>
      </div>
    </div>
  );
}
