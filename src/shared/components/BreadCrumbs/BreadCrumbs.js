import React from 'react';
import _ from 'lodash';
import './BreadCrumbs.css';

const BreadCrumbs = (props) => {
  let breadcrumbs = [];
  if (!_.isEmpty(props.crumbs)) {
    breadcrumbs = props.crumbs.map((crumb) => {
      return <li className='breadcrumb-item' key={crumb}>{crumb}</li>;
    });
  }

  return (
    <div className='container'>
      <ol className='breadcrumb'>{breadcrumbs}</ol>
    </div>
  );
};

export default BreadCrumbs;
