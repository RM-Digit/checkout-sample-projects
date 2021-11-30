// eslint-disable-next-line import/prefer-default-export
export const exampleShippingLines = [
  { id: '0', description: 'Standard Shipping', amount: 2000 },
  { id: '1', description: 'Expedited Shipping', amount: 4000 },
];

export const exampleShippingState = {
  shippingLines: exampleShippingLines,
  selectedShippingAmount: exampleShippingLines[0].amount,
  selectedShippingDescription: exampleShippingLines[0].description,
  selectedShippingIndex: 0
}