import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import * as OrderActions from "../../redux/actions/orders";
import { ORDER_TYPE_SELL } from "../../redux/actions/actionConstants";
import { titleCase } from "../../utils/format";

const zones = [
  "Barron A - Barron Catchment",
  "Barron B - Tinaroo Dam",
  "Barron C - Lake Tinaroo Ponded Area",
  "Barron D - Lake Tinaroo Ponded Area",
  "Barron E - Walsh & Mitchell Catchments",
];

class OrderForm extends Component {
  state = { price: "", quantity: "" };

  handleChangeQuantity = ({ target }) => this.setState({ quantity: target.value });
  handleChangePrice = ({ target }) => this.setState({ price: target.value });

  resetForm = () => this.setState({ price: "", quantity: "" });

  render() {
    let { type, isReadOnly } = this.props.orderFormDetails;

    const isSell = type === ORDER_TYPE_SELL;
    const waterAccount = this.props.waterAccounts.find(wa => wa.waterAccountId === this.props.activeWaterAccount) || {};
    const excessVolumeError = isSell && this.state.quantity > +waterAccount.balance;

    isReadOnly = isReadOnly || !this.state.quantity || !this.state.price || excessVolumeError;

    let bgColor = isReadOnly ? "gray" : isSell ? "red" : "green";

    return (
      <Fragment>
        <div className="p-3 rounded bg-steel-400 my-3">
          <h4 className="mb-2">Currently Trading As</h4>
          <div className="flex text-steel-100 text-center">
            <div className="flex-1 text-left">{waterAccount.waterAccountId}</div>
            <div className="flex-2">{zones[waterAccount.zoneIndex]}</div>
            <div className="flex-1 text-right">{waterAccount.balance} ML</div>
          </div>
        </div>

        <label className="text-steel-900">Volume</label>
        <input
          type="text"
          value={this.state.quantity}
          onChange={this.handleChangeQuantity}
          className="input text-steel-900 rounded"
          name="quantity"
        />

        {excessVolumeError && <div className="text-sm text-red-100 mb-3">You do not have suffient allocation to make this offer</div>}

        <label className="text-steel-900">Price</label>
        <input type="text" value={this.state.price} onChange={this.handleChangePrice} className="input text-steel-900 rounded" name="price" />

        <button
          type="submit"
          className={`btn-${bgColor} w-full`}
          onClick={() => {
            this.props.placeOrder({
              ...this.props.orderFormDetails,
              ...this.state,
            });
            this.setState({ price: "", quantity: "" });
          }}
          disabled={isReadOnly}
        >
          Place {titleCase(type)} Order
        </button>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ orderFormDetails, ethContext, activeWaterAccount, waterAccounts }) => ({
  orderFormDetails,
  ethContext,
  activeWaterAccount,
  waterAccounts,
});

export default connect(mapStateToProps, OrderActions)(OrderForm);
