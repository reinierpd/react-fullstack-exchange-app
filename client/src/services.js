import fetch from 'node-fetch'

const products = function () {
 return fetch(`/products`).then(res => res.json());
};

export default { products };