const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(express.static("public"));
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  const { ticketprice } = req.body;
  
  const ticketpriceParse = parseInt(ticketprice, 10);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: ticketpriceParse,
    currency: "vnd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


app.listen(3000, () => console.log("Node server listening on port 3000!"));