import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';

import * as OrderActions from '../../redux/actions/orders';
import { ORDER_TYPE_SELL } from '../../redux/actions/actionConstants';
import { titleCase } from '../../utils/format';

class OrderForm extends Component {

  render() {
    const { type, isReadOnly, price, quantity } = this.props.orderFormDetails;

    let bgColor = isReadOnly ? 'gray' : (type === ORDER_TYPE_SELL ? 'red' : 'green');

    return <Fragment>
      <input type="text" value={quantity || ''} className="input" readOnly name="quantity" />

      <input type="text" value={price || ''} className="input" readOnly name="price" />

      <button type="submit"
        className={`btn-${bgColor} w-full`}
        disabled={isReadOnly}
        onClick={()=> {
          this.props.placeOrder(this.props.orderFormDetails)
        }}
      >
        Place {titleCase(type)} Order
      </button>
    </Fragment>;
  }
}

const mapStateToProps = ({ orderFormDetails, ethContext }) => ({ orderFormDetails, ethContext });

export default connect(mapStateToProps, OrderActions)(OrderForm);