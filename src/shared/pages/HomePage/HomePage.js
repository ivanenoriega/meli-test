import React from 'react';

import SearchBar from '../../components/SearchBar/SearchBar';
import './HomePage.css';

const HomePage = (props) => {
  return (
    <div>
      <SearchBar history={props.history} />
      <h1 className='hidden-title'>Pagina principal - Mercado Libre Argentina</h1>
      <div className='home'>
        <p className='home-message'>
          Millones de publicaciones para descubrir.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
