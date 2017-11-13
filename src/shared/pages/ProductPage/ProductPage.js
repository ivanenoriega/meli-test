import React, { Component } from 'react';
import _ from 'lodash';
import "isomorphic-fetch";

import SearchBar from '../../components/SearchBar/SearchBar';
import ProductDetails from '../../components/ProductDetails/ProductDetails';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';

class ProductPage extends Component {
  constructor(props) {
    super(props);

    let initialProduct = [];
    let initialCategories = [];

    if (__isBrowser__ && window.__initialData__) {
      initialProduct = window.__initialData__.item;
      initialCategories = window.__initialData__.categories;
      delete window.__initialData__;
    } else if (props.staticContext) {
      initialProduct = props.staticContext.initialData.item;
      initialCategories = props.staticContext.initialData.categories;
    }

    this.state = {
      product: initialProduct,
      categories: initialCategories,
      showSpinner: false };
  }

  componentDidMount() {
    if (!_.isEmpty(this.props.location) && _.isEmpty(this.state.product)) {
      const { pathname } = this.props.location;
      const productId = pathname.replace('/items/', '');
      this.getProduct(productId);
    }
  }

  getProduct(productId) {
    this.setState({ showSpinner: true });
    ProductPage.requestInitialData(productId)
      .then((data) => {
        this.setState({
          product: data.item,
          categories: data.categories,
          showSpinner: false });
      });
  }

  static requestInitialData(id, baseUrl = '') {
    return fetch(baseUrl + "/api/items/" + id)
      .then(response => response.json())
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <SearchBar history={this.props.history} />
        <BreadCrumbs crumbs={this.state.categories} />
        <ProductDetails
          product={this.state.product}
          showSpinner={this.state.showSpinner}
        />
      </div>
    );
  }
}

export default ProductPage;
