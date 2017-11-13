const axios = require('axios');
const currencyFormatter = require('currency-formatter');

const apiUrl = 'https://api.mercadolibre.com/sites/MLA/';
const productsQty = 4;

/**
 * This method exports the formatted version of the products list
 * @param search
 * @param res
 */
module.exports = (search, res) => {
  axios.get(
    `${apiUrl}search?q=${search}&limit=${productsQty}`)
    .then((response) => {
      res.json(formatProductsSearchApi(response.data));
    })
    .catch((err) => {
      res.send(err);
    });
};

/**
 * Format the json response
 * @param response
 * @returns {{}}
 */
function formatProductsSearchApi(response) {
  const formattedResponse = {};

  formattedResponse.author = getAuthor();
  formattedResponse.categories = getCategories(response.filters);
  formattedResponse.items = getItems(response.results);

  return formattedResponse;
}

/**
 * Set the Author value
 * @returns {{name: string, lastname: string}}
 */
function getAuthor() {
  return { name: 'Ivan', lastname: 'Noriega' };
}

/**
 * Set the Categories value
 * @param filters
 * @returns {Array}
 */
function getCategories(filters) {
  const trueFilters = !!filters[0] ? filters[0] : {};
  let categories = [];

  if (!!filters
    && trueFilters.values.length
    && trueFilters.values[0].path_from_root.length
  ) {
    categories = trueFilters.values[0].path_from_root.map((category) => {
      return category.name;
    });
  }

  return categories;
}

/**
 * Set the Items value
 * @param items
 * @returns {Array}
 */
function getItems(items) {
  return items.map((item) => {
    return {
      id: item.id,
      title: item.title,
      price: {
        amount: formatPrice(item.price),
        currency: item.currency_id,
        //  TODO Check for decimals on the api response
      },
      picture: formatImg(item.thumbnail),
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      address: item.address.state_name };
  });
}

function formatPrice(price) {
  return currencyFormatter.format(price, {
    symbol: '$ ',
    thousand: '.',
    precision: 0,
  });
}

/**
 * Get good quality img
 * Clarification: This maybe is not right but the thumbnails are too small
 * @param img
 * @returns {string}
 */
function formatImg(img) {
  const regex = /(\d{6}-MLA\d{11}_\d{6})/g;
  const match = regex.exec(img);
  return `https://http2.mlstatic.com/D_Q_NP_${match[1]}-Q.webp'`;
}
