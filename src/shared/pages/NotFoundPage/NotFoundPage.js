import React from 'react';

import SearchBar from '../../components/SearchBar/SearchBar';
import './NotFoundPage.css';

const NotFoundPage = (props) => {
  return (
    <div>
      <SearchBar history={props.history} />
      <div className='not-found'>
        <p className='not-found-title'>
          Parece que la página no existe
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
