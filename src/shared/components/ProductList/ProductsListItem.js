import React from 'react';
import { Link } from 'react-router-dom';
import ShippingImg from './ic_shipping.png';

const ProductsListItem = (props) => {
  return (<li className='list-group-item results-item'>
    <div className='item-image'>
      <div className='image-content'>
        <Link to={`/items/${props.product.id}`}>
          <img
            src={props.product.picture}
            alt='Product'
          />
        </Link>
      </div>
    </div>
    <div className='item-info'>
      <div>
        <div className='item-price'>
          <Link to={`/items/${props.product.id}`}>
            <span>{props.product.price.amount}</span>
          </Link>
          { props.product.free_shipping &&
            <img className='item-shipping' src={ShippingImg} alt='shipping' />
          }
          <div className='item-address'>
            {props.product.address}
          </div>
        </div>
        <h2 className='item-description'>
          {props.product.title}
        </h2>
        <div className='item-quantity'>
          Completo Unico!
        </div>
      </div>
    </div>
  </li>);
};

export default ProductsListItem;
