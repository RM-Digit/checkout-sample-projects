require('dotenv').config();
const express = require('express');
const handlebars = require('express-handlebars');
const createCheckout = require('./helpers/createCheckout');
const getVariants = require('./helpers/getVariants');
const resumeCheckout = require('./helpers/resumeCheckout');

const app = express();
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views','./views');
app.use(express.static('public'));
const port = 3000;

app.get('/', async (req, res) => {
  let publicOrderId = req.query.public_order_id;

  // TODO: Change this to get data from request instead
  const exampleBody = {
    "cart_items": [{
      "platform_id": "40341150564538",
      "quantity": 1,
      "line_item_key": "abc123"
    }],
    "order_meta_data": {
      "cart_parameters": {
        "bold_subscriptions": {
          "line_items_subscription_info": [
            {
              "subscription_group_id": 19362,
              "interval_id": 41743,
              "interval_text": "Monthly",
              "line_item_id": "abc-01",
              "quantity": 1,
              "variant_id": "40341150564538"
            }
          ]
        }
      }
    }
  }

  try { console.log("checkout")
    let checkout;
    if (publicOrderId) {
      checkout = await resumeCheckout(publicOrderId);
    } else {
      checkout = await createCheckout(exampleBody);
    }
   
    const initialData = checkout.data.initial_data;
    const jwtToken = checkout.data.jwt_token;
    publicOrderId = checkout.data.public_order_id;
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
    console.log(e.message)
    res.status(e.status || 500);
    res.json({
      message: e.message,
    });
  }
});

app.get('/processing', (req, res) => {
  res.redirect('/');
});

app.get('/inventory_issues', (req, res) => {
  res.redirect('/');
});

app.get('/confirmation', async (req, res) => {
  const publicOrderId = req.query.public_order_id;

  try {
    const checkout = await resumeCheckout(publicOrderId);
    const initialData = checkout.data.initial_data;
    const jwtToken = checkout.data.jwt_token;
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
    res.status(e.status || 500);
    res.json({
      message: e.message,
    });
  }
});

app.get('/validate_inventory', async (req, res) => {
  const variants = req.query.variants;

  try {
    const response = await getVariants(variants);
    res.json({
      inventory: response.data.map((variant) => {
        return {
          platform_id: variant.platform_id,
          inventory_quantity: variant.inventory_quantity,
        };
      })
    });
  } catch(e) {
    res.status(e.status || 500);
    res.json({
      message: e.message,
    })
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
