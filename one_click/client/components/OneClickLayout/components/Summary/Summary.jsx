import React from 'react';
import SummaryLine from './SummaryLine';
import SummaryItem from './SummaryItem';
import { Price } from '@boldcommerce/stacks-ui/lib';
import { BackButton } from '../BackButton';
import { CheckoutButton, useShippingLines, useDiscount, useCheckoutStore } from '@boldcommerce/checkout-react-components';
import './Summary.scss';

const Summary = () => {
    const { selectedShippingAmount, selectedShippingDescription } = useShippingLines();
    const { discountCode, discountTotal, removeDiscount, discountApplied } = useDiscount();
    const { state } = useCheckoutStore();
    const orderTotals =  state.orderTotals;
    const taxes = state.applicationState.taxes;

    let shippingItems = null;
    let discountItems = null;
    let taxItems = null;
    
    if ( selectedShippingDescription && selectedShippingAmount){
        shippingItems = <SummaryItem
                            title={selectedShippingDescription}
                            value={selectedShippingAmount}
                        />;
    }

    if (discountApplied) {
        discountItems = <SummaryItem 
                            title={discountCode}
                            value={(discountTotal * -1)}
                            removeItem={removeDiscount}
                        />;
    }

    if (taxes.length > 0) {
        taxItems = taxes.map( (taxline) => {
            return(                
                <SummaryItem
                    key={taxline.name}
                    title={taxline.name}
                    value={taxline.value}
                />
            )
        })
    }

    return(
        <div className="Summary">
            <h1 className="Section__Title">Summary</h1>
            <BackButton />
            <section className="Summary__OrderSummary">
                <div className="Summary__Lines SummaryBlock" data-allow-multiple id="accordianGroup">
                    <SummaryLine
                        title="Subtotal"
                        value={orderTotals.subTotal}
                    />
                    <SummaryLine
                        title="Shipping"
                        value={selectedShippingAmount}
                        items={shippingItems}
                    />
                    
                    <SummaryLine
                        title="Discount"
                        value={( discountApplied ? discountTotal * -1 : undefined )}
                        items={discountItems}
                    />
                    <SummaryLine
                        title="Taxes"
                        value={( orderTotals.taxesTotal === 0 ? undefined : orderTotals.taxesTotal )}
                        items={taxItems}
                    />
                </div>                
                <div className="Summary__Total SummaryBlock">
                    <div>Total</div>
                    <Price className="summary-total-price" amount={orderTotals.total} />
                </div>
                <CheckoutButton className={"CheckoutButton"}/>
            </section>
        </div>
    );
};

export default Summary;