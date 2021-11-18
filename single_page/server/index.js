require('dotenv').config();
const express = require('express');
const handlebars = require('express-handlebars');
const createCheckout = require('./helpers/createCheckout');

const app = express();
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views','./server/views');
app.use(express.static('public'));
const port = 3000;

app.get('/', async (req, res) => {
  // TODO: Change this to get data from request instead
  const exampleBody = {
    customer: {
      platform_id: "39459641884739",
      platform_customer_id: "123",
      email_address: "john.doe@email.com",
      saved_addresses: [
        {
          id: 123,
          first_name: "John",
          last_name: "Doe",
          business_name: "Bold",
          address_line_1: "50 Fultz Boulevard",
          address_line_2: "",
          city: "Winnipeg",
          province: "Manitoba",
          country: "Canada",
          postal_code: "R3Y 0L6",
          phone_number: "+12042222222",
          province_code: "MB",
          country_code: "CA",
          country_name: "Canada"
        },
        {
          id: 456,
          first_name: "Jane",
          last_name: "Doe",
          business_name: "Bold",
          address_line_1: "100 Innovation Drive",
          address_line_2: "",
          city: "Winnipeg",
          province: "Manitoba",
          country: "Canada",
          postal_code: "R3T 6A8",
          phone_number: "+12042222222",
          province_code: "MB",
          country_code: "CA",
          country_name: "Canada"
        },
      ],
    },
    cart_items: [{
      sku: "ABS",
      quantity: 1,
      line_item_key: "abc123"
    }, {
      sku: "ABS",
      quantity: 2,
      line_item_key: "def356"
    }],
  };

  try {
    const checkout = await createCheckout(exampleBody);

    const initialData = checkout.data.initial_data;
    const jwtToken = checkout.data.jwt_token;
    const publicOrderId = checkout.data.public_order_id;
    let applicationState = checkout.data.application_state;

    res.render('checkout_example', {
      layout: false,
      publicOrderId,
      jwtToken,
      storeIdentifier: process.env.SHOP_IDENTIFIER,
      applicationState: JSON.stringify(applicationState),
      initialData: JSON.stringify(initialData),
    });
  } catch(e) {
    res.json({
      message: e.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
