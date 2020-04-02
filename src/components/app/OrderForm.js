import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';

import * as OrderActions from '../../redux/actions/orders';
import { ORDER_TYPE_SELL } from '../../redux/actions/actionConstants';
import { titleCase } from '../../utils/format';

class OrderForm extends Component {

  state = { price: '', quantity: '', period: 0 };

  handleChangeQuantity = ({target}) => this.setState({quantity: target.value});
  handleChangePrice = ({target}) => this.setState({price: target.value});
  handleChangePeriod = ({target}) => this.setState({period: target.value});

  resetForm = () => this.setState({ price: '', quantity: '' });

  render() {
    const { type, isReadOnly } = this.props.orderFormDetails;
    const isSell = type === ORDER_TYPE_SELL;

    let bgColor = isReadOnly ? 'gray' : (isSell ? 'red' : 'green');

    return <Fragment>

      <input type="text" value={this.state.quantity }
        placeholder="Volume in Megalitres"
        onChange={this.handleChangeQuantity}
        className="input" name="quantity" />

      <input type="text" value={this.state.price}
        placeholder="Price per Megalitre"
        onChange={this.handleChangePrice}
        className="input" name="price" />

      {!isSell && <select value={this.state.period} onChange={this.handleChangePeriod} className="mb-3 block appearance-none w-full bg-white border border-gray-300 text-gray-500 py-3 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
            <option value="0">Select Period</option>
            <option value="1">Three Months</option>
            <option value="2">Six Months</option>
            <option value="3">Nine Months</option>
            <option value="4">A Year or More</option>
          </select>
         }
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