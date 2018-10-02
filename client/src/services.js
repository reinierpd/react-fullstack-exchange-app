import fetch from 'node-fetch'

const products = function () {
  return fetch(`/products`).then(res => res.json());
};

const allPrices = function (prodId) {
  return fetch(`/products/${prodId}/prices`).then(res => res.json());
};

export default {products, allPrices};