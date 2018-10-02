const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const intersectionWith = require('lodash.intersectionwith');
const app = express();
const port = process.env.PORT || 5000;

const authToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldkBnbG92b2FwcC5jb20iLCJpZCI6IjVhNTcyZGEyNTM4OWMzNzZiZWZlNjY1NCIsImlhdCI6MTUxNTY2MjgyMn0.a6homMOumqLBxwfX9nOwbBaxmSx-srkS8dISSPCPPYE`;
const validExchanges = ['BNB', 'BTX', 'BFX'];

async function getProducts(store) {
  const headers = new fetch.Headers({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authToken}`
  });
  const res = await fetch(`https://api.moneeda.com/api/exchanges/${store}/products`, {
    method: 'GET',
    headers: headers
  });
  const json = await res.json();
  console.log(json);
  return json
}

async function getProductPrice(store, productId) {
  const headers = new fetch.Headers({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authToken}`
  });
  const res = await fetch(`https://api.moneeda.com/api/exchanges/${store}/ticker?product=${productId}`, {
    method: 'GET',
    headers: headers
  });
  const json = await res.json();
  return json.price
}


// API calls
app.get('/products', async (req, res) => {

  const productStore = [];
  for (const store of validExchanges) {
    const products = await getProducts(store);
    productStore.push(products);
  }

  res.send({products: intersectionWith(...productStore, (obj, oth) => obj.id === oth.id)})


});

app.get('/products/:productId/prices', async (req, res) => {
  const {productId} = req.params;
  const productPrices = [];

  for (const store of validExchanges) {
    const price =  await getProductPrice(store, productId);
    productPrices.push({store: store, price})
  }
  res.send(productPrices)
});


if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));
