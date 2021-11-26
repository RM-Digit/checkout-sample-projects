import React, { useState } from 'react';
import { MemoryRouter as Router } from "react-router-dom";
import PropTypes from 'prop-types';
import { useCheckoutStore } from '@boldcommerce/checkout-react-components';
import { CheckoutForm } from './components/CheckoutForm';
import { LayoutContext } from './context/LayoutContext';
import { Message} from '@boldcommerce/stacks-ui';
import { ProcessingOrder } from '../OneClickLayout/components/Processing'
import './OneClickLayout.css';

const OneClickLayout = ({ orderStatus, orderErrors }) => {
  const isProcessing = orderStatus === 'processing';
  const [openModal, setOpenModal] = useState(true);

  return (
    <LayoutContext.Provider value={{openModal, setOpenModal}}>
      {
        (isProcessing && <ProcessingOrder />) || (
          <>
            <div className="Checkout__Main">
              {
                orderErrors['order'] &&
                <Message type="alert">
                  An error with your order has occured, please try again
                </Message>
              }
              <Router>
                <CheckoutForm />
              </Router>              
            </div>
          </>
        )
      }
    </LayoutContext.Provider>
  );
};

OneClickLayout.propTypes = {
  orderStatus: PropTypes.string,
};

const MemoizedOneClickLayout = React.memo(OneClickLayout);

const OneClickContainer = () => {
  const { state } = useCheckoutStore();
  const { orderStatus } = state.orderInfo;
  const orderErrors  = state.errors;

  return <MemoizedOneClickLayout orderState={orderStatus} orderErrors={orderErrors} />;
};

export default OneClickContainer;
