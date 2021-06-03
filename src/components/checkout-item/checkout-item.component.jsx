import React from 'react';
import { connect } from 'react-redux';

import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <tr className="checkout-item">
      <td className="image-container">
        <img src={imageUrl} alt="item" />
      </td>
      <td>{name}</td>
      <td>
        <div className="quantity">
          <div className="arrow" onClick={() => removeItem(cartItem)}>&#10094;</div>
          {quantity}
          <div className="arrow" onClick={() => addItem(cartItem)}>&#10095;</div>
        </div>
      </td>
      <td>${price}</td>
      <td className="remove-button" onClick={() => clearItem(cartItem)}>&#10005;</td>
    </tr>
  );
};

const mapDispatchFromProps = dispatch => ({
  clearItem: item => dispatch(clearItemFromCart(item)),
  addItem: item => dispatch(addItem(item)),
  removeItem: item => dispatch(removeItem(item))
});

export default connect(null, mapDispatchFromProps)(CheckoutItem);
