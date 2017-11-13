import React, { Component } from 'react';

import Logo from './Logo';
import SearchImg from './ic_Search.png';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { search: '' };
    this.submitHandler = this.submitHandler.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    const target = event.target;
    this.setState({
      search: target.value,
    });
  }

  submitHandler(event) {
    event.preventDefault();
    if (this.state.search) {
      this.props.history.push(`/items?search=${this.state.search}`);
    }
  }

  render() {
    return (
      <div className='nav-header'>
        <div className='nav-bounds container'>
          <nav className='navbar'>
            <Logo />
            <form
              className='nav-search form-inline'
              onSubmit={this.submitHandler}
              onChange={this.handleInput}
            >
              <div className='input-group'>
                <input
                  value={this.state.search}
                  type='text'
                  className='form-control'
                  placeholder='Nunca Dejes de buscar'
                />
                <button className='input-group-addon search-button' type='submit'>
                  <img src={SearchImg} alt='' />
                </button>
              </div>
            </form>
          </nav>
        </div>
      </div>
    );
  }
}

export default SearchBar;
