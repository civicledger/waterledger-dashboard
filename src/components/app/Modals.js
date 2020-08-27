import React, { Fragment } from "react";
import { connect } from "react-redux";

import { setOrderFormModal, setOrderFormFixedModal } from "../../redux/actions/actions";
import { submitBuyOrder, submitSellOrder } from "../../redux/actions/orders";

import Modal from "../common/modal/Modal";
import ModalHeader from "../common/modal/ModalHeader";
import ModalBody from "../common/modal/ModalBody";
import OrderForm from "./OrderForm";

const mapStateToProps = ({ loading, modals, ethContext, waterAccounts }) => ({
  loading,
  modals,
  ethContext,
  waterAccounts,
});

const mapDispatchToProps = dispatch => {
  return {
    setOrderFormModal: state => {
      dispatch(setOrderFormModal(state));
    },
    setOrderFormFixedModal: state => {
      dispatch(setOrderFormFixedModal(state));
    },
    placeOrder: ({ type, price, quantity }) => {
      if (type === "sell") {
        dispatch(submitSellOrder(price, quantity));
      } else {
        dispatch(submitBuyOrder(price, quantity));
      }
      dispatch(setOrderFormModal(false));
      dispatch(setOrderFormFixedModal(false));
    },
  };
};

const Modals = props => {
  const { modals, setOrderFormModal, placeOrder } = props;
  return (
    <Fragment>
      <Modal show={modals.orderForm}>
        <ModalHeader
          title="Place Order"
          handleClose={() => setOrderFormModal(false)}
          icon={<i className="fal fa-address-card text-steel-500 text-2xl mr-4" />}
        />
        <ModalBody>
          <OrderForm onCancelled={() => setOrderFormModal(false)} placeOrder={placeOrder} />
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Modals);