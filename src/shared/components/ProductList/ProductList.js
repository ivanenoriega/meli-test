import React from 'react';
import _ from 'lodash';

import Spinner from '../../components/Spinner/Spinner';
import ProductsListItem from './ProductsListItem';
import NotFoundProductsMessage from '../ProductList/NotFoundProductsMessage';
import './ProductList.css';

const ProductList = (props) => {
  // Show spinner when we are fetching data
  if (props.showSpinner) {
    return <Spinner text="Cargando ofertas increibles..." />
  }

  // Show the message after fetch zero products
  if (_.isEmpty(props.products)) {
    return <NotFoundProductsMessage />;
  }

  // Set page tittle
  if (typeof document !== 'undefined') {
    const customTittle = `${props.lastCategory} en Mercado Libre Argentina`;
    document.title = customTittle !== document.title ? customTittle : document.title;
  }

  let products = [];
  if (!_.isEmpty(props.products)) {
    products = props.products.map((product) => {
      return <ProductsListItem key={product.id} product={product} />;
    });
  }

  return (<div className='justify-content-center'>
    <ol id='searchResults' className='list-group container search-results'>
      {products}
    </ol>
  </div>);
};

export default ProductList;
