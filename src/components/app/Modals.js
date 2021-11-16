import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setOrderFormModal, setAcceptOrderModal } from "../../redux/actions/actions";
import { submitOrder } from "../../redux/actions/orders";

import Modal from "../common/modal/Modal";
import ModalHeader from "../common/modal/ModalHeader";
import ModalBody from "../common/modal/ModalBody";
import OrderForm from "./OrderForm";
import AcceptForm from "./AcceptForm";

export default () => {
  const dispatch = useDispatch();
  const modals = useSelector(state => state.modals);

  const placeOrder = ({ waterAccountId, type, price, quantity }) => {
    dispatch(submitOrder({ waterAccountId, type, price, quantity: quantity * 1000 }));
    dispatch(setOrderFormModal(false));
  };

  useEffect(() => {
    const closeModal = () => dispatch(setOrderFormModal(false));

    const handleEsc = ({ code }) => {
      if (code === "Escape" && modals.orderForm) closeModal();
    };
    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [modals, dispatch]);

  return (
    <Fragment>
      <Modal show={modals.orderForm}>
        <ModalHeader title="Place Order" handleClose={() => dispatch(setOrderFormModal(false))} icon={<i className="fal fa-tint text-2xl mr-4" />} />
        <ModalBody>
          <OrderForm onCancelled={() => dispatch(setOrderFormModal(false))} placeOrder={placeOrder} />
        </ModalBody>
      </Modal>

      <Modal show={modals.acceptOrder}>
        <ModalHeader
          title="Accept Order"
          handleClose={() => dispatch(setAcceptOrderModal(false))}
          icon={<i className="fal fa-handshake text-2xl mr-4" />}
        />
        <ModalBody>
          <AcceptForm handleClose={() => dispatch(setAcceptOrderModal(false))} />
        </ModalBody>
      </Modal>
    </Fragment>
  );
};
