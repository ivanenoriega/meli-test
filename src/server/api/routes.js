import express from "express";

import searchController from './search';
import productController from './product';

const router = express.Router();

/**
 * Route to '/api/items?search='
 */
router.get('/items', (req, res) => {
  const search = req.query.search;

  if (!!search) {
    searchController(search, res);
  } else {
    res.status(400).send({
      error: 'Please add a \'search\' on the query URL.' });
  }
});

/**
 * Route to '/api/items/:id'
 */
router.get('/items/:id', (req, res) => {
  const productId = req.params.id;
  if (!!productId) {
    productController(productId, res);
  } else {
    res.status(400).send({ error: 'Please specify the Item ID.' });
  }
});

export default router;
