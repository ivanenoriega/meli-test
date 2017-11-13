import React, { Component } from 'react';
import _ from 'lodash';
import { parse } from 'qs';
import accents from 'remove-accents';
import "isomorphic-fetch";

import SearchBar from '../../components/SearchBar/SearchBar';
import ProductsList from '../../components/ProductList/ProductList';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';

class SearchPage extends Component {
  constructor(props) {
    super(props);

    let initialProducts = [];
    let initialCategories = [];

    if (__isBrowser__ && window.__initialData__) {
      initialProducts = window.__initialData__.items;
      initialCategories = window.__initialData__.categories;
      delete window.__initialData__;
    } else if (props.staticContext) {
      initialProducts = props.staticContext.initialData.items;
      initialCategories = props.staticContext.initialData.categories;
    }

    this.state = {
      products: initialProducts,
      search: '',
      categories: initialCategories,
      showSpinner: false };
  }

  componentDidMount() {
    if (!_.isEmpty(this.props.location.search) && _.isEmpty(this.state.products)) {
      const search = parse(this.props.location.search.substr(1));
      this.getProducts(search.search);
    }
  }

  componentDidUpdate(prevProps) {
    if (!_.isEmpty(this.props.location.search)
      && !_.isEmpty(prevProps.location.search)
      && prevProps.location.search !== this.props.location.search) {
      const search = parse(this.props.location.search.substr(1));
      this.getProducts(search.search);
    }
  }

  getProducts(search) {
    this.setState({ search, products: [], categories: [], showSpinner: true });
    SearchPage.requestInitialData(search)
      .then((data) => {
        this.setState({
          products: data.items,
          categories: data.categories,
          showSpinner: false });
      });
  }

  static requestInitialData(search, baseUrl = '') {
    return fetch(baseUrl + "/api/items?search=" + encodeURI(accents.remove(search)))
      .then(response => response.json())
      .catch(error => console.log(error));
  }

  render() {
    const lastCategory = this.state.categories ? this.state.categories[this.state.categories.length-1] : [];
    return (<div>
      <SearchBar history={this.props.history} />
      <h1 className='hidden-title'>{this.state.search} - Mercado Libre Argentina</h1>
      <BreadCrumbs crumbs={this.state.categories} />
      <ProductsList
        lastCategory={lastCategory}
        products={this.state.products}
        showSpinner={this.state.showSpinner}
      />
    </div>);
  }
}

export default SearchPage;
