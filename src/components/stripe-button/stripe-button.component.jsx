import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51IydlRLmKlBzzjppciwHDM2OtzkFolpJcZnyziA0XeAv0ttzDZNYgRdAmXUGddU2nrIcUI5cDvYNvZS2DscnZ9bR00Hf727Bjv';

  const onToken = token => {
    console.log(token);
    alert("Payment Successful")
  };

  return (
    <StripeCheckout
      stripeKey={publishableKey}
      amount={priceForStripe}
      label='Pay Now'
      name='Crwn Clothing, Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      panelLabel='Pay Now'
      token={onToken}
    />
  )
};

export default StripeButton;