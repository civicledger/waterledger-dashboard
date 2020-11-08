import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setOrderFormModal, setAcceptOrderModal } from "../../redux/actions/actions";
import { submitBuyOrder, submitSellOrder } from "../../redux/actions/orders";

import Modal from "../common/modal/Modal";
import ModalHeader from "../common/modal/ModalHeader";
import ModalBody from "../common/modal/ModalBody";
import OrderForm from "./OrderForm";
import AcceptForm from "./AcceptForm";

export default () => {
  const dispatch = useDispatch();
  const modals = useSelector(state => state.modals);

  const placeOrder = ({ type, price, quantity, zoneIndex }) => {
    if (type === "sell") {
      dispatch(submitSellOrder(price, quantity, zoneIndex));
    } else {
      dispatch(submitBuyOrder(price, quantity, zoneIndex));
    }
    dispatch(setOrderFormModal(false));
  };

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
