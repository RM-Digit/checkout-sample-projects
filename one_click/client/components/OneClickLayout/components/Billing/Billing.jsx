import React, { useContext, useEffect, useState } from "react";
import { useCheckoutStore } from "@boldcommerce/checkout-react-components";
import classNames from "classnames";
import { Header } from "../Header";
import { SummaryCondensed } from "../Summary";
import { PaymentMethod } from "../Payment";
import { CheckoutButton } from "../CheckoutButton";
import { AppContext } from "../../context/AppContext";
import './Billing.css';

const Billing = ({show, onBack, onSectionChange}, ref) => {
  const { websiteName } = useContext(AppContext);
  const { state } = useCheckoutStore();

  return (
    <div ref={ref} className={classNames('Sidebar Billing', show ? 'Sidebar--Show' : 'Sidebar--Hide')}>
      <Header title={websiteName} />
      
      <SummaryCondensed onSectionChange={onSectionChange}/>

      <div className="Billing-payment">
        <h2 className="IndexGuest-title">Payment method</h2>
        <PaymentMethod/>
      </div>

      <div className="IndexGuest-footer">
        <CheckoutButton className="CheckoutButton Billing-CheckoutButton" />
        <div className="IndexGuest-footer-login">
          <button className="link-btn" type="button" onClick={onBack}>Back to shipping</button>
        </div>          
        <div className="IndexGuest-rights">{`All right reserved ${websiteName}`}</div>
      </div>
    </div>
  )
}

const BillingForwardedRef = React.forwardRef(Billing);

export default BillingForwardedRef;