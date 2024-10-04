const stripe = require('stripe')('');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static('public'));
const YOUR_DOMAIN = 'https://sonderbeads.com';

app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            customer_email: 'customer@example.com',
            submit_type: 'donate',
            billing_address_collection: 'auto',
            shipping_address_collection: {
                allowed_countries: ['US', 'CA'],
            },
            line_items: [
                {
                    price: 'price_1PvBV3A6LSqRuH2F6v9S7fZS',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/server/public/html/success.html`,
            cancel_url: `${YOUR_DOMAIN}/index.html`,
            automatic_tax: { enabled: true },
        });

        res.redirect(303, session.url);
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(30010, () => console.log('Running on port 30010'));




// const storeItems = new Map([

//     [101, { price_in_cents: 799, name: "Clear Radiance Waistbead" }],
//     [102, { price_in_cents: 799, name: "Rainbow Quartz Waistbead" }],
//     [103, { price_in_cents: 799, name: "Golden Flower Waistbead" }],
//     [104, { price_in_cents: 799, name: "Colorburst Waistbead" }],
//     [105, { price_in_cents: 799, name: "Evil Eye Waistbead" }],
//     [106, { price_in_cents: 799, name: "Heart Threads Waistbead" }],
//     [107, { price_in_cents: 799, name: "Golden Serenity Waistbead" }],
//     [108, { price_in_cents: 799, name: "Twilight Sands Waistbead" }],

//     [109, { price_in_cents: 699, name: "Single Color Beaded Waistbead" }],
//     [110, { price_in_cents: 999, name: "Single Color Crystal Waistbead" }],

//     [111, { price_in_cents: 899, name: "Beaded Custom Waistbead" }],
//     [112, { price_in_cents: 1199, name: "Crystal Custom Waistbead" }],
//     [113, { price_in_cents: 999, name: "Mixed Custom Waistbead" }],

//     [211, { price_in_cents: 499, name: "Rose Quartz Crystal Bracelet" }],
//     [212, { price_in_cents: 499, name: "Moss Agate Crystal Bracelet" }],
//     [213, { price_in_cents: 499, name: "Opal Crystal Bracelet" }],
//     [214, { price_in_cents: 499, name: "Green Aventurine Crystal Bracelet" }],
//     [215, { price_in_cents: 499, name: "Amethyst Crystal Bracelet" }],
//     [221, { price_in_cents: 499, name: "Sodalite Gemstone Bracelet" }],
//     [222, { price_in_cents: 499, name: "Tigers Eye Gemstone Bracelet" }],
//     [223, { price_in_cents: 499, name: "Rhodochrosite Gemstone Bracelet" }],
//     [224, { price_in_cents: 499, name: "Rainforest Agate Gemstone Bracelet" }],
//     [225, { price_in_cents: 499, name: "Ocean Agate Gemstone Bracelet" }],
//     [226, { price_in_cents: 899, name: "Yin and Yang Gemstone Bracelet Pair" }],
//     [227, { price_in_cents: 499, name: "Hello Kitty Gemstone Bracelet" }],
//     [228, { price_in_cents: 899, name: "Hello Kitty Gemstone Bracelet Set" }],

//     [231, { price_in_cents: 499, name: "Tube Bracelet" }],
//     [232, { price_in_cents: 1399, name: "Tube Bracelet Set" }],

//     [201, { price_in_cents: 299, name: "Beaded Custom Bracelet" }],
//     [202, { price_in_cents: 599, name: "Crystal Custom Bracelet" }],
//     [203, { price_in_cents: 599, name: "Gemstone Custom Bracelet" }],
//     [204, { price_in_cents: 599, name: "Mixed Custom Bracelet" }],


//     [321, { price_in_cents: 499, name: "Crystal Drop Earrings" }],
//     [322, { price_in_cents: 499, name: "Crystal Hoop Earrings" }],
// ])
