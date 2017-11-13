import React from 'react';

const BreadCrumb = (props) => {
  return (<li className='list-group-item'>
    <img src={props.product.picture} />
    <div>
      <div className='price'>
        $ {props.product.price.amount}
      </div>
      <div className='description'>
        {props.product.title}
      </div>
    </div>
    <div>
      {props.product.address}
    </div>
  </li>);
};

export default BreadCrumb;
