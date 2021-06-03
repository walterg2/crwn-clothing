import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selector';

import './checkout.styles.scss';

const CheckoutPage = ({ cartItems, total }) => (
  <div className="checkout-page">
    <table className="checkout-table">
      <thead>
        <tr className="checkout-header">
          <th>Product</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {
          cartItems.map(
            cartItem => (<CheckoutItem key={cartItem.id} cartItem={cartItem} />)
          )
        }
      </tbody>
      <tfoot>
        <tr className="total">
          <td colSpan="5">Total: ${total}</td>
        </tr>
      </tfoot>
    </table>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);
