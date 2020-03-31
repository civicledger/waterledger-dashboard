import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';

import * as OrderActions from '../../redux/actions/orders';
import { ORDER_TYPE_SELL } from '../../redux/actions/actionConstants';
import { titleCase } from '../../utils/format';

class OrderForm extends Component {

  state = { price: '', quantity: '' };

  handleChangeQuantity = ({target}) => this.setState({quantity: target.value});
  handleChangePrice = ({target}) => this.setState({price: target.value});

  resetForm = () => this.setState({ price: '', quantity: '' });

  render() {
    const { type, isReadOnly } = this.props.orderFormDetails;
    const isSell = type === ORDER_TYPE_SELL;

    let bgColor = isReadOnly ? 'grey' : (isSell ? 'red' : 'green');

    return <Fragment>

      <input type="text" value={this.state.quantity }
        placeholder="Volume in Megalitres"
        onChange={this.handleChangeQuantity}
        className="input" name="quantity" />

      <input type="text" value={this.state.price}
        placeholder="Price per Megalitre"
        onChange={this.handleChangePrice}
        className="input" name="price" />

      <button type="submit"
        className={`btn-${bgColor} w-full`}
        onClick={() => {
          this.props.placeOrder({...this.props.orderFormDetails, ...this.state});
        }}
        disabled={isReadOnly}
        >
        Place {titleCase(type)} Order
      </button>

    </Fragment>;
  }
}

const mapStateToProps = ({ orderFormDetails, ethContext }) => ({ orderFormDetails, ethContext });

export default connect(mapStateToProps, OrderActions)(OrderForm);