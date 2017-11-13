const axios = require('axios');
const currencyFormatter = require('currency-formatter');

const apiUrl = 'https://api.mercadolibre.com/';

/**
 *
 * @param productId
 * @param res
 */
module.exports = (productId, res) => {
  const formattedResponse = {};
  axios.all([
    axios.get(`${apiUrl}items/${productId}`),
    axios.get(`${apiUrl}items/${productId}/description`) ])
    .then(axios.spread((product, description) => {
      formattedResponse.author = getAuthor();
      formattedResponse.item = setItemValues(product.data, description.data);

      // This is not a requirement of the test, I Just want
      // to get the categories to show it them on the page, like in the designs
      axios.get(`${apiUrl}categories/${product.data.category_id}`)
        .then((response) => {
          formattedResponse.categories = response.data.path_from_root.map(
            (category) => {
              return category.name;
            });
          res.json(formattedResponse);
        });
    }));
};

/**
 * Set the Author values
 * @returns {{name: string, lastname: string}}
 */
function getAuthor() {
  return { name: 'Ivan', lastname: 'Noriega' };
}

/**
 * Set Item values
 * @param product
 * @param description
 * @returns {{}}
 */
function setItemValues(product, description) {
  const formattedProduct = {};

  formattedProduct.id = (product.id);
  formattedProduct.title = (product.title);
  formattedProduct.price = {
    amount: formatPrice(product.price),
    currency: product.currency_id };

  if (product.pictures.length) {
    formattedProduct.picture = product.pictures[0].secure_url;
  }

  formattedProduct.condition = product.condition === 'new' ? 'Nuevo' : 'Usado';
  formattedProduct.free_shipping = product.shipping.free_shipping;
  formattedProduct.sold_quantity = product.sold_quantity;
  formattedProduct.description = description.plain_text;

  // This is out of the scope of the test.
  formattedProduct.permalink = product.permalink;

  return formattedProduct;
}

/**
 * Format the currency
 * Clarification: A wanted to use the "currency_id" to get the ARS format
 * but I can't change the number of decimals.
 * @param price
 * @returns {*}
 */
function formatPrice(price) {
  return currencyFormatter.format(price, {
    symbol: '$ ',
    thousand: '.',
    precision: 0,
  });
}
